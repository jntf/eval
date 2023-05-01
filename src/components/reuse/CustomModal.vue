<template>
    <transition name="fade">
        <div v-if="isModalVisible" class="fixed inset-0 flex items-center justify-center z-50">
            <div @click="onToggle" class="absolute bg-black opacity-50 inset-0 pointer-events-none"></div>
            <div class="bg-white rounded-lg p-6 z-100 w-full sm:w-1/2 max-w-2xl mx-auto md:w-1/3">
                <button @click="onToggle" class="absolute top-0 right-0 m-4">
                    <div
                        class="-mt-3 px-2 py-1 rounded-lg shadow-lg text-blue-500 hover:text-gray-700 bg-indigo-200 hover:bg-indigo-400">
                        Fermer
                    </div>
                </button>
                <component :is="modalContent" @close-modal="onToggle" />
            </div>
        </div>
    </transition>
</template>

  

<script>
export default {
    name: 'Modal',
    props: {
        role: {
            type: String,
            default: '',
        },
        isModalVisible: {
            type: Boolean,
            default: false,
        },
        modalContent: {
            type: Object,
            default: null,
        },
    },
    methods: {
        onToggle() {
            this.$emit('toggle-modal');
        },
    },
};
</script>