/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateVehicle = /* GraphQL */ `
  subscription OnCreateVehicle($filter: ModelSubscriptionVehicleFilterInput) {
    onCreateVehicle(filter: $filter) {
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
export const onUpdateVehicle = /* GraphQL */ `
  subscription OnUpdateVehicle($filter: ModelSubscriptionVehicleFilterInput) {
    onUpdateVehicle(filter: $filter) {
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
export const onDeleteVehicle = /* GraphQL */ `
  subscription OnDeleteVehicle($filter: ModelSubscriptionVehicleFilterInput) {
    onDeleteVehicle(filter: $filter) {
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
export const onCreateSearchHistory = /* GraphQL */ `
  subscription OnCreateSearchHistory(
    $filter: ModelSubscriptionSearchHistoryFilterInput
    $owner: String
  ) {
    onCreateSearchHistory(filter: $filter, owner: $owner) {
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
export const onUpdateSearchHistory = /* GraphQL */ `
  subscription OnUpdateSearchHistory(
    $filter: ModelSubscriptionSearchHistoryFilterInput
    $owner: String
  ) {
    onUpdateSearchHistory(filter: $filter, owner: $owner) {
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
export const onDeleteSearchHistory = /* GraphQL */ `
  subscription OnDeleteSearchHistory(
    $filter: ModelSubscriptionSearchHistoryFilterInput
    $owner: String
  ) {
    onDeleteSearchHistory(filter: $filter, owner: $owner) {
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
