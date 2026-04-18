const fs = require('fs');
const { expo } = require('./app.json');

function getGoogleServicesPath() {
  return process.env.GOOGLE_SERVICES_JSON || expo.android.googleServicesFile;
}

function getGoogleWebClientId() {
  const googleServicesPath = getGoogleServicesPath();

  try {
    const googleServices = JSON.parse(fs.readFileSync(googleServicesPath, 'utf8'));
    return googleServices.client
      ?.flatMap((client) => client.oauth_client ?? [])
      .find((oauthClient) => oauthClient.client_type === 3)?.client_id;
  } catch {
    return undefined;
  }
}

module.exports = {
  ...expo,
  android: {
    ...expo.android,
    googleServicesFile: getGoogleServicesPath(),
  },
  extra: {
    ...expo.extra,
    googleWebClientId: getGoogleWebClientId(),
  },
};
