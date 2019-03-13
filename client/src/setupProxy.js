const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/auth/google", { target: "http://localhost:5000" }));
  app.use(proxy("/auth/github", { target: "http://localhost:5000" }));
  app.use(proxy("/auth/facebook", { target: "http://localhost:5000" }));
  app.use(proxy("/auth/linkedin", { target: "http://localhost:5000" }));
  app.use(proxy("/auth/twitter", { target: "http://localhost:5000" }));
  app.use(proxy("/api/*", { target: "http://localhost:5000" }));
  app.use(proxy("/api/customers/*", { target: "http://localhost:5000" }));
  app.use(proxy("/api/customers/image", { target: "http://localhost:5000" }));
};
