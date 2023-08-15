// Importation de la fonction shallowMount depuis le module @vue/test-utils
import { shallowMount } from "@vue/test-utils";
// Importation de la fonction createPinia depuis le module pinia
import { createPinia } from "pinia";
// Mock de la bibliothèque aws-amplify pour les tests
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
// Importation du composant EvalPage depuis le fichier EvalView.vue
import EvalPage from "../../src/views/user/EvalView.vue";
// Importation des fonctions createMemoryHistory et createRouter depuis le module vue-router
import { createMemoryHistory, createRouter } from "vue-router";

// Création d'une instance de routeur pour les tests
const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: "/user/eval", component: EvalPage }],
});

// Création d'une instance de Pinia
const pinia = createPinia();

// Définition des tests pour le composant EvalPage
describe("EvalPage", () => {
  // Test pour vérifier que les informations sont affichées correctement
  it("affiche les informations correctes", async () => {
    // Utilisation de `router.push` pour définir les paramètres de requête
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
    // Montage du composant EvalPage
    const wrapper = shallowMount(EvalPage, {
      global: {
        plugins: [router, pinia],
        stubs: {
          ReliabilityIndicator: true,
        },
      },
    });
    // Vérification que les informations sont affichées correctement
    expect(wrapper.text()).toContain("BMW");
    expect(wrapper.text()).toContain("SERIE 1");
    expect(wrapper.text()).toContain("2016");
    expect(wrapper.text()).toContain("8300");
    expect(wrapper.text()).toContain("MANUELLE");
    expect(wrapper.text()).toContain("DIESEL");
    expect(wrapper.text()).toContain("116D LOUNGE");
    expect(wrapper.text()).toContain("16050");
  });
  // Test pour vérifier que la marge, les frais fixes et FreVO sont calculés correctement
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

  // Test pour vérifier que le prix de reprise est calculé correctement
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

  // Test pour vérifier que les valeurs calculées sont affichées correctement
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
