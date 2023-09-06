<template>
  <div id="Dashboard" class="text-black px-5 pb-5 grid grid-cols-12 gap-4">

    <div class="col-span-12 lg:col-span-12 flex justify-between items-center mb-6">
      <p class="text-2xl font-semibold mb-2 lg:mb-0">Bienvenue {{ firstName }} !</p>
    </div>

    <div class="col-span-12 lg:col-span-3 lg:pt-20">
      <!-- KPI Components -->
      <kpi-component title="Nombre de cotations" :value="totalQuotations.toString()" color="bg-blue-400"
        icon="fas fa-chart-line"></kpi-component>
      <kpi-component title="Prix moyen des cotations" :value="averageQuotationPrice.toString()" color="bg-blue-500"
        icon="fas fa-euro-sign"></kpi-component>
      <kpi-component title="Kilométrage moyen" :value="averageMileage.toString()" color="bg-blue-600"
        icon="fas fa-tachometer-alt"></kpi-component>
      <kpi-component title="Année moyenne d'immatriculation" :value="averageRegistrationYear.toString()"
        color="bg-blue-700" icon="fas fa-calendar-alt"></kpi-component>
    </div>

    <div class="col-span-12 lg:col-span-9 space-y-4 -top-10">
      <button v-if="!includedRafale" @click="toggleIncludedRafale" class="flex flex-right p-2 bg-gray-700 hover:bg-gray-900 text-white rounded-lg shadow-lg">Inclure les cotations rafales</button>
      <button v-if="includedRafale" @click="removeRafaleData" class="flex flex-right p-2 bg-gray-700 hover:bg-gray-900 text-white rounded-lg shadow-lg">Supprimer les cotations en rafales</button>
      <div class="grid grid-cols-2 gap-1">
        <div class="col-span-1 lg:col-span-1 p-5">
          <!-- Top 10 Marques -->
          <BarChart title="Top 10 des marques les plus côtées" :data="{
            labels: makeLabels,
            datasets: [
              {
                data: makeData,
              },
            ],
          }" class="lg:w-full bg-white" />
        </div>
        <div class="col-span-1 lg:col-span-1 p-5">
          <!-- Top 10 Modèles -->
          <BarChart title="Top 10 des modèles les plus côtées" :data="{
            labels: modelLabels,
            datasets: [
              {
                data: modelData,
              },
            ],
          }" class="lg:w-full bg-white" />
        </div>
      </div>

      <!-- Linear Price -->
      <LinearChart title="Prix de vente moyen (90 derniers jours)" :data="averageSellingPriceData"
        class="lg:w-full bg-white" />
      <!-- Add your graph or table components here -->

      <!-- <table-component class="lg:w-full"></table-component> -->
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../../stores/userStore";
import { useUserGraphStore } from "../../stores/userGraphStore";
import { ref, computed, watch } from 'vue';
import KpiComponent from '../../components/reuse/KpiComponent.vue';
import BarChart from '../../components/reuse/BarChart.vue';
import LinearChart from "../../components/reuse/LinearChart.vue";

