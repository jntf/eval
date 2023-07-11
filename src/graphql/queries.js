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
      __typename
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
        __typename
      }
      nextToken
      __typename
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
        __typename
      }
      nextToken
      __typename
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
      __typename
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
        __typename
      }
      nextToken
      __typename
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
        settingsCompanyId
        ownerId
        createdAt
        updatedAt
        owner
        __typename
      }
      companyId
      createdAt
      updatedAt
      owner
      __typename
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
        __typename
      }
      nextToken
      __typename
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
      settings {
        id
        fixedFees
        freVo
        margin
        marginType
        companyId
        createdAt
        updatedAt
        owner
        __typename
      }
      settingsCompanyId
      users {
        nextToken
        __typename
      }
      ownerId
      createdAt
      updatedAt
      owner
      __typename
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
        settingsCompanyId
        ownerId
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSettingsCompany = /* GraphQL */ `
  query GetSettingsCompany($id: ID!) {
    getSettingsCompany(id: $id) {
      id
      fixedFees
      freVo
      margin
      marginType
      company {
        id
        companyName
        vatNumber
        address
        postalCode
        city
        isActiveCompany
        settingsCompanyId
        ownerId
        createdAt
        updatedAt
        owner
        __typename
      }
      companyId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listSettingsCompanies = /* GraphQL */ `
  query ListSettingsCompanies(
    $filter: ModelSettingsCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSettingsCompanies(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        fixedFees
        freVo
        margin
        marginType
        companyId
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
