/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require("aws-sdk");
const cognito = new AWS.CognitoIdentityServiceProvider({ region: "us-east-1" });
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid");

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const body = JSON.parse(event.body);

  const firstName = body.firstName;
  const lastName = body.lastName;
  const email = body.email;
  const phoneNumber = body.phoneNumber;
  // transform phoneNumber to E164 format (+33123456789)
  const phoneNumberE164 = "+33" + phoneNumber.replace(/\D/g, "");
  const tmpPassword = body.temporaryPassword;
  const companyId = body.companyId;
  const adminId = body.adminId;

  try {
    // Create user in Cognito
    const user = await createUserInCognito(
      firstName,
      lastName,
      phoneNumberE164,
      email,
      tmpPassword
    );

    // Get the user's Cognito ID
    const userId = user.User.Username;

    // Create user in DynamoDB
    await createUserInDynamoDB(
        userId, 
        firstName, 
        lastName, 
        email, 
        phoneNumberE164, 
        companyId, 
        adminId
    );

    // Return success response
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify("User created successfully : ", userId),
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify("Error creating user"),
    };
  }
};

const createUserInCognito = async (
  firstName,
  lastName,
  phoneNumber,
  email,
  password
) => {
  const params = {
    UserPoolId: "us-east-1_ZFywPsG67",
    Username: email,
    TemporaryPassword: password,
    UserAttributes: [
      {
        Name: "name",
        Value: firstName,
      },
      {
        Name: "family_name",
        Value: lastName,
      },
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "email_verified",
        Value: "true",
      },
      {
        Name: "phone_number",
        Value: phoneNumber,
      },
      {
        Name: "phone_number_verified",
        Value: "true",
      },
      {
        Name: "custom:isActive",
        Value: "1"
      }
    ],
    MessageAction: "SUPPRESS", // Désactive le message de bienvenue
    DesiredDeliveryMediums: [],
  };

  return cognito.adminCreateUser(params).promise();
};

const createUserInDynamoDB = async (
  userId,
  firstName,
  lastName,
  email,
  phoneNumber,
  companyId,
  adminId
) => {
  const date = new Date().toISOString();
  const userParams = {
    TableName: "User-fqsbdtc5czfz3ipqimbhfgttke-dev",
    Item: {
      id: userId,
      name: firstName,
      family_name: lastName,
      email: email,
      phoneNumber: phoneNumber,
      isActiveUser: true,
      isAdminCompany: false,
      companyId: companyId,
      owner: adminId,
      createdAt: date,
      updatedAt: date,
    },
  };

  return dynamoDB.put(userParams).promise();
};
