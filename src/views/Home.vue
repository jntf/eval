<script setup>
import '@aws-amplify/ui-vue/styles.css';

import Header from '../components/home/Header.vue';

</script>

<template>
    <div class="font-sans">

        <!-- Header -->
        <Header />

        <!-- Accueil -->
        <section id="accueil" class="h-screen flex flex-col justify-center text-center py-2">
            <div class="container mx-auto flex items-center">
                <div class="w-1/2 flex justify-end">
                    <img src="../assets/grapcar.jpeg" alt="GraphicalCar"
                        class="w-2/3 transform scale-x-[-1] rounded-xl shadow-lg">
                </div>
                <div class="w-1/2 ml-10">
                    <h2 class="text-3xl font-bold mb-10">Découvrez la puissance de l'IA pour déterminer le prix de votre
                        voiture</h2>
                    <p class="text-lg leading-8 mb-10">Vous êtes fatigué de passer des heures à calculer le prix de vente de
                        votre voiture ?
                        Laissez notre IA le faire pour vous ! Avec notre outil de calcul de prix basé sur l'IA, vous pouvez
                        facilement déterminer la valeur de votre voiture en quelques clics.</p>
                </div>
            </div>
        </section>


        <!-- Présentation -->
        <section id="presentation" class="h-screen flex flex-col justify-center text-center bg-gray-100">
            <div class="container mx-auto">
                <h2 class="text-4xl font-bold mb-10">Optimisez la vente de vos voitures avec notre outil de prédiction de
                    prix</h2>
                <p class="text-lg leading-8 mb-10">Notre application utilise les dernières avancées de l'IA pour prédire les
                    fluctuations des prix des véhicules en fonction de divers facteurs tels que le marché, les réseaux
                    sociaux, le lieu de vente et la conjoncture. Grâce à cette prédiction, vous pouvez coter en rafale un
                    grand nombre de véhicules et connaître la valeur de votre stock tous les jours. Vous pouvez également
                    anticiper les variations des prix pour mieux adapter vos prix de vente. De plus, notre outil permet
                    d'avoir une prévision à plusieurs années des prix des véhicules, ce qui est idéal pour les ventes avec
                    engagement de reprise.</p>
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