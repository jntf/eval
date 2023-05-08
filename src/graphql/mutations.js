/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createVehicle = /* GraphQL */ `
  mutation CreateVehicle(
    $input: CreateVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    createVehicle(input: $input, condition: $condition) {
      make
      model
      keywords
      energies
      transmissions
      isActive
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateVehicle = /* GraphQL */ `
  mutation UpdateVehicle(
    $input: UpdateVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    updateVehicle(input: $input, condition: $condition) {
      make
      model
      keywords
      energies
      transmissions
      isActive
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteVehicle = /* GraphQL */ `
  mutation DeleteVehicle(
    $input: DeleteVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    deleteVehicle(input: $input, condition: $condition) {
      make
      model
      keywords
      energies
      transmissions
      isActive
      id
      createdAt
      updatedAt
    }
  }
`;
export const createSearchHistory = /* GraphQL */ `
  mutation CreateSearchHistory(
    $input: CreateSearchHistoryInput!
    $condition: ModelSearchHistoryConditionInput
  ) {
    createSearchHistory(input: $input, condition: $condition) {
      id
      isMultipleImport
      dataSearch
      ref
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateSearchHistory = /* GraphQL */ `
  mutation UpdateSearchHistory(
    $input: UpdateSearchHistoryInput!
    $condition: ModelSearchHistoryConditionInput
  ) {
    updateSearchHistory(input: $input, condition: $condition) {
      id
      isMultipleImport
      dataSearch
      ref
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteSearchHistory = /* GraphQL */ `
  mutation DeleteSearchHistory(
    $input: DeleteSearchHistoryInput!
    $condition: ModelSearchHistoryConditionInput
  ) {
    deleteSearchHistory(input: $input, condition: $condition) {
      id
      isMultipleImport
      dataSearch
      ref
      createdAt
      updatedAt
      owner
    }
  }
`;
