<template>
    <div class="container mx-auto px-4">
        <h1 class="text-2xl font-bold mb-6">Paramètres</h1>
        <form @submit.prevent="isEditing ? saveSettings() : null">
            <div v-for="(field, key) in settings" :key="key" class="mb-4">
                <label class="block text-gray-700 mb-2" :for="key">{{ field.label }}</label>
                <input v-if="field.type !== 'select'" :readonly="!isEditing" v-model="field.value" :type="field.type"
                    :step="field.step" :id="key" class="w-full p-2 border-2 border-gray-300 rounded"
                    :required="isEditing" />
                <select v-if="field.type === 'select'" :readonly="!isEditing" v-model="field.value" :id="key"
                    class="w-full p-2 border-2 border-gray-300 rounded" :required="isEditing">
                    <option v-for="(option, index) in field.options" :key="index" :value="option.value">
                        {{ option.text }}
                    </option>
                </select>
            </div>
            <button @click="isEditing = !isEditing" type="button"
                class="bg-yellow-500 text-white font-bold py-2 px-4 rounded mr-4">
                {{ isEditing ? 'Annuler' : 'Modifier' }}
            </button>
            <button v-if="isEditing" type="submit" class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                Sauvegarder
            </button>
        </form>
    </div>
</template>
  
<script>
import { ref, onMounted } from "vue";
import { Auth } from "aws-amplify";
export default {
    setup() {
        const isEditing = ref(false);
        const settings = ref({
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
        async function loadSettings() {
            try {
                const user = await Auth.currentAuthenticatedUser();
                const userAttributes = user.attributes;
                settings.value.margin.value = parseFloat(userAttributes["custom:margin"]) || 0;
                settings.value.marginType.value = userAttributes["custom:marginType"] || "euro";
                settings.value.frevo.value = parseFloat(userAttributes["custom:frevo"]) || 0;
                settings.value.fixedFees.value = parseFloat(userAttributes["custom:fixedFees"]) || 0;
            } catch (error) {
                console.error("Erreur lors du chargement des paramètres", error);
            }
        }
        async function saveSettings() {
            try {
                const user = await Auth.currentAuthenticatedUser();
                await Auth.updateUserAttributes(user, {
                    "custom:margin": settings.value.margin.value.toString(),
                    "custom:marginType": settings.value.marginType.value,
                    "custom:frevo": settings.value.frevo.value.toString(),
                    "custom:fixedFees": settings.value.fixedFees.value.toString(),
                });
                isEditing.value = false;
                alert("Paramètres sauvegardés avec succès");
            } catch (error) {
                console.error("Erreur lors de la sauvegarde des paramètres", error);
                alert("Erreur lors de la sauvegarde des paramètres");
            }
        }
        onMounted(loadSettings);
        return { settings, isEditing, saveSettings };
    },
};
</script>