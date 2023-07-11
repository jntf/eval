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
      __typename
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
      __typename
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
      __typename
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
      __typename
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
      __typename
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
      __typename
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
export const createSettingsCompany = /* GraphQL */ `
  mutation CreateSettingsCompany(
    $input: CreateSettingsCompanyInput!
    $condition: ModelSettingsCompanyConditionInput
  ) {
    createSettingsCompany(input: $input, condition: $condition) {
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
export const updateSettingsCompany = /* GraphQL */ `
  mutation UpdateSettingsCompany(
    $input: UpdateSettingsCompanyInput!
    $condition: ModelSettingsCompanyConditionInput
  ) {
    updateSettingsCompany(input: $input, condition: $condition) {
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
export const deleteSettingsCompany = /* GraphQL */ `
  mutation DeleteSettingsCompany(
    $input: DeleteSettingsCompanyInput!
    $condition: ModelSettingsCompanyConditionInput
  ) {
    deleteSettingsCompany(input: $input, condition: $condition) {
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
