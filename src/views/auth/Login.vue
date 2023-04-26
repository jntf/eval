<script setup>
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";

import { Amplify } from 'aws-amplify';
import awsconfig from '../../aws-exports';

import Header from '../../components/home/Header.vue';

Amplify.configure(awsconfig);
</script>

<template>
    <Header />
    <div class="fixed inset-0 flex items-center justify-center z-50">
        <authenticator>
            <template v-slot="{ user, signOut }">
                <h1>Hello {{ user.username }}!</h1>
                <button @click="signOut">Sign Out</button>
            </template>
        </authenticator>
    </div>
</template>

<script>
import { Auth } from 'aws-amplify';

export default {
  name: 'Login',
  methods: {
    login() {
      Auth.signIn(this.email, this.password)
        .then(() => {
          // Redirect to analysis page if user is authenticated
          if (Auth.user) {
            console.log('User is authenticated')
            console.log(Auth)
            this.$router.push({ name: 'analyse' });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
};
</script>