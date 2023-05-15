<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
        <div class="grid grid-cols-3 lg-w-1/3">
            <div></div>
            <input type="file" @change="onFileChange" class="p-2 border border-gray-300 rounded-md"
                v-if="!isFileAvailable" />
            <button @click="resetAll" class="px-4 py-2 bg-blue-500 text-white rounded-md w-1/6">
                <i class="fas fa-undo mr-2"></i>
            </button>
        </div>

        <div v-if="columns.length > 0 && !isFileAvailable">
            <table class="table-auto border-collapse">
                <thead class="">
                    <tr>
                        <th class="px-4 py-2 text-gray-800">Colonne du Fichier</th>
                        <th class="px-4 py-2 text-gray-800">Sélectionner Colonne</th>
                        <th class="px-4 py-2 text-gray-800">Exemple</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(column, index) in columns" :key="index" class="bg-white">
                        <td class="px-4 py-2">{{ column }}</td>
                        <td class="px-4 py-2">
                            <select v-model="selectedColumns[column]"
                                class="block w-full p-2 border border-gray-300 rounded-md mb-2">
                                <option v-for="(optionValue, optionKey) in options" :key="optionKey" :value="optionKey">{{
                                    optionValue }}</option>
                            </select>
                        </td>
                        <td class="px-4 py-2">{{ Array.from(sampleValues[column]).join(', ').slice(0, 50) }}<span
                                v-if="Array.from(sampleValues[column]).join(', ').length >= 50"> ...</span></td>
                    </tr>
                </tbody>
            </table>
            <button @click="loadToS3" class="px-4 py-2 bg-blue-500 text-white rounded-md">Calculer les prix</button>
        </div>
        <div class="flex justify-between items-center mt-4">
            <button @click="downloadFile" class="px-4 py-2 bg-green-500 text-white rounded-md" v-if="isFileAvailable">
                Télécharger le fichier CSV
            </button>
            <a v-if="downloadLink" :href="downloadLink" target="_blank" rel="noopener noreferrer"
                class="text-blue-500 underline">
                Voir le fichier CSV
            </a>
        </div>
    </div>
</template>
  
  
  
<script>
import { ref, computed } from 'vue';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { API, Auth, Storage } from 'aws-amplify';
import dayjs from 'dayjs';

export default {
    setup() {
        const data = ref([]);
        const columns = ref([]);
        const selectedColumns = ref({});
        const sampleValues = ref({});
        const options = {
            make: 'Marque',
            // make_model: 'Marque Modèle',
            // make_model_version: 'Marque Modèle Version',
            model: 'Modèle',
            // model_version: 'Modèle Version',
            keywords: 'Version',
            energy: 'Énergie',
            transmission: 'Transmission',
            year: 'Année',
            kms: 'Kilomètres',
            equipment: 'Équipement',
            color: 'Couleur'
        };
        const responseData = ref([]);

        const downloadLink = ref('');
        const isFileAvailable = ref(false);

        const itemsPerPage = ref(10); // nombre d'items par page
        const currentPage = ref(1); // page actuelle
        const totalPages = computed(() => Math.ceil(responseData.value.length / itemsPerPage.value)); // nombre total de pages
        const changePage = (newPage) => {
            if (newPage >= 1 && newPage <= totalPages.value) {
                currentPage.value = newPage;
            }
        };

        const resetAll = () => {
            location.reload();
        };

        const onFileChange = (e) => {
            const file = e.target.files[0];
            if (file.type === "text/csv") {
                Papa.parse(file, {
                    header: true,
                    complete: (results) => {

                        // responseData.value = [];
                        columns.value = [];
                        selectedColumns.value = {};
                        sampleValues.value = {};

                        data.value = results.data;
                        columns.value = results.meta.fields;
                        sampleValues.value = data.value.reduce((acc, row) => {
                            Object.keys(row).forEach((key) => {
                                if (!acc[key]) {
                                    acc[key] = new Set();
                                }
                                acc[key].add(row[key]);
                            });
                            return acc;
                        }, {});
                        const responseData = data.value
                    }
                });
            } else if (file.name.endsWith('.xlsx')) {
                const reader = new FileReader();
                reader.onload = (e) => {

                    // responseData.value = [];
                    columns.value = [];
                    selectedColumns.value = {};
                    sampleValues.value = {};

                    const bufferData = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(bufferData, { type: 'array' });
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    data.value = XLSX.utils.sheet_to_json(worksheet);

                    columns.value = Object.keys(data.value[0]);
                    sampleValues.value = data.value.reduce((acc, row) => {
                        Object.keys(row).forEach((key) => {
                            if (!acc[key]) {
                                acc[key] = new Set();
                            }
                            acc[key].add(row[key]);
                        });
                        return acc;
                    }, {});
                    const responseData = data.value
                };
                reader.readAsArrayBuffer(file);
            } else {
                alert('Format de fichier non supporté');
            }
        };

        const checkFileAvailability = async (filePath, interval = 1000) => {
            try {
                const file = await Storage.get(filePath, { level: "private" });
                if (file) {
                    // Mettre à jour la variable isFileAvailable
                    isFileAvailable.value = true;
                } else {
                    // Fichier non trouvé, continuer à vérifier après l'intervalle spécifié
                    setTimeout(() => checkFileAvailability(filePath, interval), interval);
                }
            } catch (error) {
                console.error(error);
                // Erreur lors de la récupération du fichier, continuer à vérifier après l'intervalle spécifié
                setTimeout(() => checkFileAvailability(filePath, interval), interval);
            }
        };

        const loadToS3 = async () => {
            const selectedColumnNames = Object.values(selectedColumns.value);
            const jsonData = {
                columns: Object.fromEntries(
                    Object.entries(selectedColumns.value).map(([key, value]) => [key, value])
                ),
                data: data.value,
            };
            const jsonString = JSON.stringify(jsonData);
            const currentUser = await Auth.currentAuthenticatedUser();
            const username = currentUser.username;
            const dateTime = dayjs().format("YYYY-MM-DD-HH-mm-ss");
            const directoryPath = `${dateTime}`;
            const fileName = "data.json";
            const csvFileName = "result.csv"; // Nom du fichier CSV

            try {
                await Storage.put(`${directoryPath}/${fileName}`, jsonString, {
                    contentType: "application/json",
                    level: "private",
                });

                const csvFilePath = `${directoryPath}/${csvFileName}`;

                // Commencer à vérifier la disponibilité du fichier
                checkFileAvailability(csvFilePath);

                // Générer le lien de téléchargement du fichier CSV
                const signedURL = await Storage.get(csvFilePath, { level: "private" });

                // Stocker le lien de téléchargement dans la variable downloadLink
                downloadLink.value = signedURL;

                alert("Les données ont été chargées sur S3 avec succès.");
            } catch (error) {
                console.error(error);
                alert("Une erreur s'est produite lors du chargement des données sur S3.");
            }
        };

        const downloadFile = () => {
            window.open(downloadLink.value, "_blank");
        };

        return {
            data,
            columns,
            selectedColumns,
            options,
            sampleValues,
            responseData,
            resetAll,
            onFileChange,
            loadToS3,
            downloadLink,
            downloadFile,
            itemsPerPage,
            currentPage,
            totalPages,
            changePage,
            isFileAvailable,
        };
    },
};
</script>
  