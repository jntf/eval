<template>
    <div class="flex h-screen bg-gray-200">
        <!-- Sidebar / Navigation -->
        <div class="bg-gray-600 w-64 fixed pin-l h-full shadow">
            <div class="px-8">
                <a href="/adminpanel">
                    <h1 class="py-4 text-white text-2xl font-semibold">Admin Panel</h1>
                </a>
                <ul class="mt-6">
                    <router-link to="/users-list" class="text-white font-semibold py-2">Users</router-link>
                    <li class="text-white font-semibold py-2">Settings</li>
                    <router-link to="/home" class="text-white font-semibold py-2">Back to EvaluIA</router-link>
                </ul>
            </div>
        </div>
        <!-- Main content -->
        <div class="ml-64 bg-white p-4 h-full w-full overflow-scroll">
            <h2 class="text-gray-700 text-3xl font-semibold">Dashboard</h2>
            <router-view></router-view>
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
    } catch (error) {
        console.error('An error occurred when trying to fetch users', error);
    }
};

onMounted(fetchUsers);
</script>
  
<style scoped></style>