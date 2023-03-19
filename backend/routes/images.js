const express = require("express")
const router = express.Router()
const multer = require('multer')
const path = require("path");
var fs = require('fs');
const { uploadFile, getFileStream } = require('../s3')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    // Generate a unique filename with the originawl extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extension = file.originalname.split('.').pop()
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
  }
})

const upload = multer({ storage: storage });

router.use(express.static("images"));


router.get("/fetch", (req, res) => {
  var files = fs.readdirSync('images');
  return res.send({ files })
})

router.get("/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "images", imageName);
  res.sendFile(imagePath);
});

router.get('/images/:key', (req,res) => {
  console.log("CAlledddd!")
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)

})

router.post("/", upload.single('image'), async(req, res) => {
    const file = req.file
    console.log(file)
    const uploadResult = await uploadFile(file)
    console.log(uploadResult)
    return res.send({imagePath: `/images/${uploadResult.Key}`})
})


module.exports = router