<template>
    <div class="container mx-auto px-4 py-6">
        <h1 class="text-2xl font-semibold mb-4">Historique des recherches</h1>

        <div class="mb-4">
            <input type="text"
                class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Rechercher par date, référence, marque ou modèle" v-model="searchQuery"
                @input="filterResults" />
        </div>

        <div class="table-responsive">
            <table class="table-auto w-full mb-6">
                <thead>
                    <tr class="bg-gray-800">
                        <th class="text-white px-4 py-2">Date</th>
                        <th class="text-white px-4 py-2">Référence</th>
                        <th class="text-white px-4 py-2">Marque</th>
                        <th class="text-white px-4 py-2">Modèle</th>
                        <th class="text-white px-4 py-2">Version</th>
                        <th class="text-white px-4 py-2">Années</th>
                        <th class="text-white px-4 py-2">Kilomètres</th>
                        <th class="text-white px-4 py-2">Prix</th>
                        <th class="text-white px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody class="shadow-xl">
                    <tr v-for="(search, index) in filteredSearchHistory" :key="index">
                        <td class="border px-4 py-2 text-xs">{{ formatDate(search.createdAt) }}</td>
                        <td class="border px-4 py-2 text-xs">{{ search.ref }}</td>
                        <td class="border px-4 py-2 text-xs">
                            {{
                                Array.from(
                                    new Set(
                                        Array.isArray(search.dataSearch[0])
                                            ? search.dataSearch.flat().map(item => item.make)
                                            : search.dataSearch.map(item => item.make)
                                    )
                                ).join(', ').toUpperCase().slice(0, 30)
                            }}<span
                                v-if="search.isMultipleImport"> ...</span>
                        </td>
                        <td class="border px-4 py-2 text-xs">
                            {{
                                Array.from(
                                    new Set(
                                        Array.isArray(search.dataSearch[0])
                                            ? search.dataSearch.flat().map(item => item.model)
                                            : search.dataSearch.map(item => item.model)
                                    )
                                ).join(', ').toUpperCase().slice(0, 30)
                            }}<span
                                v-if="search.isMultipleImport"> ...</span>
                        </td>
                        <td class="border px-4 py-2 text-xs">
                            {{
                                Array.from(
                                    new Set(
                                        Array.isArray(search.dataSearch[0])
                                            ? search.dataSearch.flat().map(item => item.keywords)
                                            : search.dataSearch.map(item => item.keywords)
                                    )
                                ).join(', ').toUpperCase().slice(0, 30)
                            }}<span
                                v-if="search.isMultipleImport">...</span>
                        </td>
                        <td class="border px-4 py-2 text-xs">
                            {{
                                Array.from(
                                    new Set(
                                        Array.isArray(search.dataSearch[0])
                                            ? search.dataSearch.flat().map(item => item.year)
                                            : search.dataSearch.map(item => item.year)
                                    )
                                ).join(', ').toUpperCase().slice(0, 30)
                            }}<span
                                v-if="search.isMultipleImport"> ...</span>
                        </td>
                        <td class="border px-4 py-2 text-xs">
                            {{
                                Array.from(
                                    new Set(
                                        Array.isArray(search.dataSearch[0])
                                            ? search.dataSearch.flat().map(item => item.kms)
                                            : search.dataSearch.map(item => item.mileage)
                                    )
                                ).join(', ').toUpperCase().slice(0, 30)
                            }}<span
                                v-if="search.isMultipleImport"> ...</span>
                        </td>
                        <td class="border px-4 py-2 text-xs">
                            {{ formatPrice(search.dataSearch) }} <span>{{ search.isMultipleImport ? "€ en moyenne" : "€"
                            }}</span>
                        </td>
                        <td class="border px-4 py-2 text-xs mx-auto">
                            <button v-if="search.isMultipleImport" @click="downloadFile(search)"
                                class="bg-green-500 text-white rounded-md p-1 mx-1">
                                <i class="fas fa-file-export"></i>
                            </button>
                            <button @click="deleteSearchHistory(search.id)" class="bg-red-500 text-white rounded-md p-1"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div>
            <!-- Ajoutez ici la pagination en utilisant une bibliothèque de votre choix ou en créant votre propre solution. -->
        </div>

    </div>
