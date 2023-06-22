<template>
  <div id="Dashboard" class="text-black px-5 pb-5">

    <div class="lg:flex justify-between items-center mb-6">
      <p class="text-2xl font-semibold mb-2 lg:mb-0">Bienvenue {{ firstName }} !</p>
    </div>

    <div class="mx-3">
      <div>
        <v-select v-model="selectedBrands" :items="brandList" label="Select Brands" multiple chips></v-select>
        <v-select v-model="selectedModels" :items="modelList" label="Select Models" multiple chips></v-select>
        <div ref="chartContainer" style="width: 100%; height: 400px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../../stores/userStore";
import { ref, computed, watch, reactive, onMounted } from 'vue';
import * as echarts from 'echarts';

export default {
  setup() {
    const userStore = useUserStore();
    const firstName = ref(userStore.name);

    // Création de données factices
    const dataJson = ref({
      '2023-06-01': {
        "audi": { "a1": 12, "a3": 34, "a4": 15, "a6": 25 },
        "bmw": { "serie 1": 4, "serie 3": 23, "serie 5": 14, "serie 7": 13 },
        "citroen": { "c3": 56, "c4": 42, "c5": 33, "c6": 22 },
        "peugeot": { "206": 17, "207": 38, "306": 25, "307": 28 },
        "renault": { "clio": 20, "megane": 30, "scenic": 15, "captur": 18 }
      },
      '2023-06-02': {
        "audi": { "a1": 15, "a3": 30, "a4": 20, "a6": 28 },
        "bmw": { "serie 1": 5, "serie 3": 25, "serie 5": 16, "serie 7": 15 },
        "citroen": { "c3": 52, "c4": 40, "c5": 35, "c6": 24 },
        "peugeot": { "206": 20, "207": 35, "306": 30, "307": 28 },
        "renault": { "clio": 22, "megane": 33, "scenic": 18, "captur": 20 }
      },
      '2023-06-03': {
        "audi": { "a1": 20, "a3": 32, "a4": 25, "a6": 30 },
        "bmw": { "serie 1": 7, "serie 3": 27, "serie 5": 18, "serie 7": 20 },
        "citroen": { "c3": 55, "c4": 42, "c5": 38, "c6": 26 },
        "peugeot": { "206": 22, "207": 38, "306": 32, "307": 30 },
        "renault": { "clio": 25, "megane": 35, "scenic": 20, "captur": 22 }
      },
      // plus de données...
    });

    const selectedBrands = ref([]);
    const selectedModels = ref([]);
    const chartContainer = ref(null);
    let chartInstance = null;

    const brandList = computed(() => {
      // création de la liste des marques
      const brands = new Set();
      for (let date in dataJson.value) {
        for (let brand in dataJson.value[date]) {
          brands.add(brand);
        }
      }
      return Array.from(brands);
    });

    const modelList = computed(() => {
      // création de la liste des modèles
      const models = new Set();
      for (let date in dataJson.value) {
        for (let brand in dataJson.value[date]) {
          for (let model in dataJson.value[date][brand]) {
            models.add(model);
          }
        }
      }
      return Array.from(models);
    });

    const filteredData = computed(() => {
      // Filtrez les données en fonction des marques et des modèles sélectionnés
      let result = { ...dataJson.value }; // crée une copie des données
      for (let date in result) {
        for (let brand in result[date]) {
          if (!selectedBrands.value.includes(brand)) {
            delete result[date][brand];
          } else {
            for (let model in result[date][brand]) {
              if (!selectedModels.value.includes(model)) {
                delete result[date][brand][model];
              }
            }
          }
        }
      }
      return result;
    });

    const percentages = computed(() => {
      // Calculez les pourcentages en fonction des données filtrées
      let result = {};
      for (let date in filteredData.value) {
        let dayTotal = 0;
        for (let brand in filteredData.value[date]) {
          for (let model in filteredData.value[date][brand]) {
            dayTotal += filteredData.value[date][brand][model];
          }
        }
        for (let brand in filteredData.value[date]) {
          for (let model in filteredData.value[date][brand]) {
            if (!result[date]) result[date] = {};
            result[date][brand] = (filteredData.value[date][brand][model] / dayTotal) * 100;
          }
        }
      }
      return result;
    });

    const options = computed(() => {
      // Prepare data for ECharts
      let legendData = [...selectedBrands.value];
      let xAxisData = Object.keys(filteredData.value);
      let seriesData = legendData.map(brand => {
        return {
          name: brand,
          type: 'bar',
          stack: 'total',
          data: xAxisData.map(date => percentages.value[date][brand] || 0)
        };
      });

      return {
        title: { text: 'Répartition des marques/modèles' },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: { data: legendData },
        xAxis: { type: 'category', data: xAxisData },
        yAxis: { type: 'value' },
        series: seriesData
      }
    });

    onMounted(() => {
      chartInstance = echarts.init(chartContainer.value);
      chartInstance.setOption(options.value);
    });

    watch(options, () => {
      if (chartInstance) {
        chartInstance.setOption(options.value);
      }
    });

    return {
      firstName,
      selectedBrands,
      selectedModels,
      brandList,
      modelList,
      chartContainer,
    };
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}
</style>


