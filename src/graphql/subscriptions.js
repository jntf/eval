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
      __typename
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
      __typename
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
      __typename
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
      __typename
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
      __typename
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
      __typename
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
export const onCreateSettingsCompany = /* GraphQL */ `
  subscription OnCreateSettingsCompany(
    $filter: ModelSubscriptionSettingsCompanyFilterInput
    $owner: String
  ) {
    onCreateSettingsCompany(filter: $filter, owner: $owner) {
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
export const onUpdateSettingsCompany = /* GraphQL */ `
  subscription OnUpdateSettingsCompany(
    $filter: ModelSubscriptionSettingsCompanyFilterInput
    $owner: String
  ) {
    onUpdateSettingsCompany(filter: $filter, owner: $owner) {
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
export const onDeleteSettingsCompany = /* GraphQL */ `
  subscription OnDeleteSettingsCompany(
    $filter: ModelSubscriptionSettingsCompanyFilterInput
    $owner: String
  ) {
    onDeleteSettingsCompany(filter: $filter, owner: $owner) {
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
