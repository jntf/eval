<template>
    <div class="sm:w-5/6 lg:w-2/3  p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
        <form id="form" class="mx-auto pt-5" @submit.prevent="submitForm">
            <div class="grid grid-cols-4 gap-3">
                <div class="">
                    <select v-model="selectedMake" @change="fetchModels"
                        class="bg-gray-800 text-white hover:bg-gray-600 hover:text-red-50 shadow-lg rounded-lg py-2 px-1">
                        <option disabled value="" class="text-white">Sélectionnez une marque</option>
                        <option v-for="make in makes" :key="make" :value="make">{{ make }}</option>
                    </select>
                </div>
                <div>
                    <select v-model="selectedModel" :disabled="!selectedMake" @change="fetchDetails"
                        class="bg-gray-800 text-white hover:bg-gray-500 hover:text-red-50 shadow-lg rounded-lg py-2 px-1">
                        <option disabled value="">Sélectionnez un modèle</option>
                        <option v-for="model in models" :key="model" :value="model">{{ model }}</option>
                    </select>
                </div>
                <div>
                    <select v-model="selectedEnergies" :disabled="!selectedModel"
                        class="bg-gray-800 text-white hover:bg-gray-500 hover:text-red-50 shadow-lg rounded-lg py-2 px-1">
                        <option disabled value="">Sélectionnez des énergies</option>
                        <option v-for="energy in energies" :key="energy" :value="energy">{{ energy }}</option>
                    </select>
                </div>
                <div>
                    <select v-model="selectedTransmissions" :disabled="!selectedModel"
                        class="bg-gray-800 text-white hover:bg-gray-500 hover:text-red-50 shadow-lg rounded-lg py-2 px-1">
                        <option disabled value="">Sélectionnez des énergies</option>
                        <option v-for="transmission in transmissions" :key="transmission" :value="transmission">{{
                            transmission }}</option>
                    </select>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-3">
                <div>
                    <label for="year" class="text-gray-800 ml-5">Année</label>
                    <Slider v-model="year" :min="1990" :max="2030" class="" />
                </div>
                <div>
                    <label for="kms" class="text-gray-800 ml-5">Kilométrage</label>
                    <Slider v-model="kms" :min="0" :max="500000" class="" />
                </div>
                <!-- Multiselect with the keywords and Multiselect composent -->
                <div>
                    <label for="keywords" class="text-gray-800 pt-5 pb-3 ml-5">Mots-clés</label>
                    <Multiselect v-model="selectedKeywords" :options="keywords" mode="tags" placeholder="Select options"
                        :close-on-select="false" :searchable="true" :object="true" :resolve-on-load="false" :delay="0"
                        :min-chars="1" :style="{ color: 'black', backgroundColor: 'gray', zIndex: '50' }" />
                </div>
            </div>
            <div>
                <button type="submit"
                    class="w-full px-4 py-2 mt-2 text-white bg-blue-500 rounded-md focus:bg-blue-600 focus:outline-none">Rechercher</button>
            </div>
        </form>
    </div>
</template>

<style src="@vueform/slider/themes/default.css">
@import '@vueform/multiselect/themes/tailwind.css';
</style>

<script>
import { defineComponent } from 'vue';
import { API } from 'aws-amplify';
import { listVehicles } from '../graphql/queries'

import Slider from '@vueform/slider'
import Multiselect from '@vueform/multiselect'

const year = new Date().getFullYear();

export default defineComponent({
    name: 'car',
    props: {
        sidebarIsOpen: {
            type: Boolean,
        },
    },
    async created() {
        this.fetchMakes();
    },
    components: {
        Slider,
        Multiselect,
    },
    data() {
        return {
            year: year,
            kms: '',
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
                this.energies = response.data.listVehicles.items.map(item => item.energies)[0];
                this.energies = [...new Set(this.energies)];
                this.energies = this.energies.sort();
                this.transmissions = response.data.listVehicles.items.map(item => item.transmissions)[0];
                this.transmissions = [...new Set(this.transmissions)];
                this.transmissions = this.transmissions.sort();
                this.selectedKeywords = [];
                this.selectedEnergies = [];
                this.selectedTransmissions = [];
            } catch (error) {
                console.log(error);
            }
        },
        async submitForm() {
            const data = {
                "make": this.selectedMake,
                "model": this.selectedModel,
                "kms": this.kms,
                "year": this.year,
                "keywords": this.selectedKeywords,
                "energies": this.selectedEnergies,
                "transmissions": this.selectedTransmissions
            }
            console.log(data)
            const path = 'https://7vlwbc2slg.execute-api.us-east-1.amazonaws.com/dev';
            try {
                const response = await API.post('evalPredApi','/evaluations', {
                    body: data
                })
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
    },
});
</script>