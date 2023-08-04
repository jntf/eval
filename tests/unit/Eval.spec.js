import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";
jest.mock("aws-amplify", () => ({
  Auth: {
    currentAuthenticatedUser: jest.fn().mockResolvedValue({
      attributes: {
        "custom:margin": 1200,
        "custom:marginType": "euro",
        "custom:frevo": 2,
        "custom:fixedFees": 400,
      },
    }),
  },
}));
import EvalPage from "../../src/views/user/EvalView.vue";
import { createMemoryHistory, createRouter } from "vue-router";

// Créez une instance de routeur pour le test
const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: "/user/eval", component: EvalPage }],
});
// Créez une instance de Pinia
const pinia = createPinia();

describe("EvalPage", () => {
  it("affiche les informations correctes", async () => {
    // Utilisez `router.push` pour définir les paramètres de requête
    await router.push({
      path: "/user/eval",
      query: {
        make: "bmw",
        model: "serie 1",
        year: 2016,
        kms: 8300,
        transmission: "manuelle",
        energy: "diesel",
        keywords: "116d lounge",
        price: 16050,
        r2: 0.9178295925195186,
        mae: 1492.2803299249388,
        rmse: 2592.197562752398,
        marginValue: 1200,
        fixedFeesValue: 400,
        frevoValue: 2,
        totalPrice: 13358,
      },
    });

    // Montez le composant
    const wrapper = shallowMount(EvalPage, {
      global: {
        plugins: [router, pinia],
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
  });
  it("calcule correctement la marge, les frais fixes et FreVO", async () => {
    const wrapper = shallowMount(EvalPage, {
      global: {
        plugins: [router, pinia],
        stubs: {
          ReliabilityIndicator: true,
        },
      },
    });

    expect(wrapper.text()).toContain("Marge :1200 €.HT");
    expect(wrapper.text()).toContain("FreVO :2 €");
    expect(wrapper.text()).toContain("Frais fixe :400 €");
  });

  it("calcule correctement le prix de reprise", async () => {
    const wrapper = shallowMount(EvalPage, {
      global: {
        plugins: [router, pinia],
        stubs: {
          ReliabilityIndicator: true,
        },
      },
    });

    expect(wrapper.text()).toContain("14448");
  });

  it("affiche correctement les valeurs calculées", async () => {
    const wrapper = shallowMount(EvalPage, {
      global: {
        plugins: [router, pinia],
        stubs: {
          ReliabilityIndicator: true,
        },
      },
    });
    expect(wrapper.text()).toContain("Valeur Marché14558 € - 16050 € - 17542 € Valeur Reprise14448 €");
  });
});