</template>
<style scoped>
.table-responsive {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

@media screen and (min-width: 640px) {
    .table-responsive {
        display: table;
    }
}
</style>
<script>
import { ref, computed } from 'vue';
import { Auth, API, Storage } from 'aws-amplify';
import { listSearchHistories } from '../../graphql/queries';
import { deleteSearchHistory as deleteSearchHistoryMutation } from '../../graphql/mutations';

export default {
    setup() {
        const searchHistory = ref([]);
        const searchQuery = ref('');
        const s3Files = ref([]);
        const downloadLink = ref('');

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hour = String(date.getHours()).padStart(2, '0');
            const minute = String(date.getMinutes()).padStart(2, '0')
            return `${hour}:${minute} - ${day}/${month}/${year}`;
        };

        const formatArray = (array) => {
            if (!array) return 'x';
            if (array.length <= 3) return array.join(', ');
            return `${array.slice(0, 3).join(', ')}...`;
        };

        const formatPrice = (dataSearch) => {
            let prices;
            if (Array.isArray(dataSearch[0])) {
                prices = dataSearch.flat().filter(item => !isNaN(item.evaluation)).map(item => parseFloat(item.evaluation));
            } else {
                prices = dataSearch.filter(item => !isNaN(item.price)).map(item => parseFloat(item.price));
            }

            if (prices.length === 0) {
                return 'N/A';
            }

            const sum = prices.reduce((a, b) => a + b, 0);
            return parseFloat((sum / prices.length).toFixed(0));
        };

        const filteredSearchHistory = computed(() => {
            if (!searchQuery.value) {
                return searchHistory.value;
            }
            return searchHistory.value.filter((search) => {
                const query = searchQuery.value.toLowerCase();
                return (
                    search.createdAt.toLowerCase().includes(query) ||
                    search.ref.toLowerCase().includes(query) ||
                    search.dataSearch.make.toLowerCase().includes(query) ||
                    search.dataSearch.model.toLowerCase().includes(query)
                );
            });
        });

        const fetchSearchHistory = async () => {
            try {
                const currentUser = await Auth.currentAuthenticatedUser();
                const { data } = await API.graphql({
                    query: listSearchHistories,
                    authMode: 'AMAZON_COGNITO_USER_POOLS',
                });

                const items = data.listSearchHistories.items
                    .filter((item) => item.owner === currentUser.username)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                // Map over items, transforming each search and fetching signed URL
                searchHistory.value = await Promise.all(items.map(async (search) => {
                    const linkXlsx = search.s3Link ? search.s3Link.replace('.csv', '.xlsx') : null;
                    const signedURL = await Storage.get(linkXlsx, { level: "private" });
                    console.log()
                    return {
                        ...search,
                        dataSearch: JSON.parse(search.dataSearch),
                        downloadLink: signedURL,
                    };
                }));

                // Fetch S3 files
                fetchS3Files();
            } catch (error) {
                console.error('Error fetching search history:', error);
            }
        };

        const deleteSearchHistory = async (searchId) => {
            try {
                await API.graphql({
                    query: deleteSearchHistoryMutation,
                    variables: { input: { id: searchId } },
                    authMode: 'AMAZON_COGNITO_USER_POOLS',
                });
                fetchSearchHistory();
                alert('Suppression réussie!');
            } catch (error) {
                alert('Erreur lors de la suppression!');
            }
        };

        const fetchS3Files = async () => {
            try {
                const response = await Storage.list('');
                const files = response.results;
                const filesFiltered = files.filter((file) => file.key.includes('result.xlsx'))

                const filePromises = filesFiltered.map(async (file) => {
                    const datetimeParts = file.key.split('/')[0].split('-');
                    const year = datetimeParts[0];
                    const month = datetimeParts[1];
                    const day = datetimeParts[2];
                    const hour = datetimeParts[3];
                    const minute = datetimeParts[4];
                    const formattedDatetime = `${day}/${month}/${year} à ${hour}h${minute}`;

                    return {
                        datetime: formattedDatetime,
                        url: await getFileUrl(file.key),
                    };
                });

                s3Files.value = await Promise.all(filePromises);
            } catch (error) {
                console.error('Error fetching S3 files:', error);
            }
        };

        const getFileUrl = async (key) => {
            try {
                const url = await Storage.get(key);
                return url;
            } catch (error) {
                console.error(`Error getting file URL for key ${key}:`, error);
                return '';
            }
        };

        const downloadFile = (search) => {
            window.open(search.downloadLink, "_blank");
        };

        const filterResults = () => {
            // La recherche sera effectuée par la propriété calculée filteredSearchHistory.
        };

        fetchSearchHistory();

        return {
            formatDate,
            formatArray,
            formatPrice,
            searchHistory,
            searchQuery,
            filteredSearchHistory,
            deleteSearchHistory,
            filterResults,
            downloadLink,
            downloadFile,
            s3Files,
        };
    },
};
</script>

  