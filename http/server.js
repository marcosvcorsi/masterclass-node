const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const file = req.url === '/' ? 'index.html' : req.url;
  const filePath = path.join(__dirname, 'public', file);
  const extName = path.extname(filePath);

  const allowedFileType = ['.html', '.css', '.js'];
  const allowed = allowedFileType.find((item) => item === extName);

  if (!allowed) return;

  fs.readFile(filePath, (err, content) => {
    if (err) throw err;

    res.end(content);
  });

  //   if (req.url === '/') {
  //     fs.readFile(
  //       path.join(__dirname, 'public', 'index.html'),
  //       (err, content) => {
  //         if (err) throw err;

  //         res.end(content);
  //       }
  //     );
  //   }
});

server.listen(3000, () => console.log('Server is running!'));
