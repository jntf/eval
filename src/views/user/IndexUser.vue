<script setup>
import "@aws-amplify/ui-vue/styles.css";
import { RouterView, useRouter } from "vue-router";
import { Authenticator } from "@aws-amplify/ui-vue";
import MiniNavBar from "../../components/user/MiniNavBar.vue";
import TopRight from "../../components/user/TopRight.vue";
import Footer from "../../components/home/Footer.vue";
import { useUserStore } from "../../stores/userStore";
import { onMounted } from "vue";

const userStore = useUserStore();
const router = useRouter();
onMounted(() => {
  userStore.fetchUserData(router);
});
</script>

<template>
  <authenticator>
    <nav>
      <TopRight
        :name="userStore.name"
        :familyName="userStore.family_name"
        :roles="userStore.roles"
        :signOut="userStore.signOut"
      />
      <MiniNavBar :roles="userStore.roles"/>
    </nav>
    <div class="container mx-auto">
      <div class="flex flex-col flex-grow">
        <router-view 

        />
      </div>
    </div>
  </authenticator>
  <footer>
    <Footer />
  </footer>
</template>