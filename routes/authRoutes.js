const passport = require("passport");
//const CircularJSON = require("circular-json");
module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
      //res.send({ googleMessage: "You have logged in!" });
    }
  );

  // github
  app.get(
    "/auth/github",
    passport.authenticate("github", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/github/callback",
    passport.authenticate("github"),
    (req, res) => {
      res.redirect("/");
      //res.send({ githubMessage: "You have logged in!" });
    }
  );

  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
      res.redirect("/");
      //res.send({ facebookMessage: "You have logged in!!" });
    }
  );

  //app.get("/auth/linkedin", passport.authenticate("linkedin"));
  app.get(
    "/auth/linkedin",
    passport.authenticate("linkedin", { state: "SOME STATE" }),
    function(req, res) {
      // The request will be redirected to LinkedIn for authentication, so this
      // function will not be called.
    }
  );

  app.get(
    "/auth/linkedin/callback",
    passport.authenticate("linkedin"),
    (req, res) => {
      res.redirect("/");
      //res.send({ facebookMessage: "You have logged in!!" });
    }
  );

  app.get("/auth/twitter", passport.authenticate("twitter"));

  app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter"),
    (req, res) => {
      res.redirect("/");
      //res.send({ facebookMessage: "You have logged in!!" });
    }
  );

  // app.get("/auth/qq", passport.authenticate("qq"), function(req, res) {
  //   // The request will be redirected to qq for authentication, so this
  //   // function will not be called.
  // });

  // app.get("/auth/qq/callback", passport.authenticate("qq"), function(req, res) {
  //   // Successful authentication, redirect home.
  //   res.redirect("/");
  // });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
