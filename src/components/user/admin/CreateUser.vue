<template>
    <div>
        <h2>Créer un nouvel utilisateur</h2>
        <form @submit.prevent="createUser">
            <div>
                <label for="firstName">Prénom</label>
                <input type="text" id="firstName" v-model="firstName" required>
            </div>
            <div>
                <label for="lastName">Nom</label>
                <input type="text" id="lastName" v-model="lastName" required>
            </div>
            <div>
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div>
                <label for="phoneNumber">Téléphone</label>
                <input type="tel" id="phoneNumber" v-model="phoneNumber" required>
            </div>
            <div>
                <label for="temporaryPassword">Mot de passe temporaire</label>
                <input type="password" id="temporaryPassword" v-model="temporaryPassword" required>
            </div>
            <button type="submit">Créer</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { API } from 'aws-amplify';
import { useUserStore } from "../../../stores/userStore";

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

        const createUser = async () => {
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
                // Réinitialiser le formulaire
                // firstName.value = '';
                // lastName.value = '';
                // email.value = '';
                // phoneNumber.value = '';
                // temporaryPassword.value = '';
            } catch (error) {
                console.error('Erreur lors de la création de l\'utilisateur', error);
            }
        };

        return {
            firstName,
            lastName,
            email,
            phoneNumber,
            temporaryPassword,
            createUser,
        };
    },
};
</script>