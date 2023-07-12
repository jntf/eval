<template>
    <h1 class="text-2xl font-bold mb-6 text-center">
        Paramètres d'estimation de reprise
    </h1>
    <button @click="isEditing = !isEditing" type="button"
        class="text-cyan-500 font-bold py-2 px-4 rounded absolute top-4 right-4">
        <i class="fas" :class="isEditing ? 'fa-times' : 'fa-edit'"></i>
    </button>
    <form @submit.prevent="isEditing ? saveSettings() : null">
        <div v-for="(field, key) in settings" :key="key" class="mb-4 flex justify-end">
            <label class="block text-gray-700 mb-2 mr-4" :for="key">{{ field.label }}</label>
            <input v-if="field.type !== 'select'" :readonly="!isEditing" v-model="field.value" :type="field.type"
                :step="field.step" :id="key" class="w-full p-2 border-2 border-gray-300 rounded" :required="isEditing" />
            <select v-if="field.type === 'select'" :readonly="!isEditing" v-model="field.value" :id="key"
                class="w-full p-2 border-2 border-gray-300 rounded" :required="isEditing">
                <option v-for="(option, index) in field.options" :key="index" :value="option.value">
                    {{ option.text }}
                </option>
            </select>
        </div>
        <div class="text-right">
            <button v-if="isEditing" type="submit" class="bg-emerald-500 text-white font-bold py-2 px-4 rounded">
                Modifier
            </button>
        </div>
    </form>
</template>
<script>
import { ref, onMounted } from "vue";
import { Auth, API } from "aws-amplify";
import { useUserStore } from "../../../stores/userStore";
import { messageStore } from "../../../stores/messageStore";
import { createSettingsCompany, updateSettingsCompany } from "../../../graphql/mutations";
import { listSettingsCompanies } from "../../../graphql/queries";

export default {
    setup() {
        // Importation des fonctions et des variables nécessaires
        const userStore = useUserStore(); // Utilisation du store pour récupérer les informations de l'utilisateur
        const mess = messageStore(); // Utilisation du store pour afficher des messages à l'utilisateur
        const name = ref(userStore.name); // Référence à la variable name de l'utilisateur
        const familyName = ref(userStore.familyName); // Référence à la variable familyName de l'utilisateur
        const isEditing = ref(false); // Variable pour savoir si l'utilisateur est en train d'éditer les paramètres
        const settings = ref({ // Référence à l'objet settings contenant les paramètres de l'entreprise
            margin: { label: "Marge souhaitée", value: 0, type: "number", step: "0.01" },
            marginType: {
                label: "Type de marge",
                value: "euro",
                type: "select",
                options: [
                    { value: "euro", text: "Euro" },
                    { value: "percentage", text: "Pourcentage" },
                ],
            },
            frevo: { label: "Frais de remise en état (FREVO)", value: 0, type: "number", step: "0.01" },
            fixedFees: { label: "Frais fixes", value: 0, type: "number", step: "0.01" },
        });

        // Fonction pour charger les paramètres de l'entreprise
        async function loadSettings() {
            try {
                if (userStore.fixedFees && userStore.frevo && userStore.margin && userStore.marginType) {
                    // Si les paramètres sont déjà définis dans le store, on les récupère
                    settings.value.fixedFees.value = parseFloat(userStore.fixedFees);
                    settings.value.frevo.value = parseFloat(userStore.frevo);
                    settings.value.margin.value = parseFloat(userStore.margin);
                    settings.value.marginType.value = userStore.marginType;
                } else if (userAttributes.length > 0) {
                    // Sinon, on récupère les paramètres depuis le serveur
                    const user = await Auth.currentAuthenticatedUser();
                    const userAttributes = user.attributes;
                    settings.value.fixedFees.value = parseFloat(userAttributes["custom:fixedFees"]) || 0;
                    settings.value.frevo.value = parseFloat(userAttributes["custom:frevo"]) || 0;
                    settings.value.margin.value = parseFloat(userAttributes["custom:margin"]) || 0;
                    settings.value.marginType.value = userAttributes["custom:marginType"] || "euro";
                } else {
                    console.warn("Aucune entreprise associée à l'utilisateur, impossible de charger les paramètres");
                }
            } catch (error) {
                console.error("Erreur lors du chargement des paramètres", error);
            }
        }

        // Fonction pour sauvegarder les paramètres de l'entreprise
        async function saveSettings() {
            try {
                const companyId = userStore.companyId;

                if (companyId) {
                    // Si l'utilisateur est associé à une entreprise, on sauvegarde les paramètres
                    const settingsData = {
                        fixedFees: settings.value.fixedFees.value,
                        freVo: settings.value.frevo.value,
                        margin: settings.value.margin.value,
                        marginType: settings.value.marginType.value,
                        companyId: companyId,  // Ajoutez l'ID de l'entreprise aux données des paramètres
                    };

                    // Vérifiez si les paramètres de l'entreprise existent déjà
                    const { data } = await API.graphql({
                        authMode: 'AMAZON_COGNITO_USER_POOLS',
                        query: listSettingsCompanies,
                        variables: {
                            filter: { companyId: { eq: companyId } },
                            limit: 1
                        },
                    });

                    const settingsCompany = data.listSettingsCompanies.items[0];

                    let mutation;
                    if (settingsCompany) {
                        // Si les paramètres existent déjà, utilisez la mutation updateSettingsCompany
                        mutation = updateSettingsCompany;
                        settingsData.id = settingsCompany.id;  // Ajoutez l'ID des paramètres existants
                    } else {
                        // Sinon, utilisez la mutation createSettingsCompany
                        mutation = createSettingsCompany;
                    }

                    await API.graphql({
                        authMode: 'AMAZON_COGNITO_USER_POOLS',
                        query: mutation,
                        variables: {
                            input: settingsData,
                        },
                    });

                    // Mettre à jour l'état du store manuellement
                    userStore.setUserData({
                        fixedFees: settings.value.fixedFees.value,
                        frevo: settings.value.frevo.value,
                        margin: settings.value.margin.value,
                        marginType: settings.value.marginType.value,
                    });

                    // Message de succès
                    mess.setMessage('success', 'Mise à jour des paramètres réussie');
                    // alert("Paramètres sauvegardés avec succès");
                } else {
                    mess.setMessage('error', 'Aucune entreprise associée à l\'utilisateur');
                }

                isEditing.value = false;
            } catch (error) {
                console.error("Erreur lors de la sauvegarde des paramètres", error);
                if (error.errors && error.errors.length > 0) {
                    console.error("Détails de l'erreur GraphQL: ", error.errors);
                }
                mess.setMessage('error', 'Erreur lors de la sauvegarde des paramètres');
            }
        }

        // Fonction exécutée après le montage du composant
        onMounted(loadSettings);

        // Retourne les variables et fonctions nécessaires au composant
        return {
            name,
            familyName,
            settings,
            isEditing,
            saveSettings
        };
    },
};
</script>