const http = require('http');
const fs = require('fs');
const url = require('url')

const hostname = '127.0.0.1';
const port = 8080;

const types = {
  '.html' : 'text/html',
  '.ico'  : 'image/x-icon',
  '.jpg'  : 'image/jpeg',
  '.png'  : 'image/png',
  '.gif'  : 'image/gif',
  '.css'  : 'text/css',
  '.js'   : 'text/javascript',
  '.mp4'  : 'video/mp4',
}

const server = http.createServer((req, res) => {
  fs.readFile('./' + req.url.substr(1), (err, data) => {
    if (err) {
      res.writeHead(404, "Not Found");
      res.end();
    } else {
      const dotoffset = req.url.lastIndexOf('.');
      const mimetype = dotoffset == -1 ? 'text/plain' : types[req.url.substr(dotoffset)];
      res.setHeader('Content-Type', mimetype);
      res.end(data);
      console.log( req.url, mimetype );
    }
  })
});

server.listen(port, hostname, () => {
  console.log(`Server listen at http://${hostname}:${port}/`)
});
