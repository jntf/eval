<template>
    <div v-if="isLoading" class="loading">
        <div class="loader">Chargement...</div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useLoadingStore } from '../../stores/loadingStore.js';

export default {
    setup() {
        const loadingStore = useLoadingStore();
        const isLoading = computed(() => loadingStore.isLoading);

        return {
            isLoading
        };
    }
};
</script>
  
<style scoped>
.loading {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.8);
}

.loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite;
    /* Safari */
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>