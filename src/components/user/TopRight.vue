<template>
    <div class="grid justify-items-end mx-10 pb-2 pt-5">
      <div>
        <!-- Icône du profil -->
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"
          class="fill-current mr-3 hover:text-blue-500 -ml-10">
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
          />
        </svg>
        <!-- Bouton du profil -->
        <div class="button -mt-8 mx-auto cursor-auto bg-red-800 hover:bg-red-600 text-white font-bold p-3 text-center rounded-full"
          @click="show = !show">
          <!-- Affichage du nom et du nom de famille de l'utilisateur -->
          <span class="text-stone-100 font-semibold tracking-tight">{{ name[0] }}{{ familyName[0] }}</span>
        </div>
      </div>
      <!-- Menu déroulant -->
      <div class="object bg-gray-50 border border-t-0 shadow-xl text-gray-700 rounded-3xl w-48 -mb-36 right-0 mr-6 text-center mt-2 z-50"
        :class="show ? '' : 'hidden'">
        <!-- Boucle pour afficher les rôles de l'utilisateur -->
        <div v-for="r in roles" class="my-5">
          <span class="text-white bg-green-600 rounded-lg px-2 py-1">{{ r }}</span>
        </div>
        <!-- Affichage du nom complet de l'utilisateur -->
        <div><span class="font-black">{{ name }} {{ familyName }}</span></div>
        <!-- Lien de routeur vers "adminpanel" -->
        <a v-if="roles.includes('SuperAdmin')" href="/adminpanel" class="block px-4 py-2 hover:bg-gray-200">Admin</a>
        <!-- Lien "Logout" -->
        <a href="#" class="block px-4 py-2 hover:bg-gray-200" @click="signOut()">Logout</a>
      </div>
    </div>
  </template>
  
  <style></style>
  
  <script>
  export default {
    props: {
      name: String, // Propriété: nom de l'utilisateur
      familyName: String, // Propriété: nom de famille de l'utilisateur
      roles: Array, // Propriété: rôles de l'utilisateur
      signOut: Function, // Propriété: fonction de déconnexion
    },
    data() {
      return {
        show: false,
    };
  },
};
</script>

