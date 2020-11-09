const http = require('http');
const fs = require('fs');
const archiver = require('archiver');
const child_process = require('child_process')

// 1. 打开 http://github.com/login/oauth/authorize
child_process.exec(`open http://github.com/login/oauth/authorize?client_id=Iv1.7f4149bc9b822a02`)
// 4. 创建server，接受token，后点击发布

const request = http.request({
  hostname: '139.224.129.209',
  port: 8082,
  method: 'POST',
  headers: {
    'Content-Type': 'application/octet-stream'
  }
}, response => {
  console.log(response)
});

// const file = fs.createReadStream('./sample.html');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});
archive.directory('./sample/', false);

archive.finalize();

archive.pipe(request);

// file.pipe(request, {end: false})
// file.on('end', () => {
//   request.end()
// })


// file.on('data', chunk => {
//   console.log(chunk.toString())
//   request.write(chunk)
// })
// file.on('end', chunk => {
//   console.log('read finished')
//   request.end(chunk)
//   // request.end();
// })
