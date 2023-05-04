/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVehicle = /* GraphQL */ `
  query GetVehicle($id: ID!) {
    getVehicle(id: $id) {
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
export const listVehicles = /* GraphQL */ `
  query ListVehicles(
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVehicles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const vehiclesByMakeAndModel = /* GraphQL */ `
  query VehiclesByMakeAndModel(
    $make: String!
    $model: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    vehiclesByMakeAndModel(
      make: $make
      model: $model
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
