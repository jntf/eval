/* Amplify Params - DO NOT EDIT
	API_EVALIO_GRAPHQLAPIENDPOINTOUTPUT
	API_EVALIO_GRAPHQLAPIIDOUTPUT
	API_EVALIO_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require("aws-sdk");
const ses = new AWS.SES({ region: "us-east-1" });
const uuid = require("uuid");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event);
    const userId = body.userId;

    const date = new Date().toISOString();

    const userData = await getUserData(userId);
    if (!userData) {
      console.error(
        "Failed to fetch user data. Aborting copyUserDataToDynamoDB"
      );
      return {
        statusCode: 500,
        body: JSON.stringify("Failed to fetch user data"),
      };
    }

    console.log("userData", userData);

    const {
      email,
      firstName,
      lastName,
      company,
      address,
      city,
      postalCode,
      vatNumber,
      phoneNumber,
    } = userData;

    // Mettre le user dans le groupe Admin
    await addUserToAdminGroup(userId);

    // Activer le user
    await isActiveUser(userId);

    // Créer une nouvelle compagnie
    const companyId = await createCompany(
      userId,
      company,
      vatNumber,
      address,
      city,
      postalCode, 
      date
    );
    // Créer un nouvel utilisateur et l'affecter à la compagnie
    await copyUserDataToDynamoDB(
      userId,
      email,
      firstName,
      lastName,
      phoneNumber,
      companyId,
      date
    );

    // // Envoyer un e-mail au user pour l'avertir que le compte est actif
    // await sendActivationEmail(email);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: JSON.stringify("Success"),
    };
  } catch (error) {
    console.error("Erreur lors de l'exécution de la lambda:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: JSON.stringify("Erreur lors de l'exécution de la lambda"),
    };
  }
};

async function getUserData(userId) {
  const cognito = new AWS.CognitoIdentityServiceProvider();

  try {
    const userResponse = await cognito
      .adminGetUser({
        UserPoolId: "us-east-1_ZFywPsG67",
        Username: userId,
      })
      .promise();

    const userAttributes = userResponse.UserAttributes;

    const getUserAttribute = (attributes, attributeName) => {
      const attribute = attributes.find((attr) => attr.Name === attributeName);
      return attribute ? attribute.Value : null;
    };

    if (!userAttributes || !Array.isArray(userAttributes)) {
      console.error("User attributes not found");
      return null;
    }

    const firstName = getUserAttribute(userAttributes, "name");
    const lastName = getUserAttribute(userAttributes, "family_name");
    const email = getUserAttribute(userAttributes, "email");
    const company = getUserAttribute(userAttributes, "custom:companyName");
    const address = getUserAttribute(userAttributes, "address");
    const city = getUserAttribute(userAttributes, "custom:city");
    const postalCode = getUserAttribute(userAttributes, "custom:codePostal");
    const vatNumber = getUserAttribute(userAttributes, "custom:vatNumber");
    const phoneNumber = getUserAttribute(userAttributes, "phone_number");

    return {
      firstName,
      lastName,
      email,
      company,
      address,
      city,
      postalCode,
      vatNumber,
      phoneNumber,
    };
  } catch (error) {
    console.error("An error occurred when fetching user data:", error);
    return null;
  }
}

async function addUserToAdminGroup(userId) {
  const cognito = new AWS.CognitoIdentityServiceProvider();

  const params = {
    UserPoolId: "us-east-1_ZFywPsG67",
    Username: userId,
    GroupName: "Admin",
  };

  await cognito.adminAddUserToGroup(params).promise();
}

async function isActiveUser(userId) {
  const cognito = new AWS.CognitoIdentityServiceProvider();

  const params = {
    UserAttributes: [
      {
        Name: "custom:isActive",
        Value: "1",
      },
    ],
    UserPoolId: "us-east-1_ZFywPsG67",
    Username: userId,
  };

  await cognito.adminUpdateUserAttributes(params).promise();
}

async function createCompany(
  userId,
  companyName,
  vatNumber,
  address,
  city,
  postalCode,
  date
) {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  const companyId = uuid.v4();

  const companyParams = {
    TableName: "Company-fqsbdtc5czfz3ipqimbhfgttke-dev",
    Item: {
      id: companyId,
      companyName: companyName,
      vatNumber: vatNumber,
      address: address,
      postalCode: postalCode,
      city: city,
      isActiveCompany: true,
      ownerId: userId,
      createdAt: date,
      updatedAt: date,
    },
  };
  await dynamoDB.put(companyParams).promise();

  return companyId;
}

async function copyUserDataToDynamoDB(
  userId,
  email,
  firstName,
  lastName,
  phoneNumber,
  companyId,
  date
) {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  const userParams = {
    TableName: "User-fqsbdtc5czfz3ipqimbhfgttke-dev",
    Item: {
      id: userId,
      email: email,
      name: firstName,
      family_name: lastName,
      phoneNumber: phoneNumber,
      isActiveUser: true,
      isAdminCompany: true,
      companyId: companyId,
      owner: userId,
      createdAt: date,
      updatedAt: date,
    },
  };
  await dynamoDB.put(userParams).promise();
}

async function sendActivationEmail(email) {
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "Votre compte a été activé. Vous pouvez maintenant vous connecter.",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Activation de compte",
      },
    },
    Source: "julien@evaluia.com",
  };

  await ses.sendEmail(params).promise();
}
