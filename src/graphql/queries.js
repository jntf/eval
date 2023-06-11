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
export const getSearchHistory = /* GraphQL */ `
  query GetSearchHistory($id: ID!) {
    getSearchHistory(id: $id) {
      id
      isMultipleImport
      s3Link
      dataSearch
      ref
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listSearchHistories = /* GraphQL */ `
  query ListSearchHistories(
    $filter: ModelSearchHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSearchHistories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        isMultipleImport
        s3Link
        dataSearch
        ref
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      name
      family_name
      phoneNumber
      isActiveUser
      isAdminCompany
      company {
        id
        companyName
        vatNumber
        address
        postalCode
        city
        isActiveCompany
        ownerId
        createdAt
        updatedAt
        owner
      }
      companyId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        name
        family_name
        phoneNumber
        isActiveUser
        isAdminCompany
        companyId
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      companyName
      vatNumber
      address
      postalCode
      city
      isActiveCompany
      users {
        nextToken
      }
      ownerId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listCompanies = /* GraphQL */ `
  query ListCompanies(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        companyName
        vatNumber
        address
        postalCode
        city
        isActiveCompany
        ownerId
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
