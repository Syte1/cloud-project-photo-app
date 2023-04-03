const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('/etc/apache2/ssl/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/apache2/ssl/fullchain.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, app);

app.use(bodyParser.urlencoded({ extended: false }));


app.use(cors())
// band-aid solution for CORS
// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', ['*']);
//     next();
// });

app.get('/', (req, res) => {
    res.send("test")
})

const imageRouter = require("./routes/images")
const postRouter = require("./routes/posts")
const verifyRouter = require("./routes/verify")
app.use("/images", imageRouter)
app.use("/posts", postRouter)
app.use("/verify", verifyRouter)


httpsServer.listen(3001);

