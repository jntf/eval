<script setup>
import '@aws-amplify/ui-vue/styles.css';

import Header from '../components/home/Header.vue';
import Footer from '../components/home/Footer.vue';

</script>

<template>
    <div class="font-sans">

        <!-- Header -->
        <Header />

        <!-- Accueil -->
        <section id="accueil" class="h-screen flex flex-col justify-center text-center py-2">
            <div class="container mx-auto flex flex-col md:flex-row items-center">
                <div class="md:w-1/2 flex justify-end mb-10 md:mb-0">
                    <img src="../assets/grapcar.jpeg" alt="GraphicalCar" class="w-full md:w-2/3 rounded-xl shadow-lg">
                </div>
                <div class="md:w-1/2 ml-10">
                    <h2 class="text-3xl md:text-4xl font-bold mb-10">Découvrez la puissance de l'IA pour déterminer le prix
                        de votre voiture</h2>
                    <p class="text-lg md:text-xl leading-8 mb-10">Vous êtes fatigué de passer des heures à calculer le prix
                        de vente de votre voiture ?
                        Laissez notre IA le faire pour vous ! Avec notre outil de calcul de prix basé sur l'IA, vous pouvez
                        facilement déterminer la valeur de votre voiture en quelques clics.</p>
                </div>
            </div>
        </section>

        <!-- Présentation -->
        <section id="presentation" class="h-screen flex flex-col justify-center text-center bg-red-50">
            <div class="container mx-auto">
                <h2 class="text-3xl md:text-4xl font-bold mb-10">Optimisez la vente de vos voitures avec notre outil de
                    prédiction de prix</h2>
                <p class="text-lg md:text-xl leading-8 mb-10">Notre application utilise les dernières avancées de l'IA pour
                    prédire les fluctuations des prix des véhicules en fonction de divers facteurs tels que le marché, les
                    réseaux sociaux, le lieu de vente et la conjoncture. Grâce à cette prédiction, vous pouvez coter en
                    rafale un grand nombre de véhicules et connaître la valeur de votre stock tous les jours. Vous pouvez
                    également anticiper les variations des prix pour mieux adapter vos prix de vente. De plus, notre outil
                    permet d'avoir une prévision à plusieurs années des prix des véhicules, ce qui est idéal pour les ventes
                    avec engagement de reprise.</p>
                <a class="bg-red-600 px-10 py-3 rounded-lg text-white hover:bg-red-700" href="#comment-ca-marche">Comment ça
                    marche</a>
            </div>
        </section>

        <!-- Comment ça marche -->
        <section id="comment-ca-marche" class="h-screen flex justify-center items-center">
            <div class="container mx-auto">
                <h2 class="text-3xl md:text-4xl font-bold mb-10">Comment ça marche ?</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div class="flex flex-col items-center">
                        <div
                            class="h-20 w-20 rounded-full bg-red-500 flex items-center justify-center text-white font-bold mb-4">
                            1
                        </div>
                        <h3 class="text-xl font-bold mb-2">Collecte des données</h3>
                        <p class="text-lg leading-7 text-center">Nous collectons des données historiques et en temps réel de
                            différentes sources, telles que des sites de vente de voitures, des données du marché
                            automobile, des réseaux sociaux, des sites d'enchères, et bien plus encore.</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div
                            class="h-20 w-20 rounded-full bg-red-500 flex items-center justify-center text-white font-bold mb-4">
                            2
                        </div>
                        <h3 class="text-xl font-bold mb-2">Nettoyage des données</h3>
                        <p class="text-lg leading-7 text-center">Nous nettoyons et préparons les données pour l'analyse en
                            éliminant les doublons, les erreurs et les données manquantes. Nous normalisons également les
                            données pour les rendre comparables et cohérentes.</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div
                            class="h-20 w-20 rounded-full bg-red-500 flex items-center justify-center text-white font-bold mb-4">
                            3
                        </div>
                        <h3 class="text-2xl font-bold mb-4">Analyse des données</h3>
                        <p class="text-lg leading-7 text-center">Nous utilisons des algorithmes d'apprentissage automatique
                            pour analyser les données nettoyées et normalisées. Nous identifions les tendances, les modèles
                            et les corrélations pour prédire les fluctuations de prix.</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div
                            class="h-20 w-20 rounded-full bg-red-500 flex items-center justify-center text-white font-bold mb-4">
                            4
                        </div>
                        <h3 class="text-2xl font-bold mb-4">Prédiction des prix</h3>
                        <p class="text-lg leading-7 text-center">En utilisant les résultats de l'analyse des données, nous
                            prédisons les fluctuations de prix pour une période donnée. Beaucoup de nos prévisions sont
                            précises à plus
                            de 90%, ce qui vous permet d'ajuster vos prix de vente en conséquence.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Tarifs -->
        <section id="tarifs" class="h-screen flex justify-center items-center bg-emerald-50">
            <div class="container mx-auto">
                <h2 class="text-3xl md:text-4xl font-bold mb-10">Tarifs</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div class="border rounded-lg shadow-sm p-6 text-center">
                        <h3 class="text-lg font-bold mb-4">1 à 4 utilisateurs</h3>
                        <p class="text-green-500 mb-4">Côtes illimitées</p>
                        <p class="text-green-500 mb-4">Analyse de marché illimitée</p>
                        <p class="font-black mb-4">0,50€ par rafale</p>
                        <p class="text-4xl text-purple-600 font-bold">19,90€<br><span class="text-sm font-light"> par utilisateur</span></p>
                    </div>
                    <div class="border rounded-lg shadow-sm p-6 text-center">
                        <h3 class="text-lg font-bold mb-4">5 à 9 utilisateurs</h3>
                        <p class="text-green-500 mb-4">Côtes illimitées</p>
                        <p class="text-green-500 mb-4">Analyse de marché illimitée</p>
                        <p class="font-black mb-4">0,50€ par rafale</p>
                        <p class="text-4xl text-purple-600 font-bold">16,90€<br><span class="text-sm font-light"> par utilisateur</span></p>
                    </div>
                    <div class="border rounded-lg shadow-sm p-6 text-center">
                        <h3 class="text-lg font-bold mb-4">10 à 19 utilisateurs</h3>
                        <p class="text-green-500 mb-4">Côtes illimitées</p>
                        <p class="text-green-500 mb-4">Analyse de marché illimitée</p>
                        <p class="font-black mb-4">Illimité</p>
                        <p class="text-4xl text-purple-600 font-bold">14,90€<br><span class="text-sm font-light"> par utilisateur</span></p>
                    </div>
                    <div class="border rounded-lg shadow-sm p-6 text-center">
                        <h3 class="text-lg font-bold mb-4">20 utilisateurs ou plus</h3>
                        <p class="text-green-500 mb-4">Côtes illimitées</p>
                        <p class="text-green-500 mb-4">Analyse de marché illimitée</p>
                        <p class="font-black mb-4">Illimité</p>
                        <p class="text-4xl text-purple-600 font-bold">Nous contacter</p>
                    </div>
                </div>
            </div>
        </section>


        <!-- Nous contacter -->
        <section id="nous-contacter" class="h-screen flex justify-center items-center bg-red-800">
            <div class="container mx-auto">
                <h2 class="text-3xl md:text-4xl font-bold mb-10 text-white">Nous contacter</h2>
                <form class="max-w-lg mx-auto">
                    <div class="mb-4">
                        <label class="block text-white font-bold mb-2" for="name">
                            Nom complet
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name" type="text" placeholder="Entrez votre nom">
                    </div>
                    <div class="mb-4">
                        <label class="block text-white font-bold mb-2" for="email">
                            Adresse email
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email" type="email" placeholder="Entrez votre adresse email">
                    </div>
                    <div class="mb-4">
                        <label class="block text-white font-bold mb-2" for="message">
                            Message
                        </label>
                        <textarea
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="message" placeholder="Entrez votre message"></textarea>
                    </div>
                    <div class="flex justify-end">
                        <button
                            class="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button">
                            Envoyer
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </div>
    <Footer />
</template>

<style>
/* spacing */
table {
    table-layout: fixed;
    width: 100%;
    border-collapse: separate;
    border-spacing: 10px;
}

thead th:nth-child(1) {
    width: 30%;
}

thead th:nth-child(2) {
    width: 20%;
}

thead th:nth-child(3) {
    width: 15%;
}

thead th:nth-child(4) {
    width: 35%;
}

th,
td {
    padding: 20px;
    text-align: center;
    font-family: Arial, sans-serif;
    font-size: 18px;
}

/* zebra stripes */
tr:nth-child(even) {
    background-color: #D6EEEE;
}

/* leopard skin */
th {
    color: white;
}</style>