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
export const getBrandDistribution = /* GraphQL */ `
  query GetBrandDistribution($id: ID!) {
    getBrandDistribution(id: $id) {
      date
      brand
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const listBrandDistributions = /* GraphQL */ `
  query ListBrandDistributions(
    $filter: ModelBrandDistributionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBrandDistributions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        date
        brand
        count
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getModelDistribution = /* GraphQL */ `
  query GetModelDistribution($id: ID!) {
    getModelDistribution(id: $id) {
      date
      model
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const listModelDistributions = /* GraphQL */ `
  query ListModelDistributions(
    $filter: ModelModelDistributionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listModelDistributions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        date
        model
        count
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAvgDaysInStock = /* GraphQL */ `
  query GetAvgDaysInStock($id: ID!) {
    getAvgDaysInStock(id: $id) {
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
export const listAvgDaysInStocks = /* GraphQL */ `
  query ListAvgDaysInStocks(
    $filter: ModelAvgDaysInStockFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAvgDaysInStocks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        date
        brand
        model
        avgDaysInStock
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getYearDistribution = /* GraphQL */ `
  query GetYearDistribution($id: ID!) {
    getYearDistribution(id: $id) {
      date
      year
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const listYearDistributions = /* GraphQL */ `
  query ListYearDistributions(
    $filter: ModelYearDistributionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listYearDistributions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        date
        year
        count
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getActiveSellers = /* GraphQL */ `
  query GetActiveSellers($id: ID!) {
    getActiveSellers(id: $id) {
      date
      seller
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const listActiveSellers = /* GraphQL */ `
  query ListActiveSellers(
    $filter: ModelActiveSellersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActiveSellers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        date
        seller
        count
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEnergyDistribution = /* GraphQL */ `
  query GetEnergyDistribution($id: ID!) {
    getEnergyDistribution(id: $id) {
      date
      energy
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const listEnergyDistributions = /* GraphQL */ `
  query ListEnergyDistributions(
    $filter: ModelEnergyDistributionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnergyDistributions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        date
        energy
        count
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAvgPrice = /* GraphQL */ `
  query GetAvgPrice($id: ID!) {
    getAvgPrice(id: $id) {
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
export const listAvgPrices = /* GraphQL */ `
  query ListAvgPrices(
    $filter: ModelAvgPriceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAvgPrices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        date
        brand
        model
        avgPrice
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
export const brandDistributionsByDateAndBrand = /* GraphQL */ `
  query BrandDistributionsByDateAndBrand(
    $date: String!
    $brand: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBrandDistributionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    brandDistributionsByDateAndBrand(
      date: $date
      brand: $brand
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        date
        brand
        count
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const modelDistributionsByDateAndModel = /* GraphQL */ `
  query ModelDistributionsByDateAndModel(
    $date: String!
    $model: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelModelDistributionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    modelDistributionsByDateAndModel(
      date: $date
      model: $model
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        date
        model
        count
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const avgDaysInStocksByDateAndBrand = /* GraphQL */ `
  query AvgDaysInStocksByDateAndBrand(
    $date: String!
    $brand: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAvgDaysInStockFilterInput
    $limit: Int
    $nextToken: String
  ) {
    avgDaysInStocksByDateAndBrand(
      date: $date
      brand: $brand
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        date
        brand
        model
        avgDaysInStock
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const yearDistributionsByDateAndYear = /* GraphQL */ `
  query YearDistributionsByDateAndYear(
    $date: String!
    $year: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelYearDistributionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    yearDistributionsByDateAndYear(
      date: $date
      year: $year
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        date
        year
        count
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const activeSellersByDateAndSeller = /* GraphQL */ `
  query ActiveSellersByDateAndSeller(
    $date: String!
    $seller: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelActiveSellersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    activeSellersByDateAndSeller(
      date: $date
      seller: $seller
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        date
        seller
        count
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const energyDistributionsByDateAndEnergy = /* GraphQL */ `
  query EnergyDistributionsByDateAndEnergy(
    $date: String!
    $energy: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEnergyDistributionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    energyDistributionsByDateAndEnergy(
      date: $date
      energy: $energy
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        date
        energy
        count
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const avgPricesByDateAndBrand = /* GraphQL */ `
  query AvgPricesByDateAndBrand(
    $date: String!
    $brand: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAvgPriceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    avgPricesByDateAndBrand(
      date: $date
      brand: $brand
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        date
        brand
        model
        avgPrice
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
        createdAt
        updatedAt
        companyUsersId
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
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
