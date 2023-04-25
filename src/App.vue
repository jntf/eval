<script setup>
import '@aws-amplify/ui-vue/styles.css';
import { RouterLink, RouterView } from "vue-router";
import MiniNavBar from './components/MiniNavBar.vue'
import TopRight from './components/TopRight.vue'
import Home from './views/Home.vue';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';

const auth = useAuthenticator();
</script>

<template>
    <authenticator>
        <template v-if="auth.route === 'authenticated'">
            <nav>
                <TopRight :auth="auth"/>
                <MiniNavBar :auth="auth"/>
            </nav>
            <!-- Container -->
            <div class="container mx-auto">
                <div class="flex flex-col flex-grow">
                    <RouterView />
                </div>
            </div>
        </template>
        <template v-else>
            <Home />
        </template>
    </authenticator>
</template>

<style scoped>
@import url(https://pro.fontawesome.com/releases/v5.10.0/css/all.css);
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;800&display=swap');

body {
    font-family: 'Poppins', sans-serif;
}

.hover\:w-full:hover {
    width: 100%;
}

.group:hover .group-hover\:w-full {
    width: 100%;
}

.group:hover .group-hover\:inline-block {
    display: inline-block;
}

.group:hover .group-hover\:flex-grow {
    flex-grow: 1;
}
</style>