import { API } from "aws-amplify";
import { listVehicles } from "../graphql/queries";

export const fetchMakes = async () => {
  try {
    const response = await API.graphql({
      query: listVehicles,
      variables: {
        limit: 10000,
        nextToken: null,
        sortDirection: "ASC",
        filter: {
          make: {
            ne: null,
          },
          isActive: {
            eq: 1,
          },
        },
      },
    });
    const makes = response.data.listVehicles.items.map((item) => item.make);
    return [...new Set(makes)].sort();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchModels = async (selectedMake) => {
  try {
    const response = await API.graphql({
      query: listVehicles,
      variables: {
        limit: 10000,
        nextToken: null,
        sortDirection: "ASC",
        filter: {
          make: {
            eq: selectedMake,
          },
          model: {
            ne: null,
          },
          isActive: {
            eq: 1,
          },
        },
      },
    });
    const models = response.data.listVehicles.items.map((item) => item.model);
    return [...new Set(models)].sort();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchDetails = async (selectedMake, selectedModel) => {
  try {
    const response = await API.graphql({
      query: listVehicles,
      variables: {
        limit: 10000,
        nextToken: null,
        sortDirection: "ASC",
        filter: {
          make: {
            eq: selectedMake,
          },
          model: {
            eq: selectedModel,
          },
          isActive: {
            eq: 1,
          },
        },
      },
    });

    const keywords = response.data.listVehicles.items.map(
      (item) => item.keywords
    )[0];
    const energies = response.data.listVehicles.items.map(
      (item) => item.energies
    )[0];
    const transmissions = response.data.listVehicles.items.map(
      (item) => item.transmissions
    )[0];

    return {
      keywords: [...new Set(keywords)]
        .map((keyword) => ({
          label: keyword,
          selected: false,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
      energies: [...new Set(energies)].sort(),
      transmissions: [...new Set(transmissions)].sort(),
    };
  } catch (error) {
    console.log(error);
    return {
      keywords: [],
      energies: [],
      transmissions: [],
    };
  }
};
