<template>
  <div class="bg-white">
    <div class="container mx-auto px-4 py-8">
      <div class="w-full flex flex-wrap items-stretch">
        <div class="w-full lg:w-1/2 px-2 mb-1">
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
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/2 px-2 mb-1">
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
              <div class="text-gray-700 border-b border-gray-300 col-span-2 text-right">
                {{ marginValue }} €.HT
              </div>
              <div class="font-semibold text-blue-800 col-span-1">FreVO :</div>
              <div class="text-gray-700 border-b border-gray-300 col-span-2 text-right">
                {{ frevoValue }} €
              </div>
              <div class="font-semibold text-blue-800 col-span-1">Frais fixe :</div>
              <div class="text-gray-700 border-b border-gray-300 col-span-2 text-right">
                {{ fixedFeesValue }} €
              </div>
              <div class="font-semibold text-blue-800 col-span-1">Prix de reprise :</div>
              <div class="text-gray-700 border-b border-gray-300 col-span-2 text-right">
                {{ totalPrice }} €
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-wrap items-stretch">
        <div class="w-full lg:w-1/2 px-2 mb-4">
          <div class="bg-white rounded-lg shadow-red-900 shadow-lg p-8 h-full border-2 border-gray-100">
            <div class="text-center">
              <div class="text-xl font-semibold text-gray-800 ">Valeur Marché</div>
              <div class="font-bold text-red-800 ">{{ price - Math.round(mae) }} € - <span class="text-3xl">{{ price }}
                  €</span> - {{ Math.round(price) +
                    Math.round(mae) }} € </div>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/2 px-2 mb-4">
          <div class="bg-white rounded-lg shadow-red-900 shadow-lg p-8 h-full border-2 border-gray-100">
            <div class="text-center">
              <div class="text-xl font-semibold text-gray-800 ">Valeur Reprise</div>
              <div class="text-3xl font-bold text-red-800 ">{{ totalPrice }} €</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { Auth } from "aws-amplify";
import ReliabilityIndicator from '../../components/reuse/ReliabilityIndicator.vue';
import { useUserStore } from "../../stores/userStore";

export default {
  components: { ReliabilityIndicator },
  setup() {
    const route = useRoute();
    const userStore = useUserStore();
    const make = ref(route.query.make || "");
    const model = ref(route.query.model || "");
    const year = ref(route.query.year || "");
    const kms = ref(route.query.kms || "");
    const transmission = ref(route.query.transmission || "");
    const energy = ref(route.query.energy || "");
    const keywords = ref(route.query.keywords || "");
    const price = ref(route.query.price || 0);
    const r2 = ref(route.query.r2 || 0);
    const mae = ref(route.query.mae || 0);
    const rmse = ref(route.query.rmse || 0);

    const userAttributes = ref({
      margin: 1200,
      marginType: "euro",
      frevo: 2,
      fixedFees: 400,
    });

    onMounted(async () => {
      await loadCompanySettings();
      updateData();
    });

    const marginValue = computed(() => {
      if (userAttributes.value.marginType === "euro") {
        return userAttributes.value.margin;
      } else {
        return (price.value * userAttributes.value.margin) / 100;
      }
    });

    const frevoValue = computed(() => userAttributes.value.frevo);
    const fixedFeesValue = computed(() => userAttributes.value.fixedFees);

    const totalPrice = computed(() =>
      Math.round(price.value - marginValue.value - frevoValue.value - fixedFeesValue.value)
    );

    watchEffect(() => {
      updateData();
    });

    watchEffect(
      price,
    );

    async function loadCompanySettings() {
      try {
        const userStore = useUserStore();

        if (userStore.companyId) {
          userAttributes.value.margin = parseFloat(userStore.margin);
          userAttributes.value.marginType = userStore.marginType;
          userAttributes.value.frevo = parseFloat(userStore.frevo);
          userAttributes.value.fixedFees = parseFloat(userStore.fixedFees);
        } else {
          const user = await Auth.currentAuthenticatedUser();
          const attributes = user.attributes;
          userAttributes.value.margin = parseFloat(attributes["custom:margin"]) || 1200;
          userAttributes.value.marginType = attributes["custom:marginType"] || "euro";
          userAttributes.value.frevo = parseFloat(attributes["custom:frevo"]) || 2;
          userAttributes.value.fixedFees = parseFloat(attributes["custom:fixedFees"]) || 400;
        }
      } catch (error) {
        console.error("Erreur lors du chargement des paramètres", error);
      }
    }

    // Fonction qui permet de réactualiser les données de la page sans reload de l'url. 
    function updateData() {
      make.value = route.query.make;
      model.value = route.query.model;
      year.value = route.query.year;
      kms.value = route.query.kms;
      transmission.value = route.query.transmission;
      energy.value = route.query.energy;
      keywords.value = route.query.keywords;
      price.value = route.query.price;
      r2.value = route.query.r2;
      mae.value = route.query.mae;
      rmse.value = route.query.rmse;
    }

    return {
      make,
      model,
      year,
      kms,
      transmission,
      energy,
      keywords,
      price,
      r2,
      mae,
      rmse,
      marginValue,
      frevoValue,
      fixedFeesValue,
      totalPrice,
    };
  },
};
</script>
