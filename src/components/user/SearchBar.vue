<template>
    <div class="p-3 relative mx-auto my-auto rounded-xl shadow-lg border-gray-100 z-100">
        <form id="form" class="mx-auto pt-5" @submit.prevent="submitForm">
            <div class="grid lg:grid-cols-2 sm:grid-cols-1 gap-8">
                <div>
                    <select v-model="selectedMake" @change="fetchModels"
                        class="w-full bg-gray-700 text-white hover:bg-gray-600 hover:text-red-50 shadow-lg rounded-lg py-2 px-1 text-sm sm:text-base">
                        <option disabled value="" class="text-white">Sélectionnez une marque</option>
                        <option v-for="make in makes" :key="make" :value="make">{{ make.toUpperCase() }}</option>
                    </select>
                </div>
                <div>
                    <select v-model="selectedModel" :disabled="!selectedMake" @change="fetchDetails"
                        class="w-full bg-gray-700 text-white hover:bg-gray-500 hover:text-red-50 shadow-lg rounded-lg py-2 px-1 text-sm sm:text-base">
                        <option disabled value="">Sélectionnez un modèle</option>
                        <option v-for="model in models" :key="model" :value="model">{{ model.toUpperCase() }}</option>
                    </select>
                </div>
                <div>
                    <select v-model="selectedEnergies" :disabled="!selectedModel"
                        class="w-full bg-gray-700 text-white hover:bg-gray-500 hover:text-red-50 shadow-lg rounded-lg py-2 px-1 text-sm sm:text-base">
                        <option disabled value="">Sélectionnez des énergies</option>
                        <option v-for="energy in energies" :key="energy" :value="energy">{{ energy.toUpperCase() }}</option>
                    </select>
                </div>
                <div>
                    <select v-model="selectedTransmissions" :disabled="!selectedModel"
                        class="w-full bg-gray-700 text-white hover:bg-gray-500 hover:text-red-50 shadow-lg rounded-lg py-2 px-1 text-sm sm:text-base">
                        <option disabled value="">Sélectionnez des énergies</option>
                        <option v-for="transmission in transmissions" :key="transmission" :value="transmission">{{
                            transmission.toUpperCase() }}</option>
                    </select>
                </div>
                <div>
                    <label for="year" class="text-gray-800 ml-5 mb-2 text-sm sm:text-base">Année</label>
                    <Slider v-model="year" :min="1990" :max="2030" class="" />
                </div>
                <div>
                    <label for="kms" class="text-gray-800 ml-5 mb-2 text-sm sm:text-base">Kilométrage</label>
                    <input type="text" v-model="kms"
                        class="w-full bg-gray-700 text-white hover:bg-gray-500 hover:text-red-50 shadow-lg rounded -lg py-2 px-1 text-sm sm:text-base" />
                </div>
            </div>
            <div class="pt-5">
                <div class="selected-tags">
                    <span v-for="tag in selectedKeywords" :key="tag" class="p-1 mx-3 bg-green-400 rounded-lg shadow-lg">{{
                        tag }}</span>
                </div>
                <div class="w-full">
                    <label class="text-gray-800 mb-2 text-sm sm:text-base">Sélectionnez les mots clés:</label>
                    <div class="all-tags">
                        <span v-for="option in sortedKeywords" :key="option.label" @click="toggleTag(option)"
                            class="text-sm sm:text-base">
                            {{ option.label.toUpperCase() }} <span v-if="option.selected" class="text-green-500">✓ </span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="flex justify-center mt-4">
                <button type="submit"
                    class="w-full px-4 py-2 text-white bg-blue-500 rounded-md focus:bg-blue-600 focus:outline-none text-sm sm:text-base">Rechercher</button>
            </div>
        </form>
    </div>
</template>


<style src="@vueform/slider/themes/default.css">
@import '@vueform/multiselect/themes/tailwind.css';
</style>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import { API } from 'aws-amplify';
import { listVehicles } from '../../graphql/queries';
import Slider from '@vueform/slider';
import { useRouter } from 'vue-router';

