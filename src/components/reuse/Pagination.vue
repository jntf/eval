<template>
    <div class="flex flex-col sm:flex-row items-center justify-between sm:space-x-4 space-y-2 sm:space-y-0 p-4">
        <div>
            <select v-model="itemsPerPage" @change="changeItemsPerPage"
                class="bg-white rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
        </div>
        <div class="flex justify-center items-center space-x-4">
            <button @click="previousPage" :disabled="currentPage <= 1"
                class="text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg w-full sm:w-auto">Précédent</button>
            <button @click="nextPage" :disabled="currentPage >= totalPages"
                class="text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg w-full sm:w-auto">Suivant</button>
        </div>
        <span class="text-lg">Page {{ currentPage }} sur {{ totalPages }}</span>
    </div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue';

export default {
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    setup(props, { emit }) {
        const itemsPerPage = ref(10);
        const currentPage = ref(1);

        const totalPages = computed(() => Math.ceil((props.items ? props.items.length : 0) / itemsPerPage.value));

        watchEffect(() => {
            if (currentPage.value > totalPages.value) {
                currentPage.value = totalPages.value > 0 ? totalPages.value : 1;
            }
        });

        const changeItemsPerPage = () => {
            currentPage.value = 1;
            emit('items-per-page-change', itemsPerPage.value);
            emit('page-change', currentPage.value);
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
                emit('page-change', currentPage.value);
            }
        };

        const previousPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
                emit('page-change', currentPage.value);
            }
        };

        return {
            currentPage,
            totalPages,
            itemsPerPage,
            changeItemsPerPage,
            nextPage,
            previousPage
        }
    }
};
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: right;
}</style>
