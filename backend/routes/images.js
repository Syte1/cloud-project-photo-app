const express = require("express")
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/images')
  },
  filename: function (req, file, cb) {
    // Generate a unique filename with the original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extension = file.originalname.split('.').pop()
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
  }
})

const upload = multer({ storage: storage });


router.get("/",  (req, res) => {
    res.send("images")
})

router.post("/", upload.single('image'), (req, res) => {
    return res.send(req.file.filename)
})

module.exports = router