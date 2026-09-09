const http = require('http');

const server = http.createServer((req, res) => {
  const options = {
    hostname: '127.0.0.1',
    port: 3000,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: req.headers.host || 'localhost:3000' },
  };

  const proxy = http.request(options, (targetRes) => {
    res.writeHead(targetRes.statusCode, targetRes.headers);
    targetRes.pipe(res, { end: true });
  });

  req.pipe(proxy, { end: true });

  proxy.on('error', (err) => {
    res.writeHead(502);
    res.end('Dev server starting up, please wait a moment...');
  });
});

server.on('upgrade', (req, socket, head) => {
  const proxyReq = http.request({
    hostname: '127.0.0.1',
    port: 3000,
    path: req.url,
    method: req.method,
    headers: req.headers,
  });

  proxyReq.on('upgrade', (proxyRes, proxySocket, proxyHead) => {
    const rawHeaders = Object.keys(proxyRes.headers)
      .map((k) => `${k}: ${proxyRes.headers[k]}`)
      .join('\r\n');

    socket.write(`HTTP/1.1 101 Switching Protocols\r\n${rawHeaders}\r\n\r\n`);
    if (proxyHead && proxyHead.length) {
      socket.write(proxyHead);
    }
    proxySocket.pipe(socket);
    socket.pipe(proxySocket);
  });

  proxyReq.on('error', () => socket.destroy());
  proxyReq.end();
});

server.listen(3001, '0.0.0.0', () => {
  console.log('Reverse proxy active: localhost:3001 -> localhost:3000');
});
