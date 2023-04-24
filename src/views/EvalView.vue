<template>
  <div class="bg-white">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-4">Résultat de l'estimation</h1>
      <div class="flex flex-wrap -mx-2">
        <div class="w-full lg:w-1/2 px-2">
          <div class="bg-white rounded-lg shadow-red-900 shadow-lg p-8 mb-4">
            <h2 class="text-xl font-bold mb-4">Informations sur la voiture</h2>
            <div class="flex flex-wrap -mx-2 mb-4">
              <div class="w-1/2 px-2">
                <p class="font-semibold">Marque :</p>
                <p class="text-gray-700">{{ make.toUpperCase() }}</p>
              </div>
              <div class="w-1/2 px-2">
                <p class="font-semibold">Modèle :</p>
                <p class="text-gray-700">{{ model.toUpperCase() }}</p>
              </div>
              <div class="w-1/2 px-2">
                <p class="font-semibold">Année :</p>
                <p class="text-gray-700">{{ year }}</p>
              </div>
              <div class="w-1/2 px-2">
                <p class="font-semibold">Kilométrage :</p>
                <p class="text-gray-700">{{ kms }}</p>
              </div>
              <div class="w-1/2 px-2">
                <p class="font-semibold">Transmission :</p>
                <p class="text-gray-700">{{ transmission.toUpperCase() }}</p>
              </div>
              <div class="w-1/2 px-2">
                <p class="font-semibold">Énergie :</p>
                <p class="text-gray-700">{{ energy.toUpperCase() }}</p>
              </div>
              <div class="w-1/2 px-2">
                <p class="font-semibold">Mot-clé :</p>
                <p class="text-gray-700">{{ keywords.toUpperCase() }}</p>
              </div>
              <div class="w-1/2 px-2">
                <p class="font-semibold">Prix :</p>
                <p class="text-gray-700">{{ price }} €</p>
              </div>
            </div>
          </div>
          <h1>r2 = {{ Math.round(r2 * 100) }} % fiable</h1>
          <h1>mae = {{ Math.round(mae) }}</h1>
          <h1>rmse = {{ Math.round(rmse) }}</h1>
        </div>
      </div>
    </div>
    <div id="chart" class="bg-black p-5" style="width: 1000px; height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      make: '',
      model: '',
      year: '',
      kms: '',
      transmission: '',
      energy: '',
      keywords: '',
      price: '', 
      r2: '',
      mae: '',
      rmse: '',
      chartData: [
        { model: 'Modèle A', sales: 450 },
        { model: 'Modèle B', sales: 340 },
        { model: 'Modèle C', sales: 280 },
        { model: 'Modèle D', sales: 200 },
        { model: 'Modèle E', sales: 180 },
      ],
    };
  },
  // The `created()` method is a lifecycle hook in Vue.js that is called when the component is created.
  // In this code, it calls the `updateData()` method to update the component's data properties with the
  // values from the current route's query parameters. This ensures that the component's data is
  // initialized with the correct values when the component is created.
  created() {
    this.updateData();
  }, 
  // The `mounted()` lifecycle hook is called after the Vue instance has been mounted to the DOM. In this
  // code, it initializes an ECharts chart by selecting the DOM element with the ID "chart" and passing
  // it to the `echarts.init()` method. It then calls the `renderChart()` method, passing in the
  // initialized chart instance as an argument. This renders the bar chart using the data in the
  // `chartData` property of the component.
  mounted() {
    const chart = echarts.init(document.getElementById('chart'));
    this.renderChart(chart);
  },
  // `watch: {()}` is a Vue.js watcher that listens for changes to the `` object, which
  // represents the current route of the application. Whenever the route changes, the `updateData()`
  // method is called to update the component's data properties with the new values from the route's
  // query parameters. Then, the `renderChart(chart)` method is called to re-render the bar chart using
  // the updated data. This ensures that the chart always reflects the current state of the
  // application.
  watch: {
    $route() {
      this.updateData();
      const chart = echarts.init(document.getElementById('chart'));
      this.renderChart(chart);
    }
  },
  methods: {
    // `updateData()` is a method that updates the component's data properties with the values from the
    // current route's query parameters. It sets the values of `make`, `model`, `year`, `kms`,
    // `transmission`, `energy`, `keywords`, and `price` to the corresponding values in the route's
    // query parameters. This method is called in the `created()` hook and in the `watch` object to
    // update the data whenever the route changes.
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

    // The `renderChart(chart)` method is responsible for rendering a bar chart using the ECharts
    // library. It takes in a `chart` parameter, which is the instance of the ECharts chart that is
    // being rendered.
    renderChart(chart) {
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: 'category',
          data: this.chartData.map((item) => item.model),
        },
        series: [
          {
            name: 'Ventes',
            type: 'bar',
            data: this.chartData.map((item) => item.sales),
          },
        ],
      };
      chart.setOption(option);
    }
  }
};
</script>