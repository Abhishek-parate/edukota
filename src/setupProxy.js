const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/edukotaapi', // This is the path prefix to match
    createProxyMiddleware({
      target: 'http://localhost', // Replace with your PHP server URL
      changeOrigin: true,
    })
  );
};
