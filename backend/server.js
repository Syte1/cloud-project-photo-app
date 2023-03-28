const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));


app.use(cors())
// band-aid solution for CORS
// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', ['*']);
//     next();
// });

app.get('/', (req, res) => {
    console.log("Here")
    res.send("test")
})

const imageRouter = require("./routes/images")
const postRouter = require("./routes/posts")
app.use("/images", imageRouter)
app.use("/posts", postRouter)


app.listen(3001)
