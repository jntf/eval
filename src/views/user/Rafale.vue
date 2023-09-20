<template>
    <div class="h-full flex flex-col items-center justify-center pt-8 pb-24 bg-white">

        <!-- Section for file upload and reset -->
        <div v-if="!isFileAvailable" class="mb-8 w-full flex justify-center">
            <label class="relative inline-flex items-center">
                <input type="file" @change="onFileChange" class="absolute w-full h-full opacity-0 cursor-pointer" />
                <div
                    class="flex px-4 py-2 bg-white text-red-700 border-2 border-red-700 hover:bg-red-700 hover:text-white rounded-l-md">
                    Charger</div>
            </label>
            <button @click="resetAll" class="px-4 py-2 bg-red-700 text-white border-l border-red-700 rounded-r-md">
                <i class="fas fa-undo"></i>
            </button>
        </div>

        <!-- Table for column mapping -->
        <div v-if="columns.length > 0 && !isFileAvailable" class="w-full mb-8 overflow-x-auto">
            <table class="min-w-full bg-gray-800 text-white border rounded-lg shadow-md text-xs md:text-sm">
                <thead>
                    <tr class="border-b">
                        <th class="px-4 py-3">Colonne du Fichier</th>
                        <th class="px-4 py-3">Sélectionner Colonne</th>
                        <th class="px-4 py-3">Exemple</th>
                    </tr>
                </thead>
                <tbody class="bg-white text-gray-800">
                    <tr v-for="(column, index) in columns" :key="index" :class="{ 'bg-gray-50': index % 2 === 0 }">
                        <td class="px-4 py-3 border-b">{{ column }}</td>
                        <td class="px-4 py-3 border-b">
                            <select v-model="selectedColumns[column]"
                                class="block w-full p-2 border rounded-md bg-gray-700 text-white">
                                <option value="" selected>Sélectionner...</option>
                                <option v-for="(optionValue, optionKey) in options" :key="optionKey" :value="optionKey">{{
                                    optionValue }}</option>
                            </select>
                        </td>
                        <td class="px-4 py-3 border-b">{{ Array.from(sampleValues[column]).join(', ').slice(0, 50) }}<span
                                v-if="Array.from(sampleValues[column]).join(', ').length >= 50"> ...</span></td>
                    </tr>
                </tbody>
            </table>
            <button @click="loadToS3" class="mt-4 px-4 py-2 bg-red-700 text-white rounded-md self-center">Calculer les
                prix</button>
        </div>

        <!-- Section for displaying the file data -->
        <div v-if="isFileAvailable" class="flex flex-col items-center w-full">
            <div class="flex flex-row">
                <button @click="newEval" class="px-4 py-2 bg-gray-600 text-white rounded-l-md mb-4">
                    <i class="fas fa-backward"></i>
                </button>
                <button @click="downloadFile" class="px-4 py-2 bg-green-600 text-white rounded-r-md mb-4">
                    <i class="fas fa-file-export"></i>
                </button>
            </div>
            <div class="overflow-x-auto">
                <table class="table-auto rounded shadow border border-gray-200 text-sm lg:text-base">
                    <thead>
                        <tr class="bg-gray-500 text-gray-700 font-bold">
                            <!-- <th v-for="(value, key) in fileData[0]" :key="key" class="px-2 py-4" :class="getColumnClass(key)">{{ capitalize(key) }}</th> -->
                            <th v-for="(value, key, index) in Object.keys(fileData[0]).slice(0, -3)" :key="key" class="px-2 py-4" :class="getColumnClass(key)">{{ capitalize(value) }}</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white text-gray-600 alternated">
                        <tr v-for="(row, index) in fileData" :key="index" :class="{ 'bg-gray-50': index % 2 === 0 }"
                            class="h-12 whitespace-nowrap text-gray">
                            <!-- <td v-for="value in Object.values(row)" :key="value" class="px-2 py-2 border-b border-gray-800 text-sm max-w-xs">
                                {{ formatValue(value) }}
                            </td> -->
                            <td v-for="value in Object.values(row).slice(0, -3)" :key="value"
                                class="px-2 py-2 border-b border-gray-800 text-sm max-w-xs">
                                {{ formatValue(value) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>
  
<script>
import { ref, computed } from 'vue';
import { API } from 'aws-amplify';
import Papa from 'papaparse';
import * as ExcelJS from 'exceljs';
import { Storage } from 'aws-amplify';
import dayjs from 'dayjs';
import { useLoadingStore } from '../../stores/loadingStore';
import generateRef from '../../helpers/getRef';
import { createSearchHistory } from '../../graphql/mutations.js';

export default {
    setup() {
        const loadingStore = useLoadingStore();
        const refId = generateRef();
        const data = ref([]);
        const columns = ref([]);
        const selectedColumns = ref({});
        const sampleValues = ref({});
        const options = {
            make: 'Marque',
            model: 'Modèle',
            keywords: 'Version',
            energy: 'Énergie',
            transmission: 'Transmission',
            year: 'Année',
            kms: 'Kilomètres',
            equipment: 'Équipement',
            color: 'Couleur'
        };
        const responseData = ref([]);

        const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
        const formatValue = (value) => {
            if (typeof value === 'number') {
                return value.toFixed(2);
            }
            return value;
        };
        const getColumnClass = (column) => {
            if (['make', 'model', 'keywords', 'energy', 'transmission', 'year', 'kms', 'color', 'evaluation'].includes(column)) {
                return `w-1/${9}`;
            }
        };

        const downloadLink = ref('');
        const isFileAvailable = ref(false);
        const fileData = ref([]);

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
                reader.onload = async (e) => {

                    // responseData.value = [];
                    columns.value = [];
                    selectedColumns.value = {};
                    sampleValues.value = {};

                    const bufferData = new Uint8Array(e.target.result);
                    const workbook = new ExcelJS.Workbook();
                    await workbook.xlsx.load(bufferData);
                    const worksheet = workbook.worksheets[0];

                    // Create array to hold data
                    let jsonData = [];
                    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
                        let rowObj = {};
                        row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
                            let columnHeader = worksheet.getRow(1).getCell(colNumber).value;
                            rowObj[columnHeader] = cell.value;
                        });
                        if (rowNumber !== 1) {
                            jsonData.push(rowObj);
                        }
                    });

                    data.value = jsonData;
                    if (data.value.length > 0) {
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
                    }

                    const responseData = data.value;
                };
                reader.readAsArrayBuffer(file);
            } else {
                alert('Format de fichier non supporté');
            }
        };

        const saveDatabase = async (processedData, filePath) => {
            const searchHistoryData = {
                isMultipleImport: true,
                s3Link: filePath,
                dataSearch: JSON.stringify([processedData]),
                ref: refId,
            };
            console.log(searchHistoryData)

            await API.graphql({
                query: createSearchHistory,
                variables: { input: searchHistoryData },
                authMode: 'AMAZON_COGNITO_USER_POOLS',
            });
        }

        const checkFileAvailability = async (filePath, interval = 1000) => {
            try {
                const fileUrl = await Storage.get(filePath, { level: "private" });
                const response = await fetch(fileUrl);

                if (response.ok) {
                    // Le fichier existe, mettre à jour la variable isFileAvailable
                    isFileAvailable.value = true;

                    // Lire le fichier CSV et stocker les données dans la variable fileData
                    Papa.parse(fileUrl, {
                        download: true,
                        header: true,
                        complete: (results) => {
                            fileData.value = results.data;
                            saveDatabase(fileData.value, filePath)
                        }
                    });
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
            loadingStore.setLoading(true);
            const jsonData = {
                columns: Object.fromEntries(
                    Object.entries(selectedColumns.value).map(([key, value]) => [key, value])
                ),
                data: data.value,
            };
            const processedData = jsonData.data.map(item => {
                const newData = {};
                Object.keys(jsonData.columns).forEach(key => {
                    newData[jsonData.columns[key]] = item[key];
                });
                return newData;
            });
            console.log(processedData)
            const jsonString = JSON.stringify(jsonData);
            const dateTime = dayjs().format("YYYY-MM-DD-HH-mm-ss");
            const directoryPath = `${dateTime}`;
            const fileName = "data.json";
            const csvFileName = "result.csv";
            const xlsxFileName = "result.xlsx";

            try {
                await Storage.put(`${directoryPath}/${fileName}`, jsonString, {
                    contentType: "application/json",
                    level: "private",
                });

                const csvFilePath = `${directoryPath}/${csvFileName}`;
                const xlsxFilePath = `${directoryPath}/${xlsxFileName}`;

                // Commencer à vérifier la disponibilité du fichier
                checkFileAvailability(csvFilePath);

                // Générer le lien de téléchargement du fichier CSV
                const signedURL = await Storage.get(xlsxFilePath, { level: "private" });

                // Stocker le lien de téléchargement dans la variable downloadLink
                downloadLink.value = signedURL;

                // alert("Les données ont été chargées sur S3 avec succès.");
            } catch (error) {
                console.error(error);
                alert("Une erreur s'est produite lors du chargement des données sur S3.");
            }
            loadingStore.setLoading(false)
        };

        const downloadFile = () => {
            window.open(downloadLink.value, "_blank");
        };

        const newEval = () => {
            isFileAvailable.value = false;
            columns.value = [];
        }

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
            fileData,
            capitalize,
            formatValue,
            getColumnClass,
            newEval
        };
    },
};
</script>