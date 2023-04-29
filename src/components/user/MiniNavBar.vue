<template>
    <div class="w-full max-w-md mx-auto sticky z-10">
        <div class="px-7 bg-red-800 rounded-2xl mb-5 shadow-2xl">
            <div class="flex">
                <div class="flex-auto hover:w-full group" v-if="isModalVisible == false">
                    <router-link to="/analyse"
                        class="flex items-center justify-center text-center mx-auto px-4 py-2 group-hover:w-full text-red-50">
                        <span
                            class="block px-1 py-1 border border-transparent group-hover:border-red-50 rounded-full group-hover:flex-grow">
                            <i class="far fa-home text-2xl pt-1"></i><span
                                class="hidden group-hover:inline-block ml-3 align-bottom pb-1">Analyse</span>
                        </span>
                    </router-link>
                </div>
                <div class="flex-auto hover:w-full group">
                    <a href="#"
                        class="flex items-center justify-center text-center mx-auto px-4 py-2 group-hover:w-full text-red-50"
                        @click="isModalVisible = !isModalVisible">
                        <span
                            class="block px-1 py-1 border border-transparent group-hover:border-red-50 rounded-full group-hover:flex-grow">
                            <i class="far fa-search text-2xl pt-1"></i><span
                                class="hidden group-hover:inline-block ml-3 align-bottom pb-1">Search {{ role }}</span>
                        </span>
                    </a>
                </div>
                <div class="flex-auto hover:w-full group" v-if="isModalVisible == false && role === 'Admin'">
                    <a href="#"
                        class="flex items-center justify-center text-center mx-auto px-4 py-2 group-hover:w-full text-red-50">
                        <span
                            class="block px-1 py-1 border border-transparent group-hover:border-red-50 rounded-full group-hover:flex-grow">
                            <i class="far fa-cog text-2xl pt-1"></i><span
                                class="hidden group-hover:inline-block ml-3 align-bottom pb-1">Settings</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <!-- <transition name="fade">
        <div v-if="isModalVisible" class="fixed inset-0 flex items-center justify-center z-50">
            <div @click="onToggle" class="absolute bg-black opacity-50 inset-0 pointer-events-none"></div>
            <div class="bg-white rounded-lg p-6 z-100 w-full sm:w-1/2 max-w-2xl mx-auto">
                <button @click="onToggle" class="absolute top-0 right-0 m-4">
                    <div
                        class="-mt-3 px-2 py-1 rounded-lg shadow-lg text-blue-500 hover:text-gray-700 bg-indigo-200 hover:bg-indigo-400">
                        Fermer
                    </div>
                </button>
                <SearchBar @close-modal="onToggle" />
            </div>
        </div>
    </transition> -->
    <CustomModal :role="role" :is-modal-visible="isModalVisible" :modal-content="customModal" @toggle-modal="isModalVisible = !isModalVisible" />
</template>

<script>
import { markRaw } from 'vue';
import SearchBar from './SearchBar.vue';
import CustomModal from '../reuse/CustomModal.vue';

export default {
    components: {
    SearchBar,
    CustomModal
},
    props: {
        auth: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            isModalVisible: false,
            customModal: markRaw(SearchBar),
            role: this.auth?.user?.signInUserSession?.accessToken?.payload?.["cognito:groups"][0]
        };
    },
    methods: {
        onToggle() {
            this.isModalVisible = !this.isModalVisible;
        },
    },
};
</script>
