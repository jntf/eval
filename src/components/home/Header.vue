<template>
    <header class="bg-red-900 shadow-xl rounded-b-lg fixed top-0 left-0 w-full z-50">
        <div class="container mx-auto px-6 py-3">
            <nav class="flex items-center justify-between flex-wrap">
                <div class="flex items-center flex-shrink-0 text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none" class="h-16">
                        <circle cx="60" cy="60" r="28" stroke="url(#grad)" stroke-width="8" fill="none" />
                        <path d="M70 44L47 60l23 17" stroke="url(#grad)" stroke-width="12" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M50 76l23-16-23-16" stroke="url(#grad)" stroke-width="12" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <defs>
                            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style="stop-color:#222;stop-opacity:1" />
                                <stop offset="50%" style="stop-color:#444;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#666;stop-opacity:1" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span class="font-semibold text-xl text-white tracking-tight ml-2">Evalia</span>
                </div>
                <div class="block lg:hidden">
                    <button @click="isActive = !isActive"
                        class="navbar-burger flex items-center py-2 px-3 text-gray-500 rounded border border-gray-500">
                        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>
                <div :class="{
                        'navbar-menu': true,
                        'block': isActive,
                        'hidden': !isActive,
                        'lg:flex': true
                    }" class="w-full lg:flex lg:items-center lg:w-auto">
                    <div class="text-md lg:flex-grow">
                        <a href="#accueil" class="text-white block mt-4 lg:inline-block lg:mt-0 hover:text-red-500 mr-4">
                            Accueil
                        </a>
                        <a href="#presentation"
                            class="text-white block mt-4 lg:inline-block lg:mt-0 hover:text-red-500 mr-4">
                            Présentation
                        </a>
                        <a href="#comment-ca-marche"
                            class="text-white block mt-4 lg:inline-block lg:mt-0 hover:text-red-500 mr-4">
                            Comment ça marche
                        </a>
                        <a href="#tarifs" class="text-white block mt-4 lg:inline-block lg:mt-0 hover:text-red-500 mr-4">
                            Tarifs
                        </a>
                        <a href="#nous-contacter"
                            class="text-white block mt-4 lg:inline-block lg:mt-0 hover:text-red-500 mr-4">
                            Nous contacter
                        </a>
                    </div>
                    <div class="text-right">
                        <router-link to="login">
                            <div href="#connexion"
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
            isActive: false
        }
    }
}
</script>