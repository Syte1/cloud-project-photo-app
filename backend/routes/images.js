const express = require("express")
const router = express.Router()
const multer = require('multer')
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    // Generate a unique filename with the original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extension = file.originalname.split('.').pop()
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
  }
})

const upload = multer({ storage: storage });

router.use(express.static("images"));

router.get("/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "images", imageName);
  res.sendFile(imagePath);
});

router.post("/", upload.single('image'), (req, res) => {
    return res.send(JSON.stringify(req.file))
})

module.exports = router