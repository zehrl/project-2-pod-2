// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
const exphbs  = require('express-handlebars');
const dotenv = require('dotenv').config();

// Requiring passport as we've configured it
const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());

const apiRoutes = require("./routes/apiRoutes");
const authRoutes = require("./routes/authRoutes");
const hbsRoutes = require("./routes/hbsRoutes");

app.use(
  apiRoutes,
  authRoutes,
  hbsRoutes
);

// Setup server for handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});



