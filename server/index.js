const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Подключаем middleware
app.use(express.json()); // Позволяет серверу принимать JSON
app.use(cors()); // Разрешает запросы с клиента (браузера)

// 1. Эндпоинт проверки статуса (Health Check)
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Сервер мониторинга ДТП работает',
    timestamp: new Date().toISOString()
  });
});

// 2. Эндпоинт с системной информацией
app.get('/api/v1/system-info', (req, res) => {
  res.status(200).json({
    nodeVersion: process.version,
    uptimeSeconds: Math.floor(process.uptime()),
    platform: process.platform
  });
});

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`✅ Сервер ДТП запущен на http://localhost:${PORT}`);
  console.log(`Проверка статуса: http://localhost:${PORT}/api/v1/health`);
});