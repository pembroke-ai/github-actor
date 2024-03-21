const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const PORT = process.env.PORT || 3000;
const API_SERVICE_URL = 'https://example.com';

app.use('/api', createProxyMiddleware({
  target: API_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    [`^/api`]: '',
  },
}));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
