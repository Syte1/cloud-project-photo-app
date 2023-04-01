const express = require("express")
const router = express.Router()
const multer = require('multer')
const path = require("path");
var fs = require('fs');
const { uploadFile } = require('../s3');
const { stdout } = require("process");

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.use(express.static("images"));


router.get("/fetch", (req, res) => {
  var files = fs.readdirSync('images');
  return res.send({ files })
})

router.post("/", upload.single('image'), async (req, res) => {
  const file = req.file;
  const uploadResult = await uploadFile(file);
  return res.send({ imagePath: `${uploadResult.Location}` });
});


module.exports = router