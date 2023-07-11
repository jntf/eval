<script setup>
import "@aws-amplify/ui-vue/styles.css";
import { RouterView, useRouter } from "vue-router";
import { Authenticator } from "@aws-amplify/ui-vue";
import MiniNavBar from "../../components/user/MiniNavBar.vue";
import TopRight from "../../components/user/TopRight.vue";
import Footer from "../../components/home/Footer.vue";
import { useUserStore } from "../../stores/userStore";
import { messageStore } from "../../stores/messageStore";
import { onMounted } from "vue";

const userStore = useUserStore();
const router = useRouter();
onMounted(() => {
  userStore.fetchUserData(router);
});
const store = messageStore();
</script>

<template>
  <authenticator>
    <nav>
      <TopRight :name="userStore.name" :familyName="userStore.family_name" :roles="userStore.roles"
        :signOut="userStore.signOut" />
      <MiniNavBar :roles="userStore.roles" />
    </nav>
    <div class="container mx-auto flex-grow">
      <transition name="fade">
        <div v-if="store.message" class="global-message w-full text-white rounded-lg shadow-lg text-center py-2"
          :class="{ 'bg-green-400': store.messageType === 'success', 'bg-red-400': store.messageType === 'error' }">
          {{ store.message }}
          <button @click="store.clearMessage" class="text-white">X</button>
        </div>
      </transition>
      <div class="flex flex-col">
        <router-view />
      </div>
    </div>
  </authenticator>
  <footer>
    <Footer />
  </footer>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>