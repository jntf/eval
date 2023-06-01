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
    console.log("l'event est le suivant: ",event)
    
    const body = JSON.parse(event);
    
    const userId = body.userId;

    console.log(body);
    console.log('le userId est : ', userId);

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

    const companyId = await createCompany(
      company,
      vatNumber,
      address,
      city,
      postalCode
    );
    await copyUserDataToDynamoDB(
      userId,
      email,
      firstName,
      lastName,
      company,
      address,
      city,
      postalCode,
      vatNumber,
      phoneNumber,
      companyId // passez cet argument
    );

    // Envoyer un e-mail au user pour l'avertir que le compte est actif
    await sendActivationEmail(email);

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

    console.log(userAttributes);

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

async function createCompany(
  companyName,
  vatNumber,
  address,
  city,
  postalCode
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
      users: [],
    },
  };
  await dynamoDB.put(companyParams).promise();

  return companyId;
}

// Modifier cette fonction pour qu'elle prenne companyId en argument
async function copyUserDataToDynamoDB(
  userId,
  email,
  firstName,
  lastName,
  phoneNumber,
  companyId
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
      company: companyId,
    },
  };
  await dynamoDB.put(userParams).promise();

  // Ajouter le nouvel utilisateur à la liste des utilisateurs de l'entreprise
  const companyParams = {
    TableName: "Company-fqsbdtc5czfz3ipqimbhfgttke-dev",
    Key: { id: companyId },
    UpdateExpression: "ADD users :newUser",
    ExpressionAttributeValues: {
      ":newUser": dynamoDB.createSet([userId]),
    },
  };
  await dynamoDB.update(companyParams).promise();
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
