const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Customer = mongoose.model("customer");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.get("/api/customers/:costomerId", async (req, res) => {
    const customer = await Customer.findById(req.params.costomerId);
    /*
    const student = await Student.find(
      { lastName: /Chen/i, age: { $gte: 24 } },
      "firstName lastName sex"
    );
    */
    res.send(customer);
  });

  app.get("/api/customers", async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
  });

  app.post(
    "/api/customers",
    requireLogin,
    bodyParser.json(),
    async (req, res) => {
      const customer = await new Customer({ ...req.body }).save();
      res.send(customer);
    }
  );

  app.put(
    "/api/customers",
    requireLogin,
    bodyParser.json(),
    async (req, res) => {
      const customer = await Customer.findByIdAndUpdate(req.body.id, {
        ...req.body
      });
      res.send(customer);
    }
  );

  app.patch(
    "/api/customers/:costomerId",
    requireLogin,
    bodyParser.json(),
    async (req, res) => {
      const customer = await Customer.findByIdAndUpdate(req.params.costomerId, {
        ...req.body
      });
      res.send(customer);
    }
  );

  app.delete("/api/customers/:costomerId", requireLogin, async (req, res) => {
    const customer = await Customer.findById(req.params.costomerId);
    customer.remove();
    res.send(customer);
  });
};
