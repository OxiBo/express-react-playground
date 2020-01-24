// production keys here

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  facebookAPIId: process.env.FACEBOOK_API_ID,
  facebookAPISecret: process.env.FACEBOOK_API_SECRET,
  facebookCallBackURL: process.env.FACEBOOK_CALLBACK_URL,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  sendGridKey: process.env.SEND_GRID_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN
};
// heroku config:set NODE_MODULES_CACHE=false

