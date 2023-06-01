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
export const createBrandDistribution = /* GraphQL */ `
  mutation CreateBrandDistribution(
    $input: CreateBrandDistributionInput!
    $condition: ModelBrandDistributionConditionInput
  ) {
    createBrandDistribution(input: $input, condition: $condition) {
      date
      brand
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateBrandDistribution = /* GraphQL */ `
  mutation UpdateBrandDistribution(
    $input: UpdateBrandDistributionInput!
    $condition: ModelBrandDistributionConditionInput
  ) {
    updateBrandDistribution(input: $input, condition: $condition) {
      date
      brand
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteBrandDistribution = /* GraphQL */ `
  mutation DeleteBrandDistribution(
    $input: DeleteBrandDistributionInput!
    $condition: ModelBrandDistributionConditionInput
  ) {
    deleteBrandDistribution(input: $input, condition: $condition) {
      date
      brand
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const createModelDistribution = /* GraphQL */ `
  mutation CreateModelDistribution(
    $input: CreateModelDistributionInput!
    $condition: ModelModelDistributionConditionInput
  ) {
    createModelDistribution(input: $input, condition: $condition) {
      date
      model
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateModelDistribution = /* GraphQL */ `
  mutation UpdateModelDistribution(
    $input: UpdateModelDistributionInput!
    $condition: ModelModelDistributionConditionInput
  ) {
    updateModelDistribution(input: $input, condition: $condition) {
      date
      model
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteModelDistribution = /* GraphQL */ `
  mutation DeleteModelDistribution(
    $input: DeleteModelDistributionInput!
    $condition: ModelModelDistributionConditionInput
  ) {
    deleteModelDistribution(input: $input, condition: $condition) {
      date
      model
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const createAvgDaysInStock = /* GraphQL */ `
  mutation CreateAvgDaysInStock(
    $input: CreateAvgDaysInStockInput!
    $condition: ModelAvgDaysInStockConditionInput
  ) {
    createAvgDaysInStock(input: $input, condition: $condition) {
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
export const updateAvgDaysInStock = /* GraphQL */ `
  mutation UpdateAvgDaysInStock(
    $input: UpdateAvgDaysInStockInput!
    $condition: ModelAvgDaysInStockConditionInput
  ) {
    updateAvgDaysInStock(input: $input, condition: $condition) {
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
export const deleteAvgDaysInStock = /* GraphQL */ `
  mutation DeleteAvgDaysInStock(
    $input: DeleteAvgDaysInStockInput!
    $condition: ModelAvgDaysInStockConditionInput
  ) {
    deleteAvgDaysInStock(input: $input, condition: $condition) {
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
export const createYearDistribution = /* GraphQL */ `
  mutation CreateYearDistribution(
    $input: CreateYearDistributionInput!
    $condition: ModelYearDistributionConditionInput
  ) {
    createYearDistribution(input: $input, condition: $condition) {
      date
      year
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateYearDistribution = /* GraphQL */ `
  mutation UpdateYearDistribution(
    $input: UpdateYearDistributionInput!
    $condition: ModelYearDistributionConditionInput
  ) {
    updateYearDistribution(input: $input, condition: $condition) {
      date
      year
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteYearDistribution = /* GraphQL */ `
  mutation DeleteYearDistribution(
    $input: DeleteYearDistributionInput!
    $condition: ModelYearDistributionConditionInput
  ) {
    deleteYearDistribution(input: $input, condition: $condition) {
      date
      year
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const createActiveSellers = /* GraphQL */ `
  mutation CreateActiveSellers(
    $input: CreateActiveSellersInput!
    $condition: ModelActiveSellersConditionInput
  ) {
    createActiveSellers(input: $input, condition: $condition) {
      date
      seller
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateActiveSellers = /* GraphQL */ `
  mutation UpdateActiveSellers(
    $input: UpdateActiveSellersInput!
    $condition: ModelActiveSellersConditionInput
  ) {
    updateActiveSellers(input: $input, condition: $condition) {
      date
      seller
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteActiveSellers = /* GraphQL */ `
  mutation DeleteActiveSellers(
    $input: DeleteActiveSellersInput!
    $condition: ModelActiveSellersConditionInput
  ) {
    deleteActiveSellers(input: $input, condition: $condition) {
      date
      seller
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const createEnergyDistribution = /* GraphQL */ `
  mutation CreateEnergyDistribution(
    $input: CreateEnergyDistributionInput!
    $condition: ModelEnergyDistributionConditionInput
  ) {
    createEnergyDistribution(input: $input, condition: $condition) {
      date
      energy
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateEnergyDistribution = /* GraphQL */ `
  mutation UpdateEnergyDistribution(
    $input: UpdateEnergyDistributionInput!
    $condition: ModelEnergyDistributionConditionInput
  ) {
    updateEnergyDistribution(input: $input, condition: $condition) {
      date
      energy
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteEnergyDistribution = /* GraphQL */ `
  mutation DeleteEnergyDistribution(
    $input: DeleteEnergyDistributionInput!
    $condition: ModelEnergyDistributionConditionInput
  ) {
    deleteEnergyDistribution(input: $input, condition: $condition) {
      date
      energy
      count
      id
      createdAt
      updatedAt
    }
  }
`;
export const createAvgPrice = /* GraphQL */ `
  mutation CreateAvgPrice(
    $input: CreateAvgPriceInput!
    $condition: ModelAvgPriceConditionInput
  ) {
    createAvgPrice(input: $input, condition: $condition) {
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
export const updateAvgPrice = /* GraphQL */ `
  mutation UpdateAvgPrice(
    $input: UpdateAvgPriceInput!
    $condition: ModelAvgPriceConditionInput
  ) {
    updateAvgPrice(input: $input, condition: $condition) {
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
export const deleteAvgPrice = /* GraphQL */ `
  mutation DeleteAvgPrice(
    $input: DeleteAvgPriceInput!
    $condition: ModelAvgPriceConditionInput
  ) {
    deleteAvgPrice(input: $input, condition: $condition) {
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
export const createSearchHistory = /* GraphQL */ `
  mutation CreateSearchHistory(
    $input: CreateSearchHistoryInput!
    $condition: ModelSearchHistoryConditionInput
  ) {
    createSearchHistory(input: $input, condition: $condition) {
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
export const updateSearchHistory = /* GraphQL */ `
  mutation UpdateSearchHistory(
    $input: UpdateSearchHistoryInput!
    $condition: ModelSearchHistoryConditionInput
  ) {
    updateSearchHistory(input: $input, condition: $condition) {
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
export const deleteSearchHistory = /* GraphQL */ `
  mutation DeleteSearchHistory(
    $input: DeleteSearchHistoryInput!
    $condition: ModelSearchHistoryConditionInput
  ) {
    deleteSearchHistory(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
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
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
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
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
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
