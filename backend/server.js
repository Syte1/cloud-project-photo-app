const express = require('express')
const multer = require('multer')
const upload = multer({ des: "uploads/" })

const app = express()

app.get('/', (req, res) => {
    console.log("Here")
    res.send("test")
})

const imageRouter = require("./routes/images")

app.use("/images", imageRouter)


app.listen(3001)
