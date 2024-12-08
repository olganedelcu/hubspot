export default () => ({
  hubspotClientId: process.env.HUBSPOT_CLIENT_ID,
  hubspotClientSecret: process.env.HUBSPOT_CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI || 'http://localhost:5173/hubspot/callback',
});
