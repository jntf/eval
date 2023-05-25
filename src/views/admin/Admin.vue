<template>
    <div class="flex h-screen bg-gray-200">
        <!-- Sidebar / Navigation -->
        <div class="bg-gray-600 w-64 fixed pin-l h-full shadow">
            <div class="px-8">
                <h1 class="py-4 text-white text-2xl font-semibold">Admin Panel</h1>
                <ul class="mt-6">
                    <router-link to="/users" class="text-white font-semibold py-2">Users</router-link>
                    <li class="text-white font-semibold py-2">Settings</li>
                </ul>
            </div>
        </div>
        <!-- Main content -->
        <div class="ml-64 bg-white p-4 h-full w-full overflow-scroll">
            <h2 class="text-gray-700 text-3xl font-semibold">Dashboard</h2>
            <table class="mt-4 w-full border-collapse shadow-xl">
                <thead>
                    <tr>
                        <th class="border border-gray-400 bg-gray-700 px-4 py-2">Nom</th>
                        <th class="border border-gray-400 bg-gray-700 px-4 py-2">Prénom</th>
                        <th class="border border-gray-400 bg-gray-700 px-4 py-2">Entreprise</th>
                        <th class="border border-gray-400 bg-gray-700 px-4 py-2">Téléphone</th>
                        <th class="border border-gray-400 bg-gray-700 px-4 py-2">email</th>
                        <th class="border border-gray-400 bg-gray-700 px-4 py-2">Groupes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.Username">
                        <td class="border border-gray-400 px-4 py-2">{{ getUserAttribute(user, 'name') }}</td>
                        <td class="border border-gray-400 px-4 py-2">{{ getUserAttribute(user, 'family_name') }}</td>
                        <td class="border border-gray-400 px-4 py-2">{{ getUserAttribute(user, 'entreprise') || 'N/A' }}</td>
                        <td class="border border-gray-400 px-4 py-2">{{ getUserAttribute(user, 'phone_number') }}</td>
                        <td class="border border-gray-400 px-4 py-2">{{ getUserAttribute(user, 'email') }}</td>
                        <td class="border border-gray-400 px-4 py-2">{{ getUserAttribute(user, 'cognito:groups') }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { API } from 'aws-amplify';
import awsconfig from '../../aws-exports';

API.configure(awsconfig);

const users = ref([]);

const fetchUsers = async () => {
  try {
        const response = await API.get('evaladminusers', import.meta.env.VITE_EVAL_ADMIN_RESOURCE, {
            headers: {
                "x-api-key": import.meta.env.VITE_EVAL_KEY,
            },
        });
        users.value = JSON.parse(response.body);
        console.log(users.value)
    } catch (error) {
        console.error('An error occurred when trying to fetch users', error);
    }
};
const getUserAttribute = (user, attributeName) => {
    const attribute = user.Attributes.find(attr => attr.Name === attributeName);
    return attribute ? attribute.Value : null;
};

onMounted(fetchUsers);
</script>
  
<style scoped></style>