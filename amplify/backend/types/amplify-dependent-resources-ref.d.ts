export type AmplifyDependentResourcesAttributes = {
  "api": {
    "evalPredApi": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "evalio": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "function": {
    "evalPred": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  }
}