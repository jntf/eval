<template>
    <div class="p-1">
        <div class="grid grid-cols-2">
            <h2 class="text-lg font-bold">Créer un nouvel utilisateur</h2>
            <div class="text-right -mt-5">
                <button @click="toggleForm" class="text-blue-500 text-6xl">+</button>
            </div>
        </div>
        <form v-if="showForm" @submit.prevent="createUser" class="space-y-4">
            <div>
                <label for="firstName" class="block font-medium">Prénom</label>
                <input type="text" id="firstName" v-model="firstName" required
                    class="w-full border border-gray-300 rounded-md p-2">
            </div>
            <div>
                <label for="lastName" class="block font-medium">Nom</label>
                <input type="text" id="lastName" v-model="lastName" required
                    class="w-full border border-gray-300 rounded-md p-2">
            </div>
            <div>
                <label for="email" class="block font-medium">Email</label>
                <input type="email" id="email" v-model="email" required
                    class="w-full border border-gray-300 rounded-md p-2">
            </div>
            <div>
                <label for="phoneNumber" class="block font-medium">Téléphone</label>
                <input type="tel" id="phoneNumber" v-model="phoneNumber" required
                    class="w-full border border-gray-300 rounded-md p-2">
            </div>
            <div>
                <label for="temporaryPassword" class="block font-medium">Mot de passe temporaire</label>
                <input type="password" id="temporaryPassword" v-model="temporaryPassword" required
                    class="w-full border border-gray-300 rounded-md p-2">
            </div>
            <button type="submit"
                class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">Créer</button>
        </form>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import { API } from 'aws-amplify';
import { useUserStore } from "../../../stores/userStore";
import { isEmpty, isEmail } from "validator";

export default {
    setup() {
        const userStore = useUserStore();
        const companyId = userStore.companyId;
        const userId = userStore.id;

        const firstName = ref('');
        const lastName = ref('');
        const email = ref('');
        const phoneNumber = ref('');
        const temporaryPassword = ref('');
        const showForm = ref(false);

        const createUser = async () => {
            const isFormValid = validateForm();
            if (!isFormValid) {
                console.error('Veuillez remplir tous les champs correctement.');
                return;
            }

            try {
                const response = await API.post(
                    'evalAdminAddUser',
                    import.meta.env.VITE_EVAL_ADMIN_ADD_USER,
                    {
                        body: {
                            firstName: firstName.value,
                            lastName: lastName.value,
                            email: email.value,
                            phoneNumber: phoneNumber.value,
                            temporaryPassword: temporaryPassword.value,
                            companyId: companyId,
                            adminId: userId
                        },
                        headers: {
                            "x-api-key": import.meta.env.VITE_EVAL_KEY,
                        }
                    }
                );

                console.log('Utilisateur créé avec succès', response);
                resetForm();
            } catch (error) {
                console.error('Erreur lors de la création de l\'utilisateur', error);
            }
        };

        const toggleForm = () => {
            showForm.value = !showForm.value;
        };

        const validateForm = () => {
            return (
                !isEmpty(firstName.value) &&
                !isEmpty(lastName.value) &&
                isEmail(email.value) &&
                !isEmpty(phoneNumber.value) &&
                !isEmpty(temporaryPassword.value)
            );
        };

        const resetForm = () => {
            firstName.value = '';
            lastName.value = '';
            email.value = '';
            phoneNumber.value = '';
            temporaryPassword.value = '';
        };

        return {
            firstName,
            lastName,
            email,
            phoneNumber,
            temporaryPassword,
            showForm,
            createUser,
            toggleForm,
            validateForm,
        };
    },
};
</script>
