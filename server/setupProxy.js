const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: 'ws://localhost:8080',
      changeOrigin: true,
      ws: true,
    })
  );
};