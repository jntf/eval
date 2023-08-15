<script setup>
import '@aws-amplify/ui-vue/styles.css';
import { RouterView } from "vue-router";
</script>

<template>
  <div class="flex flex-col">
    <!-- Composant de l'en-tête -->
    <Header />
    <div class="flex-grow">
      <!-- Vue Router pour afficher les composants -->
      <router-view />
    </div>
    <!-- Composant du pied de page -->
    <Footer />
  </div>
</template>

<style scoped>
@import url(https://pro.fontawesome.com/releases/v5.10.0/css/all.css);
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;800&display=swap');

/* Définition de la police de caractères */
body {
    font-family: 'Poppins', sans-serif;
}

/* Définition des classes pour les effets de survol */
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