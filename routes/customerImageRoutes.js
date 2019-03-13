const mongoose = require("mongoose");
const Image = mongoose.model("image");
const requireLogin = require("../middlewares/requireLogin");
const requireSamePhotoCreator = require("../middlewares/requireSamePhotoCreator");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();
const fs = require("fs");

module.exports = app => {
  app.post(
    "/api/customers/image",
    requireLogin,
    multipartMiddleware,
    async (req, res) => {
      const i = new Image();
      i.img.data = fs.readFileSync(req.files.file.path);
      i.img.contentType = req.files.file.type;
      const image = await i.save();
      res.send({ id: image._id });
    }
  );

  app.patch(
    "/api/customers/image/:imageId",
    requireLogin,
    //requireSamePhotoCreator,
    multipartMiddleware,
    async (req, res) => {
      const id = req.params.imageId;
      const image = await Image.findByIdAndUpdate(id, {
        img: {
          data: fs.readFileSync(req.files.file.path),
          contentType: req.files.file.type
        }
      });
      res.send({ id: image._id });
    }
  );

  app.get("/api/customers/image/:imageId", (req, res, next) => {
    const id = req.params.imageId;
    Image.findById(id, (err, doc) => {
      if (err) return next(err);
      if (doc == null) res.send(`image  of id ${id} not found`);
      else {
        res.contentType(doc.img.contentType);
        res.send(doc.img.data);
      }
    });
  });
};
