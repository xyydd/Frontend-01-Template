const http = require('http');
var fs = require('fs');

const server = http.createServer((request, response) => {
  let body = []
  request.on('error', err => {
    console.error(err);
  }).on('data', chunk => {
    // console.log('chunk', chunk)
    body.push(chunk);
  }).on('end', () => {
    // fs.readFile('view/index.html', (err, data) => {
    //   console.log(data)
    //   if (!err) {
    body = Buffer.concat(body).toString();
    console.log('body:', body)
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(`<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>parser</title>
</head>
<body>
  <h1>hello nathan</h1>
</body>
</html>`);
      // }
    // })
  });
});

const hostname = '127.0.0.1';
const port = 3000;

server.listen(port, hostname, () => {
    console.log(`Server running at http: //${hostname}:${port}/`);
});