import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import { API, Auth, Storage } from "aws-amplify";
import { listSearchHistories } from "../graphql/queries";
import Papa from "papaparse";

export const useUserGraphStore = defineStore({
  id: "userGraph",

  state: () => ({
    graphData: [],
    rafaleData: [],
    includedRafale: false,
  }),

  getters: {
    totalQuotations: (state) => {
      return state.graphData.length + state.rafaleData.length;
    },
    combinedData: (state) => {
      return [
          ...state.graphData.map(item => {
              const carData = JSON.parse(item.dataSearch)[0];
              // Ajouter le champ createdAt aux données de la voiture
              carData.createdAt = item.createdAt;
              return carData;
          }),
          ...state.rafaleData,
      ];
    },
    averageQuotationPrice: (state) => {
      const graphDataTotal = state.graphData.reduce(
        (sum, item) => sum + parseInt(JSON.parse(item.dataSearch)[0].price, 10),
        0
      );
      const rafaleDataTotal = state.rafaleData.reduce(
        (sum, item) => sum + (item.price ? parseInt(item.price, 10) : 0),
        0
      );
      const total = graphDataTotal + rafaleDataTotal;

      if (state.graphData.length + state.rafaleData.length > 0) {
        return (
          total /
          (state.graphData.length + state.rafaleData.length)
        ).toFixed(0);
      } else {
        return 0;
      }
    },
    averageMileage: (state) => {
      const graphDataTotal = state.graphData.reduce(
        (sum, item) =>
          sum + parseInt(JSON.parse(item.dataSearch)[0].mileage, 10),
        0
      );
      const rafaleDataTotal = state.rafaleData.reduce(
        (sum, item) => sum + (item.kms ? parseInt(item.kms, 10) : 0),
        0
      );
      const total = graphDataTotal + rafaleDataTotal;

      if (state.graphData.length + state.rafaleData.length > 0) {
        return (
          total /
          (state.graphData.length + state.rafaleData.length)
        ).toFixed(0);
      } else {
        return 0;
      }
    },
    averageRegistrationYear: (state) => {
      const graphDataTotal = state.graphData.reduce(
        (sum, item) => sum + parseInt(JSON.parse(item.dataSearch)[0].year, 10),
        0
      );
      const rafaleDataTotal = state.rafaleData.reduce(
        (sum, item) => sum + (item.year ? parseInt(item.year, 10) : 0),
        0
      );
      const total = graphDataTotal + rafaleDataTotal;
      // calcule l'année d'immatriculation moyenne
      if (state.graphData.length + state.rafaleData.length > 0) {
        const res = total / (state.graphData.length + state.rafaleData.length);
        return res.toFixed(0);
      } else {
        return 0;
      }
    },
    getCarData: (state) => {
      return state.graphData.map((item) => JSON.parse(item.dataSearch)[0]);
    },
    getRafaleData: (state) => {
      return state.rafaleData;
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
            variables: { filter: { isMultipleImport: { eq: false } } },
          });

          this.graphData = data.listSearchHistories.items
        } catch (error) {
          console.error("Error fetching graph data:", error);
        }
      }
    },
    async fetchRafaleData() {
      try {
        // Fetch search histories where isMultipleImport is true
        const { data } = await API.graphql({
          query: listSearchHistories,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: { filter: { isMultipleImport: { eq: true } } },
        });

        // Process each Rafale import
        for (const item of data.listSearchHistories.items) {
          const s3Link = item.s3Link;
          const createdAt = item.createdAt;

          // Get signed URL for S3 file
          const signedUrl = await Storage.get(s3Link, { level: "private" });

          // Fetch the content of the file from the signed URL
          const response = await fetch(signedUrl);
          const fileContent = await response.text();

          // Parse the file content (assuming it's CSV, you can add logic for other formats)
          Papa.parse(fileContent, {
            header: true,
            complete: (results) => {
              // Filtrer les données pour exclure les entrées incomplètes
              const filteredResults = results.data.filter(
                (item) => item.make && item.make.trim() !== ""
              );
              // Attach the created_at date to each data item
              filteredResults.forEach((dataItem) => {
                dataItem.createdAt = createdAt;
              });

              // Ajouter les données filtrées à rafaleData
              this.rafaleData.push(...filteredResults);
            },
          });
        }
      } catch (error) {
        console.error("Error fetching Rafale data:", error);
      }
    },
    clearGraphData() {
      this.graphData = [];
    },
    toggleIncludedRafale() {
      this.includedRafale = !this.includedRafale;
      if (this.includedRafale) {
        this.fetchRafaleData();
      }
    },
  },
});
