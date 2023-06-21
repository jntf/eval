<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-center">
        <!-- Section À propos -->
        <div class="w-full md:w-1/2 lg:w-1/4 text-center md:text-left mb-8 md:mb-0">
          <h3 class="text-lg font-semibold mb-4">À propos</h3>
          <p>
            Nous sommes une entreprise dédiée à fournir les meilleurs services et produits à nos clients.
          </p>
        </div>
        <!-- Section Liens utiles -->
        <div class="w-full md:w-1/2 lg:w-1/4 text-center md:text-left mb-8 md:mb-0">
          <h3 class="text-lg font-semibold mb-4">Liens utiles</h3>
          <ul>
            <li><a href="/home#acceuil" class="text-white hover:text-emerald-400">Accueil</a></li>
            <li><a href="/home#presentation" class="text-white hover:text-emerald-400">Présentation</a></li>
            <li><a href="/home#comment-ca-marche" class="text-white hover:text-emerald-400">Comment ça marche</a></li>
            <li><a href="/home#nous-contacter" class="text-white hover:text-emerald-400">Nous contacter</a></li>
            <li><a href="/home#tarifs" class="text-white hover:text-emerald-400">Tarifs</a></li>
            <li><router-link to="login" class="text-white hover:text-emerald-400">Connexion</router-link></li>
          </ul>
        </div>
        <!-- Section Nous contacter -->
        <div class="w-full md:w-1/2 lg:w-1/4 text-center md:text-left mb-8 md:mb-0">
          <h3 class="text-lg font-semibold mb-4">Nous contacter</h3>
          <p>
            Adresse : 123 Rue des Exemples, Ville<br />
            Téléphone : +33 1 23 45 67 89<br />
            Email : <a href="mailto:contact@exemple.com" class="text-white hover:text-emerald-400">contact@exemple.com</a>
          </p>
        </div>
        <!-- Section Suivez-nous -->
        <div class="w-full md:w-1/2 lg:w-1/4 text-center md:text-left">
          <h3 class="text-lg font-semibold mb-4">Suivez-nous</h3>
          <div class="flex justify-center md:justify-start space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
              class="text-white hover:text-emerald-400">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              class="text-white hover:text-emerald-400">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
              class="text-white hover:text-emerald-400">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <hr class="my-8 border-gray-600" />
      <!-- Section Droits d'auteur -->
      <div class="text-center">
        <p>&copy; {{ year }} EvaluIA . Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>
  
<script>
// Import Router link
import { RouterLink } from 'vue-router'

export default {
  setup() {
    return {
      year: new Date().getFullYear(),
      router: RouterLink
    }
  }
}
</script>

  