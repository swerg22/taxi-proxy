const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Проксируем запросы с /api на целевой сервер
app.use('/api', createProxyMiddleware({
  target: 'http://sputnik.taxomet.ru',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',  // Удаляем /api из пути
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxy request: ${req.method} ${req.path}`);
  }
}));

// Маршрут для проверки работы
app.get('/', (req, res) => {
  res.send('Taxi Proxy is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
