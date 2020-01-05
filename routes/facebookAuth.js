const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
require("../services/passportFacebook");

// Log in with facebook
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    auth_type: "reauthenticate",
    scope: ["email"]
  })
); // does not work, i cannot log in with other user

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    authType: "reauthenticate",
    auth_nonce: Math.random()
      .toString(36)
      .substring(7), //  characters picked randomly
    scope: ["email"],
    failureRedirect: "/"
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/home");
  }
);

module.exports = router;
