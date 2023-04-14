<template>
    <div id="car" class="relative dark:bg-slate-900 w-screen h-screen pattern opacity-95" :class="{ 'hidden': !sidebarIsOpen }">
        {{ wordsOfVersions }}
        <nav
            class="z-20 flex shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 bg-gray-200 p-2.5 shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50 fixed top-2/4 -translate-y-2/4 left-6 min-h-[auto] min-w-[64px] flex-col rounded-lg border">
            <form id="form" class="w-full mx-auto pt-5">
                <div class="flex flex-col">

                    <label for="car" class="text-sm text-gray-50 dark:text-gray-400 text-center">Marque</label>
                    <select id="car" name="car" v-model="carForm.brand"
                        class="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 focus:border-blue-500 focus:outline-none focus:ring">
                        <option value="" disabled selected>Marque</option>
                        <option v-for="(brand, index) in Object.keys(brands_models)" :key="index" :value="brand">{{
                            brand.toUpperCase()
                        }}</option>
                    </select>
                </div>
                <div class="flex flex-col pt-2">
                    <label for="model" class="text-sm text-gray-50 dark:text-gray-400 text-center">Modèle</label>
                    <select id="model" name="model" v-model="carForm.model"
                        class="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 focus:border-blue-500 focus:outline-none focus:ring">
                        <option value="" disabled selected>Modèle</option>
                        <option value="" disabled selected>Modèle</option>
                        <option v-for="(model, index) in brands_models[carForm.brand]" :key="index" :value="model">{{
                            model.toUpperCase()
                        }}</option>
                    </select>
                </div>
                <!-- Input version with multiple selection -->
                <div class="flex flex-col pt-2">
                    <label for="version" class="text-sm text-gray-50 dark:text-gray-400 text-center">Version</label>
                    <Multiselect v-model="selectedVersion" :options="selectdOptions" :multiple="true" id="version" />
                </div>

                <!-- Mutli range slider year between 1980 and now -->
                <div class="flex flex-col pt-2">
                    <label for="year" class="text-sm text-gray-50 dark:text-gray-400 text-center pb-2">Année</label>
                    <Slider v-model="value" :min="1990" :max="2030" />
                </div>

                <div class="flex flex-col pt-2">
                    <label for="fuel" class="text-sm text-gray-50 dark:text-gray-400 text-center">Couleur</label>
                    <select id="fuel" name="fuel" v-model="carForm.color"
                        class="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 focus:border-blue-500 focus:outline-none focus:ring">
                        <option value="" disabled selected>Couleur</option>
                        <option v-for="item in color" :key="color" :value="item.id">{{ item.name.charAt(0).toUpperCase() +
                            item.name.slice(1) }}</option>
                    </select>
                </div>
                <div class="flex flex-col pt-2">
                    <label for="fuel" class="text-sm text-gray-50 dark:text-gray-400 text-center">Carburant</label>
                    <select id="fuel" name="fuel" v-model="carForm.energy"
                        class="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 focus:border-blue-500 focus:outline-none focus:ring">
                        <option value="" disabled selected>Couleur</option>
                        <option v-for="item in energies" :key="energy" :value="item.id">{{ item.name.charAt(0).toUpperCase()
                            + item.name.slice(1) }}</option>
                    </select>
                </div>
                <div class="flex flex-col pt-2">
                    <label for="fuel" class="text-sm text-gray-50 dark:text-gray-400 text-center">Transmission</label>
                    <select id="fuel" name="fuel" v-model="carForm.transmission"
                        class="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 focus:border-blue-500 focus:outline-none focus:ring">
                        <option value="" disabled selected>Transmission</option>
                        <option v-for="item in transmissions" :key="transmission" :value="item.id">{{
                            item.name.charAt(0).toUpperCase() + item.name.slice(1) }}</option>
                    </select>
                </div>
            </form>
        </nav>
    </div>
</template>

<style src="@vueform/slider/themes/default.css">
@import '@vueform/multiselect/themes/tailwind.css';
</style>

<script>
import { defineComponent } from 'vue';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';

import Slider from '@vueform/slider'
import Multiselect from '@vueform/multiselect'

