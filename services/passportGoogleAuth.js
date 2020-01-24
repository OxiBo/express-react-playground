const passport = require("passport"),
  GoogleStrategy = require("passport-google-oauth20").Strategy,
  mongoose = require("mongoose"),
  keys = require("../config/keys");
//   User = require("../models/User");
const User = mongoose.model("users");

  // passport.serializeUser((user, done) => {
  //   done(null, user.id);
  // });
  
  // passport.deserializeUser((id, done) => {
  //   User.findById(id, (err, user) => {
  //     done(err, user);
  //   });
  // });

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true // to fix http and http problem when deploying
    },
    async (token, tokenSecret, profile, done) => {
      // console.log(token)
      const existingUser = await User.findOne({ "google.id": profile.id });

      if (existingUser) {
        // we have the user in our database
        return done(null, existingUser);
      }
      // create a new user, we don't have the user in our database
      const newUser = new User({
        google: {
          id: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          token: token
        }
      }).save();
      return done(null, newUser);
    }
  )
);
