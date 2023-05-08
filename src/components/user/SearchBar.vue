<template>
    <div class="p-3 relative mx-auto my-auto rounded-xl shadow-lg border-gray-100 z-100">
        <form id="form" class="mx-auto pt-5" @submit.prevent="submitForm">
            <div class="grid lg:grid-cols-2 sm:grid-cols-1 gap-8">
                <SelectComponent v-model="selectedMake" :options="makes" placeholder="Sélectionnez une marque"
                    @change="onMakeChange" />
                <SelectComponent v-model="selectedModel" :options="models" :disabled="!selectedMake"
                    placeholder="Sélectionnez un modèle" @change="onModelChange" />
                <SelectComponent v-model="selectedEnergies" :options="energies" :disabled="!selectedModel"
                    placeholder="Sélectionnez des énergies" />
                <SelectComponent v-model="selectedTransmissions" :options="transmissions" :disabled="!selectedModel"
                    placeholder="Sélectionnez des énergies" />
                <div>
                    <label for="year" class="text-gray-800 ml-5 mb-2 text-sm sm:text-base">Année</label>
                    <Slider v-model="year" :min="1990" :max="2030" class="" />
                </div>
                <div>
                    <label for="kms" class="text-gray-800 ml-5 mb-2 text-sm sm:text-base">Kilométrage</label>
                    <input type="text" v-model="kms"
                        class="w-full bg-gray-700 text-white hover:bg-gray-500 hover:text-red-50 shadow-lg rounded-lg py-2 px-1 text-sm sm:text-base" />
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
                        <KeywordToggle v-for="option in sortedKeywords" :key="option.label" :option="option"
                            @toggle="toggleTag(option)" />
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
import { useRouter } from 'vue-router';

import SelectComponent from './SelectComponent.vue';
import KeywordToggle from './KeywordToggle.vue';
import { fetchMakes, fetchModels, fetchDetails } from '../../stores/vehicles.js';
import { submitEvalForm } from '../../stores/evalForm.js';
import Slider from '@vueform/slider';

export default defineComponent({
    components: {
        Slider,
        SelectComponent,
        KeywordToggle
    },
    emits: ['close-modal'],
    setup(_, { emit }) {
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

        const onMakeChange = async () => {
            models.value = await fetchModels(selectedMake.value);
            selectedModel.value = null;
            keywords.value = [];
            energies.value = [];
            transmissions.value = [];
            selectedKeywords.value = [];
            selectedEnergies.value = [];
            selectedTransmissions.value = [];
        };

        const onModelChange = async () => {
            const details = await fetchDetails(selectedMake.value, selectedModel.value);
            keywords.value = details.keywords;
            energies.value = details.energies;
            transmissions.value = details.transmissions;
            selectedKeywords.value = [];
            selectedEnergies.value = [];
            selectedTransmissions.value = [];
        };

        onMounted(async () => {
            makes.value = await fetchMakes();
        });

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

            try {
                const result = await submitEvalForm(data);
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
                });
            } catch (error) {
                console.log(error);
            }
        };

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
            onMakeChange,
            onModelChange,
            submitForm
        };
    },
});
</script>
