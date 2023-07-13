<template>
  <div id="Dashboard" class="text-black px-5 pb-5 grid grid-cols-12 gap-4">

    <div class="col-span-12 lg:col-span-12 flex justify-between items-center mb-6">
      <p class="text-2xl font-semibold mb-2 lg:mb-0">Bienvenue {{ firstName }} !</p>
    </div>

    <div class="col-span-12 lg:col-span-3 lg:pt-20">
      <!-- KPI Components -->
      <kpi-component title="Nombre de cotations" value="28" color="bg-blue-400" icon="fas fa-chart-line"></kpi-component>
      <kpi-component title="Prix moyen des cotations" value="19040" color="bg-blue-500"
        icon="fas fa-euro-sign"></kpi-component>
      <kpi-component title="Kilométrage moyen" value="52450" color="bg-blue-600"
        icon="fas fa-tachometer-alt"></kpi-component>
      <kpi-component title="Année moyenne d'immatriculation" value="2017" color="bg-blue-700"
        icon="fas fa-calendar-alt"></kpi-component>
    </div>

    <div class="col-span-12 lg:col-span-9 space-y-4 -top-10">
      <div class="grid grid-cols-2 gap-1">
        <div class="col-span-1 lg:col-span-1 p-5">
          <!-- Top 10 Marques -->
          <BarChart title="Top 10 des marques les plus côtées" :data="{
            labels: ['Peugeot', 'Renault', 'Citroën', 'Volkswagen', 'Ford', 'Toyota', 'Audi', 'BMW', 'Mercedes', 'Opel'],
            datasets: [
              {
                data: [30, 25, 20, 15, 10, 5, 4, 3, 2, 1],
              },
            ],
          }" class="lg:w-full bg-white" />
        </div>
        <div class="col-span-1 lg:col-span-1 p-5">
          <!-- Top 10 Modèles -->
          <BarChart title="Top 10 des modèles les plus côtées" :data="{
            labels: ['208', 'Clio', '308', 'Golf', 'C3', 'C4', 'Megane', 'Polo', 'Corsa', 'A3'],
            datasets: [
              {
                data: [24, 20, 18, 15, 12, 10, 8, 6, 4, 2],
              },
            ],
          }" class="lg:w-full bg-white" />
        </div>
        <div class="col-span-1 lg:col-span-1 p-5">
          <BarChart title="Top 10 des marques les plus côtées" :data="{
            labels: ['Toyota', 'Volkswagen', 'Ford', 'Hyundai', 'Chevrolet'],
            datasets: [
              {
                data: [50, 35, 45, 30, 55],
                backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
              },
            ],
          }" class="lg:w-full bg-white" />
        </div>
        <div class="col-span-1 lg:col-span-1 p-5">
          <BarChart title="Top 10 des marques les plus côtées" :data="{
            // 
            labels: ['Toyota', 'Volkswagen', 'Ford', 'Hyundai', 'Chevrolet'],
            datasets: [
              {
                data: [50, 35, 45, 30, 55],
                backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
              },
            ],
          }" class="lg:w-full bg-white" />
        </div>
      </div>

      <!-- Linear Price -->
      <LinearChart
        title="Prix de vente moyen (90 derniers jours)"
        :data="averageSellingPriceData"
        class="lg:w-full bg-white"
      />
      <!-- Add your graph or table components here -->

      <!-- <table-component class="lg:w-full"></table-component> -->
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../../stores/userStore";
import { ref } from 'vue';
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

    // Créer des données factices pour les prix de vente moyens
    const averageSellingPriceData = ref({
      labels: Array.from({length: 90}, (_, i) => new Date(Date.now() - i * 24 * 60 * 60 * 1000)),
      datasets: [
        {
          data: Array.from({length: 90}, () => Math.floor(Math.random() * 10000) + 10000),
        },
      ],
    });

    return {
      firstName,
      averageSellingPriceData
    };
  },
};
</script>

<style scoped></style>