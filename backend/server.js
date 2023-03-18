const express = require('express')
const cors = require('cors')
const app = express()

// app.use(cors())
// band-aid solution for CORS
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    next();
});


app.get('/', (req, res) => {
    console.log("Here")
    res.send("test")
})

const imageRouter = require("./routes/images")

app.use("/images", imageRouter)


app.listen(3001)
