1. Create server folder, index.js file, configure server side.
2. In server folder create react app with create-react-app
3. How to run backend server and frontend server at the same time:
a. Install package concurrently in server folder. 
b. Change "scripts" in package.json in server to:
"scripts": {
    "start": "node index.js",
    "server": "nodemon index.js",
    "client": "npm run start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  }
  c. to run application on two servers at the same time run npm run dev
4.  For serving in case server or client cannot find requested route IN PRODUCTION:
=========================================
if (process.env.NODE_ENV === "production") {
  // Express will serve production assets like main.css  or main.js files
  app.use(express.static("client/build"));

  // Express will serve index.html if it does not recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
==========================================


5. To make app use links coded in backend (express) install - npm install http-proxy-middleware --save
and create file with this kind of content:
========================
// https://www.udemy.com/course/node-with-react-fullstack-web-development/learn/lecture/12072146#content

const proxy = require('http-proxy-middleware')
 
module.exports = (app) => {
    app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:3010' })); // where 3010 is backend server port
}

======================================

6. Show navbar in some pages and hide it on the main page - https://stackoverflow.com/questions/47281850/how-to-hide-navbar-in-login-page-in-react-router

7. after adding this line - app.use(bodyParser.json()) - in index.js main backend file, I was able to use req.body with values coming from front end

8. import { withRouter } from "react-router-dom"; to be able to use history object in React side

9. google Auth - https://console.developers.google.com/apis/dashboard?project=emaily-dev-259203&pli=1
a. create a new project
b. enable api - https://console.developers.google.com/apis/library?project=fullstackplayground&q=google%2B find google+ and enable
c. create credentials

9. Redux-form initialValues. To pass initial values, pass an object with values (key-value pairs (form field names)) as props to a form component(  for example <EditProfileForm
          initialValues={userDetails}
        />) and the form will be populated with the values