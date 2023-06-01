<template>
    <div class="container w-full">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form @submit.prevent="register" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div v-for="(field, index) in formFields" :key="index">
                        <div v-if="field.grid" class="grid grid-cols-2 gap-4 mb-4">
                            <div v-for="(subField, subIndex) in field.grid" :key="`grid-${subIndex}`">
                                <label :for="subField.id" class="block text-gray-700 text-sm font-bold mb-2">{{
                                    subField.label }}</label>
                                <input v-model="form[subField.id]"
                                    class="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    :id="subField.id" :type="subField.type" :placeholder="subField.label">
                            </div>
                        </div>
                        <div v-else class="mb-4">
                            <label :for="field.id" class="block text-gray-700 text-sm font-bold mb-2">{{ field.label
                            }}</label>
                            <input v-model="form[field.id]"
                                class="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                :id="field.id" :type="field.type" :placeholder="field.label" :class="field.class">
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                            S'inscrire
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import { Auth } from 'aws-amplify';
import { useRoute } from 'vue-router';

export default {
    setup(props, {emit}) {
        const form = {
            companyName: '',
            vatNumber: '',
            address: '',
            postalCode: ''
        };
        const formFields = [
            { id: 'companyName', label: 'Entreprise', type: 'text' },
            { id: 'vatNumber', label: 'Numéro de TVA', type: 'text' },
            { id: 'address', label: 'Adresse', type: 'text' },
            { id: 'address2', label: 'Complément d\'adresse', type: 'text' },
            {
                grid: [
                    { id: 'postalCode', label: 'Code Postal', type: 'number' },
                    { id: 'city', label: 'Ville', type: 'text' },
                ]
            },
            {
                grid: [
                    { id: 'firstName', label: 'Prénom', type: 'text' },
                    { id: 'lastName', label: 'Nom', type: 'text' },
                ]
            },
            { id: 'email', label: 'Email', type: 'email' },
            { id: 'phone', label: 'Téléphone', type: 'text' },
            {
                grid: [
                    { id: 'password', label: 'Mot de passe', type: 'password' },
                    { id: 'password2', label: 'Confirmation mot de passe', type: 'password' }
                ]
            }
        ];

        async function register() {
            try {
                const { user } = await Auth.signUp({
                    username: form.email,
                    password: form.password,
                    attributes: {
                        email: form.email,
                        phone_number: '+33' + form.phone.toString().substring(1), // Assurez-vous que le numéro de téléphone est au format E.164
                        family_name: form.lastName, // Nom de famille
                        name: form.firstName, // Prénom
                        'custom:companyName': form.companyName,
                        'custom:vatNumber': form.vatNumber,
                        address: form.address,
                        'custom:codePostal': form.postalCode.toString(),
                        'custom:city': form.city,
                    },
                });
                console.log(user);
                emit('nextStep', 'SignUpVerification', form.email);

            } catch (error) {
                console.log('erreur lors de l\'inscription:', error);
            }
        }


        return {
            form,
            formFields,
            register,
        }
    }
};
</script>