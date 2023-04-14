<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <form @submit.prevent="submitForm">
    <div>
      <select v-model="selectedMake" @change="fetchModels">
        <option disabled value="">Sélectionnez une marque</option>
        <option v-for="make in makes" :key="make" :value="make">{{ make }}</option>
      </select>

      <select v-model="selectedModel" :disabled="!selectedMake" @change="fetchDetails">
        <option disabled value="">Sélectionnez un modèle</option>
        <option v-for="model in models" :key="model" :value="model">{{ model }}</option>
      </select>

      <select v-model="selectedKeywords" :disabled="!selectedModel" multiple>
        <option disabled value="">Sélectionnez des mots-clés</option>
        <option v-for="keyword in keywords" :key="keyword" :value="keyword">{{ keyword }}</option>
      </select>

      <select v-model="selectedEnergies" :disabled="!selectedModel">
        <option disabled value="">Sélectionnez des énergies</option>
        <option v-for="energy in energies" :key="energy" :value="energy">{{ energy }}</option>
      </select>

      <select v-model="selectedTransmissions"  :disabled="!selectedModel">
        <option disabled value="">Sélectionnez des transmissions</option>
        <option v-for="transmission in transmissions" :key="transmission" :value="transmission">{{ transmission }}</option>
      </select>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { API } from 'aws-amplify';
import { listVehicles } from './graphql/queries';

export default {
  created() {
    this.fetchMakes();
  },
  data() {
    return {
      makes: [],
      models: [],
      keywords: [],
      energies: [],
      transmissions: [],
      selectedMake: null,
      selectedModel: null,
      selectedKeywords: [],
      selectedEnergies: [],
      selectedTransmissions: [],
      // Form
      form: {
        make: null,
        model: null,
        keywords: [],
        energies: [],
        transmissions: []
      }
    }
  },
  methods: {
    async fetchMakes() {
      try {
        const response = await API.graphql({
          query: listVehicles,
          variables: {
            limit: 10000,
            nextToken: null,
            sortDirection: "ASC",
            filter: {
              make: {
                ne: null
              }
            }
          }
        });
        this.makes = response.data.listVehicles.items.map(item => item.make);
        this.makes = [...new Set(this.makes)];
        this.makes = this.makes.sort();
        this.selectedMake = null;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchModels() {
      try {
        const response = await API.graphql({
          query: listVehicles,
          variables: {
            limit: 10000,
            nextToken: null,
            sortDirection: "ASC",
            filter: {
              make: {
                eq: this.selectedMake
              },
              model: {
                ne: null
              }
            }
          }
        });
        this.models = response.data.listVehicles.items.map(item => item.model);
        this.models = [...new Set(this.models)];
        this.models = this.models.sort();
        console.log(this.models)
        this.selectedModel = null;
        this.keywords = [];
        this.energies = [];
        this.transmissions = [];
        this.selectedKeywords = [];
        this.selectedEnergies = [];
        this.selectedTransmissions = [];
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDetails() {
      try {
        const response = await API.graphql({
          query: listVehicles,
          variables: {
            limit: 10000,
            nextToken: null,
            sortDirection: "ASC",
            filter: {
              make: {
                eq: this.selectedMake,
              },
              model: {
                eq: this.selectedModel,
              }
            }
          }
        });
        this.keywords = response.data.listVehicles.items.map(item => item.keywords)[0];
        this.keywords = [...new Set(this.keywords)];
        this.keywords = this.keywords.sort();
        console.log(this.keywords)
        this.energies = response.data.listVehicles.items.map(item => item.energies)[0];
        this.energies = [...new Set(this.energies)];
        this.energies = this.energies.sort();
        console.log(this.energies)
        this.transmissions = response.data.listVehicles.items.map(item => item.transmissions)[0];
        this.transmissions = [...new Set(this.transmissions)];
        this.transmissions = this.transmissions.sort();
        console.log(this.transmissions)
        this.selectedKeywords = [];
        this.selectedEnergies = [];
        this.selectedTransmissions = [];
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
