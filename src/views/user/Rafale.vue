<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
        <input type="file" @change="onFileChange" class="mb-6 p-2 border border-gray-300 rounded-md" />

        <div v-if="columns.length > 0">
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
            <button @click="invokeLambda" class="px-4 py-2 bg-blue-500 text-white rounded-md">Calculer les prix</button>
        </div>
    </div>
</template>
  
  
  
<script>
import { ref } from 'vue';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { API } from 'aws-amplify';

export default {
    setup() {
        const data = ref([]);
        const columns = ref([]);
        const selectedColumns = ref({});
        const sampleValues = ref({});
        const options = {
            make: 'Marque',
            make_model: 'Marque Modèle',
            make_model_version: 'Marque Modèle Version',
            model: 'Modèle',
            model_version: 'Modèle Version',
            version: 'Version',
            energy: 'Énergie',
            transmission: 'Transmission',
            year: 'Année',
            kms: 'Kilomètres',
            equipment: 'Équipement',
            color: 'Couleur'
        };

        const onFileChange = (e) => {
            const file = e.target.files[0];
            if (file.type === "text/csv") {
                Papa.parse(file, {
                    header: true,
                    complete: (results) => {
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
                    }
                });
            } else if (file.name.endsWith('.xlsx')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const bufferData = new Uint8Array(e.target.result); // renommer ici
                    const workbook = XLSX.read(bufferData, { type: 'array' }); // et ici
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    data.value = XLSX.utils.sheet_to_json(worksheet); // maintenant cela devrait fonctionner correctement

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
                };
                reader.readAsArrayBuffer(file);
            } else {
                alert('Format de fichier non supporté');
            }
        };

        const invokeLambda = async () => {
            console.log({ data: data.value, columns: selectedColumns.value });
            const response = await API.post('myApiName', '/myPath', {
                body: { data: data.value, columns: selectedColumns.value }
            });
            // Handle response
        };

        return { data, columns, selectedColumns, options, sampleValues, onFileChange, invokeLambda };
    },
};
</script>
  