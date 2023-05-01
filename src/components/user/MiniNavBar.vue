<template>
    <div class="w-full max-w-md mx-auto sticky z-10">
        <div class="px-7 bg-red-800 rounded-2xl mb-5 shadow-2xl">
            <div class="flex">
                <div class="flex-auto hover:w-full group" v-if="isModalVisible == false">
                    <router-link to="analyse"
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
                                class="hidden group-hover:inline-block ml-3 align-bottom pb-1">Search</span>
                        </span>
                    </a>
                </div>
                <div class="flex-auto hover:w-full group" v-if="isModalVisible == false && roles.includes('Admin')">
                    <router-link to="settings"
                        class="flex items-center justify-center text-center mx-auto px-4 py-2 group-hover:w-full text-red-50">
                        <span
                            class="block px-1 py-1 border border-transparent group-hover:border-red-50 rounded-full group-hover:flex-grow">
                            <i class="far fa-cog text-2xl pt-1"></i><span
                                class="hidden group-hover:inline-block ml-3 align-bottom pb-1">Settings</span>
                        </span>
                    </router-link>
                </div>
                <div class="flex-auto hover:w-full group" v-if="isModalVisible == false && roles.includes('SuperAdmin')">
                    <a href="#"
                        class="flex items-center justify-center text-center mx-auto px-4 py-2 group-hover:w-full text-red-50">
                        <span
                            class="block px-1 py-1 border border-transparent group-hover:border-red-50 rounded-full group-hover:flex-grow">
                            <i class="far fa-cog text-2xl pt-1"></i><span
                                class="hidden group-hover:inline-block ml-3 align-bottom pb-1">Settings SuperAdmin</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <CustomModal :roles="roles" :is-modal-visible="isModalVisible" :modal-content="customModal" @toggle-modal="isModalVisible = !isModalVisible" />
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
        roles: Array
    },
    data() {
        return {
            isModalVisible: false,
            customModal: markRaw(SearchBar),
        };
    },
    methods: {
        onToggle() {
            this.isModalVisible = !this.isModalVisible;
        },
    },
};
</script>
