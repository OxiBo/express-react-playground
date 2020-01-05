// https://developers.facebook.com/docs/facebook-login/permissions/requesting-and-revoking/

// https://hackernoon.com/passportjs-the-confusing-parts-explained-edca874ebead

// https://developers.facebook.com/docs/graph-api/using-graph-api/

const passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy,
  //   axios = require("axios"),
  mongoose = require("mongoose"),
  User = require("../models/User");
// const User = mongoose.model("users");
require("../services/passportFacebook");

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

// https://developers.facebook.com/apps/2460065867648943/settings/basic/
passport.use(
  "facebook",
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL || "http://localhost:3030/auth/facebook/callback", // https://www.twilio.com/blog/facebook-oauth-login-node-js-app-passport-js
      auth_type: "reauthenticate",
      profileFields: ['displayName', 'email']
    },
    async (accessToken, refreshToken, profile, cb) => {
      // console.log( profile);
      // console.log("access token: " + accessToken)

      try{

      const existingUser = await User.findOne({ "facebook.id": profile.id });

      if (existingUser) {
        // console.log(foundUser);
        return cb(null, existingUser);
      }
      const newUser = new User({
        facebook: {
          id: profile.id,
          name: profile.displayName,
          token: accessToken,
          email: profile.emails[0].value
        }
      }).save();

      return cb(null, newUser);
      }catch(error){ //??????? work ou it
        console.log(error);
        return cb(error)
      }
    }
  )
);
