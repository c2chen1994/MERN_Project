const mongoose = require("mongoose");
const Customer = mongoose.model("customer");

module.exports = async (req, res, next) => {
  const customer = await Customer.findById(req.params.customerId);
  //console.log(req.user._id == customer.userId, req.user._id === customer.userId);
  if (req.user._id != customer.userId) {
    return res.status(401).send({
      error: "This customer is not created by you, you can not operate it!"
    });
  }

  if (customer.imageId != req.params.imageId) {
    return res.status(401).send({
      error:
        "This Picture does not belong to the customer, you can not operate it!"
    });
  }

  next();
};
