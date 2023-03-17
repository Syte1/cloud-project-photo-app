const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
    console.log("Here")
    res.send("test")
})

const imageRouter = require("./routes/images")

app.use("/images", imageRouter)


app.listen(3001)
