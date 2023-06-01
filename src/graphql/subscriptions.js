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
export const onCreateBrandDistribution = /* GraphQL */ `
  subscription OnCreateBrandDistribution(
    $filter: ModelSubscriptionBrandDistributionFilterInput
  ) {
    onCreateBrandDistribution(filter: $filter) {
      date
      brand
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateBrandDistribution = /* GraphQL */ `
  subscription OnUpdateBrandDistribution(
    $filter: ModelSubscriptionBrandDistributionFilterInput
  ) {
    onUpdateBrandDistribution(filter: $filter) {
      date
      brand
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteBrandDistribution = /* GraphQL */ `
  subscription OnDeleteBrandDistribution(
    $filter: ModelSubscriptionBrandDistributionFilterInput
  ) {
    onDeleteBrandDistribution(filter: $filter) {
      date
      brand
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateModelDistribution = /* GraphQL */ `
  subscription OnCreateModelDistribution(
    $filter: ModelSubscriptionModelDistributionFilterInput
  ) {
    onCreateModelDistribution(filter: $filter) {
      date
      model
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateModelDistribution = /* GraphQL */ `
  subscription OnUpdateModelDistribution(
    $filter: ModelSubscriptionModelDistributionFilterInput
  ) {
    onUpdateModelDistribution(filter: $filter) {
      date
      model
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteModelDistribution = /* GraphQL */ `
  subscription OnDeleteModelDistribution(
    $filter: ModelSubscriptionModelDistributionFilterInput
  ) {
    onDeleteModelDistribution(filter: $filter) {
      date
      model
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAvgDaysInStock = /* GraphQL */ `
  subscription OnCreateAvgDaysInStock(
    $filter: ModelSubscriptionAvgDaysInStockFilterInput
  ) {
    onCreateAvgDaysInStock(filter: $filter) {
      date
      brand
      model
      avgDaysInStock
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAvgDaysInStock = /* GraphQL */ `
  subscription OnUpdateAvgDaysInStock(
    $filter: ModelSubscriptionAvgDaysInStockFilterInput
  ) {
    onUpdateAvgDaysInStock(filter: $filter) {
      date
      brand
      model
      avgDaysInStock
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAvgDaysInStock = /* GraphQL */ `
  subscription OnDeleteAvgDaysInStock(
    $filter: ModelSubscriptionAvgDaysInStockFilterInput
  ) {
    onDeleteAvgDaysInStock(filter: $filter) {
      date
      brand
      model
      avgDaysInStock
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateYearDistribution = /* GraphQL */ `
  subscription OnCreateYearDistribution(
    $filter: ModelSubscriptionYearDistributionFilterInput
  ) {
    onCreateYearDistribution(filter: $filter) {
      date
      year
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateYearDistribution = /* GraphQL */ `
  subscription OnUpdateYearDistribution(
    $filter: ModelSubscriptionYearDistributionFilterInput
  ) {
    onUpdateYearDistribution(filter: $filter) {
      date
      year
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteYearDistribution = /* GraphQL */ `
  subscription OnDeleteYearDistribution(
    $filter: ModelSubscriptionYearDistributionFilterInput
  ) {
    onDeleteYearDistribution(filter: $filter) {
      date
      year
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateActiveSellers = /* GraphQL */ `
  subscription OnCreateActiveSellers(
    $filter: ModelSubscriptionActiveSellersFilterInput
  ) {
    onCreateActiveSellers(filter: $filter) {
      date
      seller
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateActiveSellers = /* GraphQL */ `
  subscription OnUpdateActiveSellers(
    $filter: ModelSubscriptionActiveSellersFilterInput
  ) {
    onUpdateActiveSellers(filter: $filter) {
      date
      seller
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteActiveSellers = /* GraphQL */ `
  subscription OnDeleteActiveSellers(
    $filter: ModelSubscriptionActiveSellersFilterInput
  ) {
    onDeleteActiveSellers(filter: $filter) {
      date
      seller
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEnergyDistribution = /* GraphQL */ `
  subscription OnCreateEnergyDistribution(
    $filter: ModelSubscriptionEnergyDistributionFilterInput
  ) {
    onCreateEnergyDistribution(filter: $filter) {
      date
      energy
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateEnergyDistribution = /* GraphQL */ `
  subscription OnUpdateEnergyDistribution(
    $filter: ModelSubscriptionEnergyDistributionFilterInput
  ) {
    onUpdateEnergyDistribution(filter: $filter) {
      date
      energy
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteEnergyDistribution = /* GraphQL */ `
  subscription OnDeleteEnergyDistribution(
    $filter: ModelSubscriptionEnergyDistributionFilterInput
  ) {
    onDeleteEnergyDistribution(filter: $filter) {
      date
      energy
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAvgPrice = /* GraphQL */ `
  subscription OnCreateAvgPrice($filter: ModelSubscriptionAvgPriceFilterInput) {
    onCreateAvgPrice(filter: $filter) {
      date
      brand
      model
      avgPrice
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAvgPrice = /* GraphQL */ `
  subscription OnUpdateAvgPrice($filter: ModelSubscriptionAvgPriceFilterInput) {
    onUpdateAvgPrice(filter: $filter) {
      date
      brand
      model
      avgPrice
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAvgPrice = /* GraphQL */ `
  subscription OnDeleteAvgPrice($filter: ModelSubscriptionAvgPriceFilterInput) {
    onDeleteAvgPrice(filter: $filter) {
      date
      brand
      model
      avgPrice
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
      s3Link
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
      s3Link
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
      s3Link
      dataSearch
      ref
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      companyUsersId
      owner
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      companyUsersId
      owner
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      companyUsersId
      owner
    }
  }
`;
export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany(
    $filter: ModelSubscriptionCompanyFilterInput
    $owner: String
  ) {
    onCreateCompany(filter: $filter, owner: $owner) {
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
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany(
    $filter: ModelSubscriptionCompanyFilterInput
    $owner: String
  ) {
    onUpdateCompany(filter: $filter, owner: $owner) {
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
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany(
    $filter: ModelSubscriptionCompanyFilterInput
    $owner: String
  ) {
    onDeleteCompany(filter: $filter, owner: $owner) {
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
      createdAt
      updatedAt
      owner
    }
  }
`;
