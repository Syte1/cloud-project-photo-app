const http2 = require('http2');
const fs = require('fs');
const ocsp = require('ocsp');
const path = require('path');

const options = {
  key: fs.readFileSync('/etc/apache2/ssl/privkey.pem'),
  cert: fs.readFileSync('/etc/apache2/ssl/fullchain.pem'),
  ca: fs.readFileSync('/etc/apache2/ssl/chain.pem'),
  requestCert: false,
  rejectUnauthorized: false,
};

const server = http2.createSecureServer(options);

ocsp.getOCSPURI(options.cert, function (err, uri) {
  if (err) throw err;

  ocsp.request(
    {
      cert: options.cert,
      issuer: options.ca,
    },
    function (err, data) {
      if (err) throw err;

      options.ocsp = data;
    }
  );
});

server.on('request', (req, res) => {
  const filePath = path.join(__dirname, 'build', req.url === '/' ? 'index.html' : req.url);
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.end(content);
  });
});

const PORT = 443;

server.listen(PORT, () => {
  console.log(`HTTPS server listening on port ${PORT}`);
});