const brands_models = {
    audi: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'R8', 'RS3', 'RS4', 'RS5', 'RS6', 'RS7', 'RSQ3', 'S1', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'SQ5', 'SQ7', 'TT', 'TTS'],
    bmw: ['1er', '2er', '3er', '4er', '5er', '6er', '7er', '8er', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z3', 'Z4', 'Z8', 'i3', 'i8'],
    citroen: ['Berlingo', 'C1', 'C2', 'C3', 'C3 Aircross', 'C3 Picasso', 'C4', 'C4 Aircross', 'C4 Cactus', 'C4 Picasso', 'C5', 'C5 Aircross', 'C6', 'C8', 'C-Crosser', 'C-Elysée', 'C-Zero', 'DS3', 'DS4', 'DS5', 'DS7', 'DS7 Crossback', 'Jumper', 'Jumpy', 'Nemo', 'Saxo', 'Spacetourer', 'Xantia', 'XM', 'Xsara', 'Xsara Picasso'],
    dacia: ['Dokker', 'Duster', 'Logan', 'Logan MCV', 'Logan Van', 'Sandero', 'Sandero Stepway', 'Sandero Van', 'Solenza', 'Spring', 'Stepway'],
    mercedes: ['A-Klasse', 'AMG GT', 'AMG GT 4-Door', 'AMG GT C', 'AMG GT R', 'AMG GT S', 'B-Klasse', 'C-Klasse', 'CLA', 'CLC', 'CLK', 'CLS', 'E-Klasse', 'G-Klasse', 'GLA', 'GLC', 'GLE', 'GLK', 'GLS', 'M-Klasse', 'R-Klasse', 'S-Klasse', 'SL', 'SLC', 'SLK', 'SLR', 'SLS', 'V-Klasse', 'Vaneo', 'Viano', 'Vito', 'X-Klasse'],
    nissan: ['micra', 'qashqai', 'x-trail'],
    peugeot: ['1007', '106', '107', '108', '2008', '205', '206', '206+', '207', '207 CC', '208', '3008', '306', '307', '307 CC', '308', '308 CC', '308 SW', '4007', '4008', '405', '406', '407', '407 SW', '5008', '508', '508 SW', '605', '607', '806', '807', 'Bipper', 'Boxer', 'Expert', 'iOn', 'Partner', 'RCZ', 'Rifter', 'Traveller'],
    renault: ['Alaskan', 'Captur', 'Clio', 'Clio Estate', 'Espace', 'Fluence', 'Grand Espace', 'Grand Modus', 'Grand Scénic', 'Kadjar', 'Kangoo', 'Kangoo Express', 'Koleos', 'Laguna', 'Latitude', 'Mégane', 'Mégane Coupé', 'Mégane Estate', 'Mégane RS', 'Mégane Scénic', 'Modus', 'Sandero', 'Scénic', 'Symbol', 'Talisman', 'Talisman Estate', 'Trafic', 'Twingo', 'Twizy', 'Wind', 'Zoe'],
    seat: ['Alhambra', 'Altea', 'Altea XL', 'Arosa', 'Ateca', 'Cordoba', 'Exeo', 'Ibiza', 'Inca', 'Leon', 'Mii', 'Ronda', 'Toledo', 'Troc'],
    skoda: ['Citigo', 'Fabia', 'Kamiq', 'Karoq', 'Kodiaq', 'Octavia', 'Octavia Combi', 'Rapid', 'Roomster', 'Superb', 'Superb Combi', 'Yeti'],
    volkswagen: ['Amarok', 'Arteon', 'Beetle', 'Bora', 'Caddy', 'California', 'Caravelle', 'CC', 'Crafter', 'Eos', 'Fox', 'Golf', 'Golf Plus', 'Golf Sportsvan', 'Jetta', 'Lupo', 'Multivan', 'New Beetle', 'Passat', 'Passat CC', 'Passat Variant', 'Phaeton', 'Polo', 'Polo GTI', 'Polo Variant', 'Scirocco', 'Sharan', 'Tiguan', 'Tiguan Allspace', 'Touareg', 'Touran', 'Transporter', 'Up'],
    volvo: ['C30', 'C70', 'S40', 'S60', 'S80', 'V40', 'V50', 'V60', 'V70', 'XC40', 'XC60', 'XC70', 'XC90']
}

export default defineComponent({
    name: 'car',
    props: {
        sidebarIsOpen: {
            type: Boolean,
        },
    },
    async created() {
        this.getElements();
    },
    components: {
        Slider,
        Multiselect,
    },
    data() {
        return {
            value: 2023,
            selectedVersion: 'null',
            selectdOptions: [
                'batman',
                'robin',
                'joker',
            ],
            brands_models,
            wordsOfVersions: [],
            color: [],
            energies: [],
            transmissions: [],
            carForm: {
                brand: '',
                model: '',
                version: '',
                energies: '',
                color: '',
                transmissions: '',
            }
        }
    },
    methods: {
        async getElements() {
            const allEnergies = await API.graphql({
                query: queries.listEnergies
            });
            this.energies = allEnergies.data.listEnergies.items;
            this.energies.sort((a, b) => a.name.localeCompare(b.name));

            const allTransmissions = await API.graphql({
                query: queries.listTransmissions
            });
            this.transmissions = allTransmissions.data.listTransmissions.items;
            this.transmissions.sort((a, b) => a.name.localeCompare(b.name));

            const allColor = await API.graphql({
                query: queries.listColors
            });
            this.color = allColor.data.listColors.items;
            this.color.sort((a, b) => a.name.localeCompare(b.name));

            const wordsOfVersions = await API.graphql({
                query: queries.listWordVersions
            });
            this.wordsOfVersions = wordsOfVersions.data.listWordVersions.items;
            
            console.log(wordsOfVersions);
        },
    }
});
</script>