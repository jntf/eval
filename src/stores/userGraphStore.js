import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import { API, Auth, Storage } from "aws-amplify";
import { listSearchHistories } from "../graphql/queries";

export const useUserGraphStore = defineStore({
  id: "userGraph",

  state: () => ({
    graphData: [],
  }),

  getters: {
    totalQuotations: (state) => {
      // compte le nombre total de cotations
      return state.graphData.length;
    },
    averageQuotationPrice: (state) => {
      // calcule le prix moyen des cotations
      if (state.graphData.length > 0) {
        const total = state.graphData.reduce(
          (sum, item) =>
            sum + parseInt(JSON.parse(item.dataSearch)[0].price, 10),
          0
        );
        const res = total / state.graphData.length;
        return res.toFixed(0);
      } else {
        return 0;
      }
    },
    averageMileage: (state) => {
      // calcule le kilométrage moyen
      if (state.graphData.length > 0) {
        const total = state.graphData.reduce(
          (sum, item) =>
            sum + parseInt(JSON.parse(item.dataSearch)[0].mileage, 10),
          0
        );
        const res = total / state.graphData.length;
        return res.toFixed(0);
      } else {
        return 0;
      }
    },
    averageRegistrationYear: (state) => {
      // calcule l'année d'immatriculation moyenne
      if (state.graphData.length > 0) {
        const total = state.graphData.reduce(
          (sum, item) =>
            sum + parseInt(JSON.parse(item.dataSearch)[0].year, 10),
          0
        );
        const res = total / state.graphData.length;
        return res.toFixed(0);
      } else {
        return 0;
      }
    },
    getCarData: (state) => {
      return state.graphData.map((item) => JSON.parse(item.dataSearch)[0]);
    },
  },

  actions: {
    async fetchGraphData() {
      const userStore = useUserStore();

      if (userStore.isLoggedIn) {
        try {
          const currentUser = userStore.username;
          const { data } = await API.graphql({
            query: listSearchHistories,
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });

          this.graphData = data.listSearchHistories.items.filter(
            (item) => item.isMultipleImport == false
          );
        } catch (error) {
          console.error("Error fetching graph data:", error);
        }
      }
    },

    clearGraphData() {
      this.graphData = [];
    },
  },
});
