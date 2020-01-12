require("dotenv").config();

const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  cookieSession = require("cookie-session"),
  passport = require("passport"),
  mongoose = require("mongoose"),
  app = express();

// have to require the model before requiring passport
require("./models/User");
const User = mongoose.model("users");
require("./services/passportLocal");

app.use(cors()); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. ; https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.use(
  cookieSession({
    name: "session", // default value
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    keys: [process.env.COOKIE_KEY]
  })
);

app.use(passport.initialize()); // has to be put before requiring auth routes
app.use(passport.session()); // has to be put before requiring auth routes - require("./routes/authRoutes")(app);'

//requiring routes
const localAuthRoutes = require("./routes/authLocal");
const googleAuthRoutes = require("./routes/googleAuth");
const facebookAuthRoutes = require("./routes/facebookAuth");

// require("./routes/authLocal")(app);
app.use(localAuthRoutes);
app.use(googleAuthRoutes);
app.use(facebookAuthRoutes);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


// database configuration
const dataBaseURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/express-react-playground";
mongoose
  .connect(dataBaseURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Connected to DB!");
  })
  .catch(err => {
    console.log("ERROR:", err.message);
  });

app.get("/", (req, res) => {
  // console.log(req.user)
  res.send("Hello, app!???");
});

app.get("/api/current_user", (req, res) => {
  //console.log(req.session)
  res.send(req.user);
});

// logout route
app.get("/api/logout", (req, res) => {
  // https://developers.facebook.com/docs/facebook-login/reauthentication/
  // if (req.user.facebook.id) {
  //   try {
  //     await axios.delete(
  //       `https://graph.facebook.com/${req.user.facebook.id}/permissions?access_token=${req.user.facebook.token}`
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  req.logout();
  // req.flash("success", "You are logged out");
  // res.redirect("/");
  // console.log(req.user);
  // res.send(req.user);
  res.redirect('/');
  
    
});




app.use((err, req, res, next) => {
  if (!err) {
    return next();
  }
  res.status(500).send('Internal Server Error');
});

// for production to serve index.html if unknown route requested(??)
if (process.env.NODE_ENV === "production") {
  // Express will serve production assets like main.css  or main.js files
  app.use(express.static("client/build"));

  // Express will serve index.html if it does not recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// // catch all errors
// app.get('*', (req, res) => {
//   res.status(404).send('404 Not Found');
// });

// app is running
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log("App is running"));
