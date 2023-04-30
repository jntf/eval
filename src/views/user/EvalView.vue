<template>
  <div class="bg-white">
    <div class="container mx-auto px-4 py-8">
      <div class="w-full flex flex-wrap items-stretch">
        <div class="w-full lg:w-1/2 px-2 mb-4">
          <div class="bg-white rounded-lg shadow-red-900 shadow-lg p-8 h-full border-2 border-gray-100">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div class="font-semibold text-blue-800 col-span-1">Marque :</div>
              <div class="text-gray-700 border-b border-gray-300 col-span-2 text-right">{{ make.toUpperCase() }}</div>
              <div class="font-semibold text-blue-800 col-span-1">Modèle :</div>
              <div class="text-gray-700 border-b border-gray-300 col-span-2 text-right">{{ model.toUpperCase() }}</div>
              <div class="font-semibold text-blue-800 col-span-1">Année :</div>
              <div class="text-gray-700 border-b border-gray-300 col-span-2 text-right">{{ year }}</div>
              <div class="font-semibold text-blue-800 col-span-1">Kilométrage :</div>
              <div class="text-gray-700 border-b border-gray-300 col-span-2 text-right">{{ kms }}</div>
              <div class="font-semibold text-blue-800 col-span-1">Transmission :</div>
              <div class="text-gray-700 border-b border-gray-300 col-span-2 text-right">{{ transmission.toUpperCase() }}
              </div>
              <div class="font-semibold text-blue-800 col-span-1">Énergie :</div>
              <div class="text-gray-700 border-b border-gray-300 col-span-2 text-right">{{ energy.toUpperCase() }}</div>
              <div class="font-semibold text-blue-800 col-span-1">Mot-clé :</div>
              <div class="text-gray-700 border-b border-gray-300 col-span-2 text-right">{{ keywords.toUpperCase() }}</div>
              <div class="font-semibold text-red-600 col-span-1">Prix :</div>
              <div class="text-red-600 font-bold text-lg border-b border-gray-300 col-span-2 text-right">{{ price }} €
              </div>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/2 px-2 mb-4">
          <div class="bg-white rounded-lg shadow-red-900 shadow-lg p-8 h-full border-2 border-gray-100">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div class="font-semibold text-blue-800 col-span-1">Fiabilité de l'IA :</div>
              <div class="col-span-2">
                <ReliabilityIndicator :r2="parseFloat(r2)" />
              </div>
              <div class="font-semibold text-blue-800 col-span-1">Fourchette :</div>
              <div class="text-gray-700 col-span-2">
                <h1 class="text-blue-600 text-right">{{ price - Math.round(mae) }} € - {{ Math.round(price) +
                  Math.round(mae) }} €</h1>
              </div>
              <div class="font-semibold text-blue-800 col-span-1">Marge :</div>
              <div class="text-gray-700 border-b border-gray-300 col-span-2 text-right">1200 €.HT</div>
              <div class="font-semibold text-blue-800 col-span-1">FreVO :</div>
              <div class="text-gray-700 border-b border-gray-300 col-span-2 text-right">{{ Math.round(price) * 2 / 100 }}
                €
              </div>
              <div class="font-semibold text-blue-800 col-span-1">Frais fixe :</div>
              <div class="text-gray-700 border-b border-gray-300 col-span-2 text-right">400 €</div>
              <div class="font-semibold text-blue-800 col-span-1">Prix de reprise :</div>
              <div class="text-gray-700 border-b border-gray-300 col-span-2 text-right">{{ Math.round(Math.round(price) -
                1200 * 1.2 - Math.round(price) * 2 / 100 - 400) }} €</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a :href="laCentraleUrl" target="_blank" rel="noopener noreferrer">Voir les annonces sur La Centrale</a>
    <div id="chart" class="bg-red-800 p-5" style="width: 1000px; height: 400px;"></div>
  </div>
</template>

<script>
import ReliabilityIndicator from '../../components/eval/ReliabilityIndicator.vue';
import * as echarts from 'echarts';

export default {
  data() {
    return {
      make: "",
      model: "",
      year: "",
      kms: "",
      transmission: "",
      energy: "",
      keywords: "",
      price: "",
      r2: "",
      mae: "",
      rmse: "",
      chartData: [
        { model: "Modèle A", sales: 450 },
        { model: "Modèle B", sales: 340 },
        { model: "Modèle C", sales: 280 },
        { model: "Modèle D", sales: 200 },
        { model: "Modèle E", sales: 180 },
      ],
    };
  },
  created() {
    this.updateData();
  },
  mounted() {
    const chart = echarts.init(document.getElementById("chart"));
    this.renderChart(chart);
  },
  watch: {
    $route() {
      this.updateData();
      const chart = echarts.init(document.getElementById("chart"));
      this.renderChart(chart);
      const laCentraleUrl = this.buildLaCentraleUrl(
        this.$route.query.make,
        this.$route.query.model,
        this.$route.query.year,
        this.$route.query.kms,
        this.$route.query.transmission,
        this.$route.query.energy,
        this.$route.query.keywords
      );
    }
  },
  methods: {
    parseFloat(value) {
      return parseFloat(value);
    },
    openCarSearchModal() {
      const searchUrl = this.buildSearchUrl();
      window.open(searchUrl, 'CarSearchModal', 'width=800, height=600, menubar=no, toolbar=no, location=no, status=no, resizable=yes, scrollbars=yes');
    },
    updateData() {
      this.make = this.$route.query.make;
      this.model = this.$route.query.model;
      this.year = this.$route.query.year;
      this.kms = this.$route.query.kms;
      this.transmission = this.$route.query.transmission;
      this.energy = this.$route.query.energy;
      this.keywords = this.$route.query.keywords;
      this.price = this.$route.query.price;
      this.r2 = this.$route.query.r2;
      this.mae = this.$route.query.mae;
      this.rmse = this.$route.query.rmse;
    },
    buildLaCentraleUrl(make, model, year, kms, keywords) {
      const baseUrl = "https://www.lacentrale.fr/listing";
      const makesModelsCommercialNames = `${make.toUpperCase()}%3A${model.toUpperCase().replace(" ", "%20")}`;
      const mileageMin = Math.max(0, kms - 10000);
      const mileageMax = Math.max(0, kms + 10000);
      const yearMin = year;
      const yearMax = year;
      const versions = keywords.replace(" ", "%2C");

      const queryParams = [
        `makesModelsCommercialNames=${makesModelsCommercialNames}`,
        `mileageMax=${mileageMax}`,
        `mileageMin=${mileageMin}`,
        `sortBy=priceAsc`,
        `versions=${versions}`,
        `yearMax=${yearMax}`,
        `yearMin=${yearMin}`,
      ];

      return `${baseUrl}?${queryParams.join("&")}`;
    },
    renderChart(chart) {
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: "category",
          data: this.chartData.map((item) => item.model),
        },
        series: [
          {
            name: "Ventes",
            type: "bar",
            data: this.chartData.map((item) => item.sales),
          },
        ],
      };
      chart.setOption(option);
    }
  },
  computed: {
    laCentraleUrl() {
      return this.buildLaCentraleUrl(
        this.$route.query.make,
        this.$route.query.model,
        this.$route.query.year,
        this.$route.query.kms,
        this.$route.query.transmission,
        this.$route.query.energy,
        this.$route.query.keywords
      );
    },
  },
  components: { ReliabilityIndicator }
};
</script>