export default defineComponent({
    components: {
        Slider,
    },
    emits: ['close-modal'], // declaration of events emitted by the component
    setup(_, { emit }) { // declaration of setup methods with the { emit } object
        const router = useRouter();

        const makes = ref([]);
        const models = ref([]);
        const keywords = ref([]);
        const energies = ref([]);
        const transmissions = ref([]);
        const selectedMake = ref(null);
        const selectedModel = ref(null);
        const selectedKeywords = ref([]);
        const selectedEnergies = ref([]);
        const selectedTransmissions = ref([]);

        const kms = ref('');
        const year = ref(new Date().getFullYear());

        const sortedKeywords = computed(() =>
            keywords.value.sort((a, b) => a.label.localeCompare(b.label))
        );

        const toggleTag = (tag) => {
            tag.selected = !tag.selected;
            if (tag.selected) {
                selectedKeywords.value.push(tag.label);
            } else {
                const index = selectedKeywords.value.indexOf(tag.label);
                if (index > -1) {
                    selectedKeywords.value.splice(index, 1);
                }
            }
        };

        const fetchMakes = async () => {
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
                makes.value = response.data.listVehicles.items.map(item => item.make);
                makes.value = [...new Set(makes.value)];
                makes.value = makes.value.sort();
                selectedMake.value = null;
            } catch (error) {
                console.log(error);
            }
        };
        const fetchModels = async () => {
            try {
                const response = await API.graphql({
                    query: listVehicles,
                    variables: {
                        limit: 10000,
                        nextToken: null,
                        sortDirection: "ASC",
                        filter: {
                            make: {
                                eq: selectedMake.value
                            },
                            model: {
                                ne: null
                            }
                        }
                    }
                });
                models.value = response.data.listVehicles.items.map(item => item.model);
                models.value = [...new Set(models.value)];
                models.value = models.value.sort();
                selectedModel.value = null;
                keywords.value = [];
                energies.value = [];
                transmissions.value = [];
                selectedKeywords.value = [];
                selectedEnergies.value = [];
                selectedTransmissions.value = [];
            } catch (error) {
                console.log(error);
            }
        };

        const fetchDetails = async () => {
            try {
                const response = await API.graphql({
                    query: listVehicles,
                    variables: {
                        limit: 10000,
                        nextToken: null,
                        sortDirection: "ASC",
                        filter: {
                            make: {
                                eq: selectedMake.value,
                            },
                            model: {
                                eq: selectedModel.value,
                            }
                        }
                    }
                });
                keywords.value = response.data.listVehicles.items.map(item => item.keywords)[0];
                keywords.value = [...new Set(keywords.value)];
                keywords.value = keywords.value.map(keyword => {
                    return {
                        label: keyword,
                        selected: false
                    };
                });
                energies.value = response.data.listVehicles.items.map(item => item.energies)[0];
                energies.value = [...new Set(energies.value)];
                energies.value = energies.value.sort();
                transmissions.value = response.data.listVehicles.items.map(item => item.transmissions)[0];
                transmissions.value = [...new Set(transmissions.value)];
                transmissions.value = transmissions.value.sort();
                selectedKeywords.value = [];
                selectedEnergies.value = [];
                selectedTransmissions.value = [];
            } catch (error) {
                console.log(error);
            }
        };

        const submitForm = async () => {
            const data = {
                "make": selectedMake.value,
                "model": selectedModel.value,
                "kms": kms.value,
                "year": year.value,
                "keywords": selectedKeywords.value,
                "energies": selectedEnergies.value,
                "transmissions": selectedTransmissions.value
            }
            console.log(data)
            try {
                const result = await API.post('demo', '/evalia', {
                    headers: {
                        "x-api-key": "nzrUMQjcLua1JP6upoFRB3N4RhehR0J23eN1RL3O",
                    },
                    body: data,
                })
                emit('close-modal');
                router.push({
                    path: '/user/eval',
                    query: {
                        make: result.make,
                        model: result.model,
                        year: result.year,
                        kms: result.mileage,
                        transmission: result.transmission,
                        energy: result.energies,
                        keywords: result.keywords,
                        price: result.price,
                        r2: result.metrics.r2,
                        mae: result.metrics.mae,
                        rmse: result.metrics.rmse
                    }
                })
            } catch (error) {
                console.log(error);
            }
        };

        onMounted(async () => {
            await fetchMakes();
        });

        return {
            year,
            kms,
            makes,
            models,
            keywords,
            energies,
            transmissions,
            selectedMake,
            selectedModel,
            selectedKeywords,
            selectedEnergies,
            selectedTransmissions,
            sortedKeywords,
            toggleTag,
            fetchMakes,
            fetchModels,
            fetchDetails,
            submitForm,
        };
    },
});
</script>
