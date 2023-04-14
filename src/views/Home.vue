<script setup>
import '@aws-amplify/ui-vue/styles.css';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';
const auth = useAuthenticator();
</script>

<template>
    <div class="font-sans">
        <!-- Header -->
        <header class="py-10 bg-red-900">
            <div class="container mx-auto">
                <h1 class="text-2xl font-bold mb-5">Eval.ai</h1>
                <nav>
                    <ul class="flex justify-between">
                        <li><a class="text-red-200 hover:text-red-400" href="#accueil">Accueil</a></li>
                        <li><a class="text-red-200 hover:text-red-400" href="#presentation">Présentation</a></li>
                        <li><a class="text-red-200 hover:text-red-400" href="#comment-ca-marche">Comment ça marche</a>
                        </li>
                        <li><a class="text-red-200 hover:text-red-400" href="#tarifs">Tarifs</a></li>
                        <li><a class="text-red-200 hover:text-red-400" href="#nous-contacter">Nous contacter</a></li>
                    </ul>
                </nav>
                <div class="text-right">
                    <!-- Use <authenticator variation="modal"></authenticator> with a <a> button -->
                    <a class="text-red-200 hover:text-red-400" href="#inscription">Inscription</a>
                    <a class="text-red-200 hover:text-red-400" href="#connexion">Connexion</a>
                </div>
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