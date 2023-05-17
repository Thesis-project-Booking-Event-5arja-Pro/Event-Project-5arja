const express = require("express");
const router = express.Router();
const multer = require("multer");
const {uploadImage} = require("../controler/uploadImage");
const workerRouter = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uplDir = "uploads/";
    if (!fs.existsSync(uplDir)) {
      fs.mkdirSync(uplDir);
    }
    cb(null, uplDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }).single("profile-image");

workerRouter.post("/uploadFile", upload,uploadImage);

module.exports = router;
