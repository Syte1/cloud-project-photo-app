const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs');
const https = require('https');
const privateKey  = fs.readFileSync('/etc/apache2/ssl/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/apache2/ssl/fullchain.pem', 'utf8');

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    if (req.secure) {
      next();
    } else {
      res.redirect(`https://${req.headers.host}${req.url}`);
    }
  });
  
app.use(cors())

app.get('/', (req, res) => {
    res.send("test")
})

const imageRouter = require("./routes/images")
const postRouter = require("./routes/posts")
const verifyRouter = require("./routes/verify")
app.use("/images", imageRouter)
app.use("/posts", postRouter)
app.use("/verify", verifyRouter)

const tlsOptions = {
  secureProtocol: 'TLSv1_2_method',
  key: privateKey,
  cert: certificate,
  ciphers: [
    'ECDHE-RSA-AES128-GCM-SHA256',
    'ECDHE-ECDSA-AES128-GCM-SHA256',
    'ECDHE-RSA-AES256-GCM-SHA384',
    'ECDHE-ECDSA-AES256-GCM-SHA384',
    'DHE-RSA-AES128-GCM-SHA256',
    'ECDHE-RSA-AES128-SHA256',
    'DHE-RSA-AES128-SHA256',
    'ECDHE-RSA-AES256-SHA384',
    'DHE-RSA-AES256-SHA384',
    'ECDHE-RSA-AES256-SHA256',
    'DHE-RSA-AES256-SHA256',
    'HIGH',
    '!aNULL',
    '!eNULL',
    '!EXPORT',
    '!DES',
    '!RC4',
    '!MD5',
    '!PSK',
    '!SRP',
    '!CAMELLIA'
  ].join(':'),
  honorCipherOrder: true
};

const httpsServer = https.createServer(tlsOptions, app);
httpsServer.listen(3001);