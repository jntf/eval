<template>
    <header class="bg-gray-800 shadow-xl rounded-b-lg fixed top-0 left-0 w-full z-50">
        <div class="container mx-auto px-6 py-3">
            <nav class="flex items-center justify-between flex-wrap">
                <a href="/" class="flex items-center flex-shrink-0 text-gray-800">
                    <!-- Le logo de l'entreprise -->
                    <img class="h-16 w-16" src="../../assets/logo.svg" alt="evalia" />
                    <!-- Le nom de l'entreprise -->
                    <span class="font-semibold text-xl text-white tracking-tight ml-2">EvaluIA</span>
                </a>
                <div class="block lg:hidden">
                    <!-- Le bouton de menu pour les écrans plus petits -->
                    <button @click="isActive = !isActive"
                        class="navbar-burger flex items-center py-2 px-3 text-gray-500 rounded border border-gray-500">
                        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>
                <!-- Le menu de navigation, qui change en fonction de la taille de l'écran -->
                <div :class="{
                    'navbar-menu': true,
                    'block': isActive,
                    'hidden': !isActive,
                    'lg:flex': true
                }" class="w-full lg:flex lg:items-center lg:w-auto">
                    <div class="text-md lg:flex-grow">
                        <!-- Les liens de navigation -->
                        <a href="/home#acceuil" class="text-white block mt-4 lg:inline-block lg:mt-0 hover:text-red-500 mr-4">
                            Accueil
                        </a>
                        <a href="/home#presentation"
                            class="text-white block mt-4 lg:inline-block lg:mt-0 hover:text-red-500 mr-4">
                            Présentation
                        </a>
                        <a href="/home#comment-ca-marche"
                            class="text-white block mt-4 lg:inline-block lg:mt-0 hover:text-red-500 mr-4">
                            Comment ça marche
                        </a>
                        <a href="/home#tarifs" class="text-white block mt-4 lg:inline-block lg:mt-0 hover:text-red-500 mr-4">
                            Tarifs
                        </a>
                        <a href="/home#nous-contacter"
                            class="text-white block mt-4 lg:inline-block lg:mt-0 hover:text-red-500 mr-4">
                            Nous contacter
                        </a>
                    </div>
                    <!-- Le lien vers la page de connexion -->
                    <div class="text-right">
                        <router-link to="login">
                            <div
                                class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-gray-200 hover:text-white hover:bg-red-500 mt-4 lg:mt-0">
                                Connexion
                            </div>
                        </router-link>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>
  
<script>
export default {
    name: "App",
    data() {
        return {
            // Un booléen pour contrôler si le menu est actif ou non sur les petits écrans
            isActive: false
        }
    }
}
</script>