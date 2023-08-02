import { shallowMount } from "@vue/test-utils";
import EvalPage from "../../src/views/user/EvalView.vue";
import {
  createMemoryHistory,
  createRouter,
  useRoute,
} from "vue-router";

// Créez une instance de routeur pour le test
const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: "/user/eval", component: EvalPage }], // ajoutez les routes que vous testez
});

describe("EvalPage", () => {
  it("affiche les informations correctes", async () => {
    // Utilisez `router.push` pour définir les paramètres de requête
    await router.push({
      path: "/user/eval",
    });

    // Créez un objet de données factice à utiliser dans le test
    // const setupData = {
    //   make: "bmw",
    //   model: "serie 1",
    //   year: 2016,
    //   kms: 8300,
    //   transmission: "manuelle",
    //   energy: "diesel",
    //   keywords: "116d lounge",
    //   price: 16050,
    //   r2: 0.9178295925195186,
    //   mae: 1492.2803299249388,
    //   rmse: 2592.197562752398,
    //   marginValue: 1200,
    //   fixedFeesValue: 400,
    //   frevoValue: 2,
    //   totalPrice: 13358,
    // };
    // Remplacez la méthode `setup` du composant par une version factice
    const setupResult = EvalPage.setup();
    setupResult.make = "bmw";
    setupResult.model = "serie 1";
    setupResult.year = 2016;
    setupResult.kms = 8300;
    setupResult.transmission = "manuelle";
    setupResult.energy = "diesel";
    setupResult.keywords = "116d lounge";
    setupResult.price = 16050;
    setupResult.r2 = 0.9178295925195186;
    setupResult.mae = 1492.2803299249388;
    setupResult.rmse = 2592.197562752398;
    setupResult.marginValue = 1200;
    setupResult.fixedFeesValue = 400;
    setupResult.frevoValue = 2;
    setupResult.totalPrice = 13358;

    setupResult.route = useRoute();

    // Montez le composant
    const wrapper = shallowMount(EvalPage, {
      global: {
        plugins: [router],
        stubs: {
          ReliabilityIndicator: true,
        },
      },
    });
    // Vérifiez que les informations sont affichées correctement
    expect(wrapper.text()).toContain("BMW");
    expect(wrapper.text()).toContain("SERIE 1");
    expect(wrapper.text()).toContain("2016");
    expect(wrapper.text()).toContain("8300");
    expect(wrapper.text()).toContain("MANUELLE");
    expect(wrapper.text()).toContain("DIESEL");
    expect(wrapper.text()).toContain("116D LOUNGE");
    expect(wrapper.text()).toContain("16050");
    // // On push de nouvelle données dans l'url pour simuler une nouvelle recherche
    // await router.push({
    //   path: "/user/eval",
    //   query: {
    //     make: "nissan",
    //     model: "qashqai",
    //     year: "2017",
    //     kms: "8350",
    //     transmission: "manuelle",
    //     energy: "diesel",
    //     keywords: "116d lounge",
    //     price: "16050",
    //     r2: "0.9178295925195186",
    //     mae: "1492.2803299249388",
    //     rmse: "2592.197562752398",
    //   },
    // });
    // // On await le changement de route
    // await wrapper.vm.$nextTick();
    // // On vérifie que les données ont bien changées
    // expect(wrapper.vm.make).toBe("NISSAN");
    // expect(wrapper.vm.model).toBe("QASHQAI");
    // expect(wrapper.vm.year).toBe("2017");
    // expect(wrapper.vm.kms).toBe("8350");
    // expect(wrapper.vm.transmission).toBe("MANUELLE");
    // expect(wrapper.vm.energy).toBe("DIESEL");
    // expect(wrapper.vm.keywords).toBe("116D LOUNGE");
    // expect(wrapper.vm.price).toBe("16050");

  });
});