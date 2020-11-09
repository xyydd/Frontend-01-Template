const http = require('http');
const unZippper = require('unzipper');

// 2.auth路由，接受code，用code + client_id + client_secret 换token
// 3.publish路由：用token获取用户信息，检查权限，接受发布

http.createServer(function (request, response) {
  request.pipe(unZippper.Extract({ path: '../server/public/' }))
  request.on('end', () => {
    response.end('Success')
  })
}).listen(8082);