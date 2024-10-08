const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

const secret_name = "server_secret";

const client = new SecretsManagerClient({
  region: "eu-west-2",
});

// Define a function to get the secret
async function getSecret() {
  let response;

  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );

    // Parse the SecretString to get the actual secret
    const secret = JSON.parse(response.SecretString);
    return secret; // Return the secret
  } catch (error) {
    console.error("Error retrieving secret:", error);
    throw error; // Re-throw to handle it later
  }
}

module.exports = { getSecret };

export {};
