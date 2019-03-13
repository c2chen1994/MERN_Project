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
  linkedinClientID: process.env.LINKEDIN_CLIENT_ID,
  linkedinClientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  twitterApiKey: process.env.TWITTER_API_KEY,
  twitterApiSecretKey: process.env.TWITTER_API_SECRET_KEY,
  facebookAppID: process.env.FACEBOOK_APP_ID,
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET
};
