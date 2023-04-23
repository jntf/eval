<script setup>
import '@aws-amplify/ui-vue/styles.css';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';
const auth = useAuthenticator();
</script>

<template>
    <div class="font-sans">
        <!-- Header -->
        <header class="bg-red-800 shadow rounded-lg">
            <div class="container mx-auto px-6 py-3">
            <nav class="flex items-center justify-between flex-wrap">
                <div class="flex items-center flex-shrink-0 text-gray-800">
                <img src="../assets/logo.svg" alt="EVALIO" class="h-12">
                <span class="font-semibold text-xl text-white tracking-tight ml-2">EVALIO</span>
                </div>
                <div class="block lg:hidden">
                <button @click="isActive = !isActive" class="navbar-burger flex items-center py-2 px-3 text-gray-500 rounded border border-gray-500">
                    <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
                </div>
                <div :class="{'navbar-menu': true, 'block': isActive, 'hidden': !isActive}" class="w-full lg:flex lg:items-center lg:w-auto">
                <div class="text-md lg:flex-grow">
                    <a href="#accueil" class="text-white block mt-4 lg:inline-block lg:mt-0 hover:text-red-500 mr-4">
                    Accueil
                    </a>
                    <a href="#presentation" class="text-white block mt-4 lg:inline-block lg:mt-0 hover:text-red-500 mr-4">
                    Présentation
                    </a>
                    <a href="#comment-ca-marche" class="text-white block mt-4 lg:inline-block lg:mt-0 hover:text-red-500 mr-4">
                    Comment ça marche
                    </a>
                    <a href="#tarifs" class="text-white block mt-4 lg:inline-block lg:mt-0 hover:text-red-500 mr-4">
                    Tarifs
                    </a>
                    <a href="#nous-contacter" class="text-white block mt-4 lg:inline-block lg:mt-0 hover:text-red-500 mr-4">
                    Nous contacter
                    </a>
                </div>
                <div class="text-right">
                    <a href="#inscription" class="inline-block text-sm px-4 py-2 leading-none border rounded border-gray-800 hover:text-white hover:bg-red-500 mt-4 lg:mt-0 mr-4">
                    Inscription
                    </a>
                    <a href="#connexion" class="inline-block text-sm px-4 py-2 leading-none border rounded border-gray-800 hover:text-white hover:bg-red-500 mt-4 lg:mt-0">
                    Connexion
                    </a>
                </div>
                </div>
            </nav>
            </div>
        </header>

        <!-- Accueil -->
        <section id="accueil" class="py-20">
            <div class="container mx-auto">
                <h2 class="text-3xl font-bold mb-10">Bienvenue sur notre site</h2>
                <p class="mb-10">Nous sommes là pour vous aider à déterminer le prix de vente de votre voiture grâce à
                    l'IA.</p>
                <a class="bg-red-600 px-10 py-3 rounded-lg text-white hover:bg-red-700" href="#presentation">En savoir
                    plus</a>
            </div>
        </section>

        <!-- Présentation -->
        <section id="presentation" class="py-20">
            <div class="container mx-auto">
                <h2 class="text-3xl font-bold mb-10">Présentation</h2>
                <p class="mb-10">Notre site utilise les dernières technologies en matière d'IA pour déterminer le prix
                    de vente de votre voiture en quelques secondes.</p>
                <a class="bg-red-600 px-10 py-3 rounded-lg text-white hover:bg-red-700" href="#comment-ca-marche">Comment ça
                    marche</a>
            </div>
        </section>

        <!-- Comment ça marche -->
        <section id="comment-ca-marche" class="py-20">
            <div class="container mx-auto">
                <h2 class="text-3xl font-bold mb-10">Comment ça marche ?</h2>
                <p class="mb-10">Nous avons développé un algorithme d'apprentissage automatique qui permet de déterminer
                    le prix de vente de votre voiture en fonction de plusieurs critères.</p>
            </div>
        </section>

        <!-- Tarifs -->
        <section id="tarifs" class="py-20">
            <div class="container mx-auto">
                <h2 class="text-3xl font-bold mb-10">Tarifs</h2>
                <p class="mb-10">Notre service est gratuit pour les particuliers.</p>
                <p class="mb-10">Pour les professionnels, nous proposons un abonnement mensuel de 10€.</p>
            </div>
        </section>

        <!-- Nous contacter -->
        <section id="nous-contacter" class="py-20">
            <div class="container mx-auto">
                <h2 class="text-3xl font-bold mb-10">Nous contacter</h2>
                <p class="mb-10">Vous pouvez nous contacter par mail à l'adresse suivante :
                    <a class="text-red-600 hover:text-red-400" href="mailto:julien.nataf@gmail.com">
                    </a>
                </p>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'App',
    components: {
        Authenticator
    },
    data() {
        return {
            isActive: false
        }
    }
}
</script>