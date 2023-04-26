<script setup>
import '@aws-amplify/ui-vue/styles.css';
import { RouterView } from "vue-router";
import MiniNavBar from '../../components/user/MiniNavBar.vue'
import TopRight from '../../components/user/TopRight.vue'
import { useAuthenticator } from '@aws-amplify/ui-vue';
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";

import { Amplify } from 'aws-amplify';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);
const auth = useAuthenticator();
</script>

<template>
    <authenticator>
        <nav>

            <TopRight :auth="auth" />
            <MiniNavBar :auth="auth" />
        </nav>
        <div class="container mx-auto">
            <div class="flex flex-col flex-grow">
                <router-view />
            </div>
        </div>
    </authenticator>
</template>