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
      chartData: [
        { model: 'Modèle A', sales: 450 },
        { model: 'Modèle B', sales: 340 },
        { model: 'Modèle C', sales: 280 },
        { model: 'Modèle D', sales: 200 },
        { model: 'Modèle E', sales: 180 },
      ],
    };
  },
  created() {
    this.make = this.$route.query.make;
    this.model = this.$route.query.model;
    this.year = this.$route.query.year;
    this.kms = this.$route.query.kms;
    this.transmission = this.$route.query.transmission;
    this.energy = this.$route.query.energy;
    this.keywords = this.$route.query.keywords;
    this.price = this.$route.query.price;
  }, 
  mounted() {
    const chart = echarts.init(document.getElementById('chart'));

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
  },
};
</script>