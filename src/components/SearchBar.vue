<template>
    <div class="p-3 relative mx-auto my-auto rounded-xl shadow-lg border-gray-100 z-100">
        <form id="form" class="mx-auto pt-5" @submit.prevent="submitForm">
            <div class="grid lg:grid-cols-2 sm:grid-clos-1 gap-24">
                <div class="">
                    <select v-model="selectedMake" @change="fetchModels"
                        class="w-full bg-gray-700 text-white hover:bg-gray-600 hover:text-red-50 shadow-lg rounded-lg py-2 px-1">
                        <option disabled value="" class="text-white">Sélectionnez une marque</option>
                        <option v-for="make in makes" :key="make" :value="make">{{ make.toUpperCase() }}</option>
                    </select>
                </div>
                <div>
                    <select v-model="selectedModel" :disabled="!selectedMake" @change="fetchDetails"
                        class="w-full bg-gray-700 text-white hover:bg-gray-500 hover:text-red-50 shadow-lg rounded-lg py-2 px-1">
                        <option disabled value="">Sélectionnez un modèle</option>
                        <option v-for="model in models" :key="model" :value="model">{{ model.toUpperCase() }}</option>
                    </select>
                </div>
                <div>
                    <select v-model="selectedEnergies" :disabled="!selectedModel"
                        class="w-full bg-gray-700 text-white hover:bg-gray-500 hover:text-red-50 shadow-lg rounded-lg py-2 px-1">
                        <option disabled value="">Sélectionnez des énergies</option>
                        <option v-for="energy in energies" :key="energy" :value="energy">{{ energy.toUpperCase() }}</option>
                    </select>
                </div>
                <div>
                    <select v-model="selectedTransmissions" :disabled="!selectedModel"
                        class="w-full bg-gray-700 text-white hover:bg-gray-500 hover:text-red-50 shadow-lg rounded-lg py-2 px-1">
                        <option disabled value="">Sélectionnez des énergies</option>
                        <option v-for="transmission in transmissions" :key="transmission" :value="transmission">{{
                            transmission.toUpperCase() }}</option>
                    </select>
                </div>
                <div>
                    <label for="year" class="text-gray-800 ml-5 mb-5">Année</label>
                    <Slider v-model="year" :min="1990" :max="2030" class="" />
                </div>
                <div>
                    <label for="kms" class="text-gray-800 ml-5">Kilométrage</label>
                    <input type="text" v-model="kms"
                        class="w-full bg-gray-700 text-white hover:bg-gray-500 hover:text-red-50 shadow-lg rounded-lg py-2 px-1" />
                </div>
            </div>
            <div class="pt-5">
                <div class="selected-tags">
                    <span v-for="tag in selectedKeywords" :key="tag"
                        class="p-1 mx-3 bg-green-400 rounded-lg shadow-lg">{{ tag }}</span>
                </div>
                <div class="w-full">
                    <label>Sélectionnez les mots clés:</label>
                    <div class="all-tags">
                        <span v-for="option in sortedKeywords" :key="selectedKeywords" @click="toggleTag(option)">
                            {{ option.label.toUpperCase() }} <span v-if="option.selected" class="text-green-500">✓ </span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="flex justify-center">
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
    computed: {
        sortedKeywords() {
            return this.keywords.sort((a, b) => a.label.localeCompare(b.label))
        }
    },
    methods: {
        toggleTag(tag) {
            tag.selected = !tag.selected;
            if (tag.selected) {
                this.selectedKeywords.push(tag.label);
            } else {
                const index = this.selectedKeywords.indexOf(tag.label);
                if (index > -1) {
                this.selectedKeywords.splice(index, 1);
                }
            }
        },
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
                this.keywords = this.keywords.map(keyword => {
                    return {
                        label: keyword,
                        selected: false
                    };
                });
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
            try {
                const result = await API.post('evalPredApi','/evaluations', {
                    body: data
                })
                console.log(result);
                this.$router.push({ path: '/eval', query: { response: result }})
            } catch (error) {
                console.log(error);
            }
        }
    },
});
</script>