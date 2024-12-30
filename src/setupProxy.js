const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/examapi', // This is the path prefix to match
    createProxyMiddleware({
      target: 'https://edukota.techinbox.in', // Replace with your PHP server URL
      changeOrigin: true,
    })
  );
};
