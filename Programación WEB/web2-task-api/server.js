const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Request received');
  console.log("req: ", req);
  console.log("res: ", res);   
  res.end('Hello World!');
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
