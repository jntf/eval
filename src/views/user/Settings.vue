<template>
    <div class="container mx-auto px-4 py-10">
        <div class="bg-white shadow-md shadow-red-900 border-gray-700 rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl mx-auto">
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
                        :step="field.step" :id="key" class="w-full p-2 border-2 border-gray-300 rounded"
                        :required="isEditing" />
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
        </div>
    </div>
</template>
  
  
<script>
import { ref, onMounted } from "vue";
import { Auth } from "aws-amplify";
import { useUserStore } from "../../stores/userStore";

export default {
    setup() {
        const userStore = useUserStore();
        const name = ref(userStore.name);
        const familyName = ref(userStore.familyName);
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