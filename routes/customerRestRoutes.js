const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Customer = mongoose.model("customer");
const requireLogin = require("../middlewares/requireLogin");
const requireSameUser = require("../middlewares/requireSameUser");

module.exports = app => {
  app.get("/api/customers/:customerId", async (req, res) => {
    const customer = await Customer.findById(req.params.customerId);
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

  // app.put(
  //   "/api/customers",
  //   requireLogin,
  //   bodyParser.json(),
  //   async (req, res) => {
  //     const customer = await Customer.findByIdAndUpdate(req.body.id, {
  //       ...req.body
  //     });
  //     res.send(customer);
  //   }
  // );

  app.patch(
    "/api/customers/:customerId",
    requireLogin,
    requireSameUser,
    bodyParser.json(),
    async (req, res) => {
      const customer = await Customer.findByIdAndUpdate(req.params.customerId, {
        ...req.body
      });
      res.send(customer);
    }
  );

  app.delete(
    "/api/customers/:customerId",
    requireLogin,
    requireSameUser,
    async (req, res) => {
      const customer = await Customer.findById(req.params.customerId);
      customer.remove();
      res.send(customer);
    }
  );
};
