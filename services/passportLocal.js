const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  User = require("../models/User"),
  mongoose = require("mongoose");
// const User = mongoose.model("users");

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

passport.use(
  "local",
  new LocalStrategy(
    { passReqToCallback: true }, // how to get different (other than username and password) form fields - https://stackoverflow.com/questions/36761291/how-can-i-store-other-form-fields-with-passport-local-js and documentation - https://github.com/jaredhanson/passport-local#parameters
    async (req, username, password, done) => {
     
      const { email, avatarUrl, age, occupation } = req.body;
      try {
        const existingUser = await User.findOne({ "local.username": username });

        if (existingUser) {
          done(null, existingUser);
        } else {
          const newUser = await new User(
            ({
              local: { username },
              bio: { occupation, age, email, avatar: avatarUrl }
            })
          );
          newUser.local.password = newUser.generateHash(password);

          const user = await newUser.save();
          done(null, user);
          console.log(user)
          // res.send(user) //????
        }
      } catch (err) {
        console.error(err);
        // req.flash("error", err.message);
        done(err);
        // res won't work
        // res.status(422).send(err); // reason why 422 - https://stackoverflow.com/questions/16133923/400-vs-422-response-to-post-of-data
      }
    }
  )
);
