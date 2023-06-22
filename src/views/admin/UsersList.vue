<template>
    <div v-for="user in users">
        <div v-if="getUserAttribute(user, 'custom:isActive') !== '1'">
            <table class="shadow-xl border-separate">
                <thead class="bg-gray-800 text-white">
                    <tr>
                        <td class="text-sm">Entreprise</td>
                        <td class="text-sm">N° de TVA</td>
                        <td class="text-sm">Ville</td>
                        <td class="text-sm">Admin</td>
                        <td class="text-sm">Email admin</td>
                        <td class="text-sm">Tel admin</td>
                        <td class="text-sm">Action</td>
                    </tr>
                </thead>
                <tbody class="bg-gray-100">
                    <tr>
                        <td class="text-sm">{{ getUserAttribute(user, 'custom:companyName') }}</td>
                        <td class="text-sm">
                            <a href="https://www.societe.com/cgi-bin/search?champs=${getUserAttribute(user, 'custom:vatNumber')}" target="_blank">
                                {{ getUserAttribute(user, 'custom:vatNumber') }}
                            </a>
                        </td>
                        <td class="text-sm">{{ getUserAttribute(user, 'custom:city') }}</td>
                        <td class="text-sm">{{ getUserAttribute(user, 'name') }} {{ getUserAttribute(user, 'family_name') }}
                        </td>
                        <td class="text-sm">{{ getUserAttribute(user, 'email') }}</td>
                        <td class="text-sm">{{ getUserAttribute(user, 'phone_number') }}</td>
                        <td class="text-sm">
                            <button @click="validateUser(getUserAttribute(user, 'sub'))"><span class="bg-green-500 hover:bg-green-700 text-white p-2 rounded-md">OK</span></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { API } from 'aws-amplify';
import awsconfig from '../../aws-exports';
API.configure(awsconfig);

export default {
    setup() {

        const users = ref([]);

        const fetchUsers = async () => {
            try {
                const response = await API.get(
                    'evaladminusers',
                    import.meta.env.VITE_EVAL_ADMIN_RESOURCE,
                    {
                        headers: {
                            "x-api-key": import.meta.env.VITE_EVAL_KEY,
                        },
                    }
                );
                users.value = JSON.parse(response.body);
            } catch (error) {
                console.error('An error occurred when trying to fetch users', error);
            }
        };

        const getUserAttribute = (user, attributeName) => {
            const attribute = user.Attributes.find(attr => attr.Name === attributeName);
            return attribute ? attribute.Value : null;
        };

        const validateUser = async (userId) => {
            console.log(userId)
            try {
                const response = await API.post(
                    'evalValidateUser',
                    import.meta.env.VITE_EVAL_VALIDATE_ADMIN_RESOURCE,
                    {
                        body: JSON.stringify({ userId: userId }),
                        headers: {
                            "x-api-key": import.meta.env.VITE_EVAL_KEY,
                        }
                    }
                )
                location.reload();
                console.log(response)
            } catch (error) {
                console.log('An error occurred when trying to validate user', error)
            }
        }

        onMounted(fetchUsers);

        return {
            users,
            fetchUsers,
            getUserAttribute,
            validateUser,
        };
    }
};
</script>