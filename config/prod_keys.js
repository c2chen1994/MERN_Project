// prod.js - production keys here!! COMMIT THIS!!
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  // stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  // stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  // sendGridKey: process.env.SEND_GRID_KEY,
  domain: process.env.DOMAIN,
  githubClientID: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  linkedinClientID: LINKEDIN_CLIENT_ID,
  linkedinClientSecret: LINKEDIN_CLIENT_SECRET,
  twitterApiKey: TWITTER_API_KEY,
  twitterApiSecretKey: TWITTER_API_SECRET_KEY,
  facebookAppID: FACEBOOK_APP_ID,
  facebookAppSecret: FACEBOOK_APP_SECRET
};
