const express = require("express"); // common JS modules
const mongoose = require("mongoose");
const cookieSession = require("cookie-session"); // slight difference from express-session
const passport = require("passport");
//const bodyParser = require("body-parser"); // middleware
const keys = require("./config/keys");
require("./models/User");
require("./models/Customer");

//require("./models/Survey");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

//app.use(bodyParser.json());
// three middlewares will be used before handlers

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/customerRestRoutes")(app);

// require("./routes/billingRoutes")(app);
// require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file or main.css profile
  app.use(express.static("client/build"));

  // Express will serve up the index.html profile
  // if it does not recognize the router
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.get("/", (req, res) => res.send({ response: "Get!!!", from: "Localhost" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