export default {
  components: {
    KpiComponent,
    BarChart,
    LinearChart
  },
  setup() {
    const userStore = useUserStore();
    const firstName = ref(userStore.name);

    // const includedRafale = ref(false);

    const userGraphStore = useUserGraphStore();
    userGraphStore.fetchGraphData();
    const totalQuotations = computed(() => userGraphStore.totalQuotations);
    const averageQuotationPrice = computed(() => userGraphStore.averageQuotationPrice);
    const averageMileage = computed(() => userGraphStore.averageMileage);
    const averageRegistrationYear = computed(() => userGraphStore.averageRegistrationYear);
    const carData = computed(() => userGraphStore.combinedData);

    const rafaleData = computed(() => userGraphStore.getRafaleData);

    const includedRafale = computed(() => userGraphStore.includedRafale);
    const toggleIncludedRafale = () => {
      userGraphStore.toggleIncludedRafale();
    }
    const removeRafaleData = () => {
      window.location.reload();
    }

    // Top 10 des marques
    let makeCounts = ref({});
    let makeLabels = ref([]);
    let makeData = ref([]);

    watch(carData, (newCarData) => {
      let newMakeCounts = {};
      newCarData.forEach(car => {
        if (!newMakeCounts.hasOwnProperty(car.make)) {
          newMakeCounts[car.make] = 0;
        }
        newMakeCounts[car.make] += 1;
      });

      let sortedMakes = Object.entries(newMakeCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
      makeLabels.value = sortedMakes.map(item => item[0]);
      makeData.value = sortedMakes.map(item => item[1]);
    });

    // Top 10 des modèles
    let modelCounts = ref({});
    let modelLabels = ref([]);
    let modelData = ref([]);

    watch(carData, (newCarData) => {
      let newModelCounts = {};
      newCarData.forEach(car => {
        if (!newModelCounts.hasOwnProperty(car.model)) {
          newModelCounts[car.model] = 0;
        }
        newModelCounts[car.model] += 1;
      });

      let sortedModels = Object.entries(newModelCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
      modelLabels.value = sortedModels.map(item => item[0]);
      modelData.value = sortedModels.map(item => item[1]);
    });

    // Comptage des marques et des modèles
    let counts = ref({});

    watch(carData, (newCarData) => {
      let newCounts = {};

      newCarData.forEach(car => {
        if (!newCounts.hasOwnProperty(car.make)) {
          newCounts[car.make] = {};
        }

        if (!newCounts[car.make].hasOwnProperty(car.model)) {
          newCounts[car.make][car.model] = 0;
        }

        newCounts[car.make][car.model] += 1;
      });

      counts.value = newCounts;
    });

    // Préparation des données pour le graphique à barres empilées
    let labels = ref([]);
    let datasets = ref([]);

    watch(counts, (newCounts) => {
      // Trier les marques par nombre total de voitures
      let sortedMakes = Object.entries(newCounts)
        .map(([make, models]) => [make, Object.values(models).reduce((a, b) => a + b, 0)])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

      labels.value = sortedMakes.map(item => item[0]);

      // Préparation des données de modèle pour chaque marque
      let newDatasets = [];
      sortedMakes.forEach(([make, total]) => {
        Object.entries(newCounts[make]).forEach(([model, count]) => {
          let dataset = newDatasets.find(ds => ds.label === model);
          if (!dataset) {
            dataset = { label: model, data: [] };
            newDatasets.push(dataset);
          }

          while (dataset.data.length < labels.value.indexOf(make)) {
            // S'assurer que chaque série de données a une valeur pour chaque marque, même si ce n'est que 0
            dataset.data.push(0);
          }

          dataset.data.push(count);
        });
      });

      // S'assurer que chaque série de données a une valeur pour chaque marque
      newDatasets.forEach(dataset => {
        while (dataset.data.length < labels.value.length) {
          dataset.data.push(0);
        }
      });

      datasets.value = newDatasets;
    });

    // Créer des données factices pour les prix de vente moyens
    const averageSellingPriceData = ref({
      labels: Array.from({ length: 90 }, (_, i) => new Date(Date.now() - i * 24 * 60 * 60 * 1000)),
      datasets: [
        {
          data: Array.from({ length: 90 }, () => Math.floor(Math.random() * 10000) + 10000),
        },
      ],
    });


    return {
      firstName,
      averageSellingPriceData,
      totalQuotations,
      averageQuotationPrice,
      averageMileage,
      averageRegistrationYear,
      carData,
      makeLabels,
      makeData,
      modelLabels,
      modelData,
      labels,
      datasets,
      rafaleData,
      includedRafale,
      toggleIncludedRafale,
      removeRafaleData
    };
  },
};
</script>

<style scoped></style>