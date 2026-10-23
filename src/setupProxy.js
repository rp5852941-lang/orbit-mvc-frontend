// Optional CRA proxy: set REACT_APP_API_URL=/api in frontend/.env to use it.
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function setupProxy(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost",
      changeOrigin: true,
      pathRewrite: { "^/api": "/orbit-api/api" },
    })
  );
};
