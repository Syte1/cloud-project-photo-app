const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { uploadFile } = require("../s3");
const { stdout } = require("process");
const { v4: uuidv4 } = require("uuid");
const { validateFileExtension } = require("../utils/fileValidation"); // Add this line

const multerErrorHandling = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).send({ error: "Multer error occurred when uploading." });
  } else if (err) {
    res.status(400).send({ error: err.message });
  } else {
    next();
  }
};

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => { // Add this fileFilter configuration
    if (validateFileExtension(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."));
    }
  },
});

router.use(express.static("images"));

router.get("/fetch", (req, res) => {
  var files = fs.readdirSync("images");
  return res.send({ files });
});

router.post("/", upload.single("image"), multerErrorHandling, async (req, res) => {
  const file = req.file;
  const randomID = uuidv4();
  const uploadResult = await uploadFile(file, randomID);
  return res.send({ imagePath: uploadResult.Location });
});

module.exports = router;