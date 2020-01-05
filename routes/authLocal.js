const express = require("express"),
  router = express.Router(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport");
require("../services/passportLocal");
router.use(bodyParser.urlencoded({ extended: true }));
const User = mongoose.model("users");

router.post("/api/signup", async (req, res) => {
  console.log(req.body);
  // check if username exist in database
  try {
    const foundUser = await User.findOne({
      "local.username": req.body.username
    });
    if (foundUser) {
      res.send({ error: "User with this name already exists" });
    } else {
      passport.authenticate("local")(req, res, () => {
        // console.log(req.user);
        const { avatarUrl, occupation, age, gender } = req.user.bio;
        const newUser = {
          local: {username: req.user.local.username, email: req.user.email},
          bio: { avatarUrl, occupation, gender, age }
        };
        res.send(newUser);
      });
    }
  } catch (error) {
    console.error(error);
    res.status(422).send(error);
  }
});

router.get("/api/username-check/:name", async (req, res) => {
  // console.log(req);
  // check if username exist in database
  try {
    const foundUser = await User.findOne({
      "local.username": req.params.name
    });
    if (foundUser) {
      return res.send(true);
    }
    res.send(false);
  } catch (error) {
    console.error(error);
    res.status(422).send(error);
  }
});

router.post("/api/login", async (req, res) => {
//   console.log(req.body);
  // check if username exist in database
  try {
    const foundUser = await User.findOne({
      "local.username": req.body.username
    });
    if (!foundUser) {
      res.status(401).send({ error: "No user found" });
    } else if (!foundUser.validPassword(req.body.password)) {
      res.status(401).send({ error: "Wrong password" });
    } else {
      passport.authenticate("local")(req, res, () => {
        // console.log(req.user);
        res.send(foundUser);
      });
    }
  } catch (error) {
    console.error(error);
    res.status(422).send(error);
  }
});

module.exports = router;
