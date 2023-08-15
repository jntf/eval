<template>
  <div class="grid justify-items-end mx-2 sm:mx-10 pb-2 pt-12">
    <div class="justify-self-end">
      <!-- Icône du Notification -->
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"
      class="fill-current mr-1 sm:mr-3 hover:text-blue-500 -ml-2 sm:-ml-10" hidden>
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
      </svg>
      <!-- Bouton du profil qui affiche les initiales de l'utilisateur -->
      <div
        class="button -mt-4 sm:-mt-8 mx-auto cursor-auto bg-red-800 hover:bg-red-600 text-white font-bold p-2 sm:p-3 text-center rounded-full"
        @click="show = !show" ref="dropdown">
        <span class="text-stone-100 font-semibold tracking-tight">{{ name[0] }}{{ familyName[0] }}</span>
      </div>
    </div>
    <!-- Menu déroulant qui affiche les rôles de l'utilisateur et ses options -->
    <div
      class="object bg-gray-50 border border-t-0 shadow-xl text-gray-700 rounded-3xl w-32 sm:w-48 -mb-36 right-0 mr-3 sm:mr-6 text-center mt-2 z-50 flex flex-col justify-center"
      :class="[roles.length > 1 ? 'h-32 sm:h-48' : 'h-24 sm:h-32', show ? '' : 'hidden']">
      <!-- Si l'utilisateur a des rôles, on affiche les rôles et le nom complet de l'utilisateur -->
      <div v-if="roles.length > 0">
        <div v-for="r in roles" class="my-1 sm:my-2">
          <span class="text-white bg-green-600 rounded-lg px-1 sm:px-2 py-1">{{ r }}</span>
        </div>
        <div>
          <span class="font-black text-sm sm:text-base">{{ name }} {{ familyName }}</span>
        </div>
      </div>
      <!-- Si l'utilisateur n'a pas de rôle, on affiche seulement son nom complet -->
      <div v-else>
        <div>
          <span class="font-black text-sm sm:text-base">{{ name }} {{ familyName }}</span>
        </div>
      </div>
      <!-- Si l'utilisateur est un SuperAdmin, on affiche le lien vers le panneau d'administration -->
      <a v-if="roles.includes('SuperAdmin')" href="/adminpanel" class="block px-2 sm:px-4 py-1 sm:py-2 hover:bg-gray-200">Admin</a>
      <!-- Lien pour déconnecter l'utilisateur -->
      <a href="#" class="block px-2 sm:px-4 py-1 sm:py-2 hover:bg-gray-200" @click="signOut()">Logout</a>
    </div>
  </div>
</template>

<style>
/* Transition de la hauteur pour le menu déroulant */
.object {
  transition: height 0.5s ease-out;
}
</style>

<script>
export default {
  props: {
    name: String, // Nom de l'utilisateur
    familyName: String, // Nom de famille de l'utilisateur
    roles: Array, // Rôles de l'utilisateur
    signOut: Function, // Fonction pour déconnecter l'utilisateur
  },
  data() {
    return {
      show: false, // Contrôle l'affichage du menu déroulant
    };
  },
  mounted() {
    // Ajoute un écouteur d'événements pour fermer le menu déroulant lorsque l'utilisateur clique en dehors de celui-ci
    document.addEventListener('click', this.closeDropdownOnClickOutside);
  },
  beforeDestroy() {
    // Supprime l'écouteur d'événements lorsque le composant est détruit
    document.removeEventListener('click', this.closeDropdownOnClickOutside);
  },
  methods: {
    closeDropdownOnClickOutside(e) {
      // Si l'utilisateur clique en dehors du menu déroulant, on ferme celui-ci
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(e.target)) {
        this.show = false;
      }
    },
  },
};
</script>

