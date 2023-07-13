<template>
  <div id="Dashboard" class="text-black px-5 pb-5">

    <div class="lg:flex justify-between items-center mb-6">
      <p class="text-2xl font-semibold mb-2 lg:mb-0">Bienvenue {{ firstName }} !</p>
    </div>

    <div class="mx-3">
      <div class="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
        <Indicator title="Nombre de demandes" :value="totalRequests" />
        <Indicator title="Indicateur 2" :value="indicatorValue2" />
        <Indicator title="Indicateur 3" :value="indicatorValue3" />
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../../stores/userStore";
import { ref } from 'vue';
import Indicator from '../../components/reuse/Indicators.vue';

export default {
  components: {
    Indicator
  },
  setup() {
    const userStore = useUserStore();
    const firstName = ref(userStore.name);

    const totalRequests = ref(1200);
    const indicatorValue2 = ref(300);
    const indicatorValue3 = ref(500);

    return {
      firstName,
      totalRequests,
      indicatorValue2,
      indicatorValue3
    };
  },
};
</script>

<style scoped></style>


