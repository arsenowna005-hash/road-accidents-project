const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Имитация базы данных (массив ДТП)
let accidents = [
  { 
    id: '1', 
    location: 'Бишкек, пр. Чуй', 
    date: '2026-10-20', 
    weather: 'Дождь', 
    roadCondition: 'Мокрое', 
    lighting: 'Искусственное', 
    type: 'Столкновение', 
    severity: 'Легкая' 
  },
  { 
    id: '2', 
    location: 'Бишкек, ул. Киевская', 
    date: '2026-10-21', 
    weather: 'Ясно', 
    roadCondition: 'Сухое', 
    lighting: 'Естественное', 
    type: 'Наезд на пешехода', 
    severity: 'Тяжелая' 
  }
];

// 1. GET /api/v1/accidents — получение списка всех ДТП (с фильтрацией по типу)
app.get('/api/v1/accidents', (req, res) => {
  const { type } = req.query;
  let result = [...accidents];

  if (type) {
    result = result.filter(a => a.type.toLowerCase() === type.toLowerCase());
  }

  res.status(200).json({ success: true, count: result.length, data: result });
});

// 2. GET /api/v1/accidents/:id — получение ДТП по ID
app.get('/api/v1/accidents/:id', (req, res) => {
  const accident = accidents.find(a => a.id === req.params.id);
  
  if (!accident) {
    return res.status(404).json({ 
      success: false, 
      error: { code: 'NOT_FOUND', message: `ДТП с ID ${req.params.id} не найдено` } 
    });
  }

  res.status(200).json({ success: true, data: accident });
});

// 3. POST /api/v1/accidents — создание нового ДТП
app.post('/api/v1/accidents', (req, res) => {
  const { location, date, weather, roadCondition, lighting, type, severity } = req.body;

  // Валидация
  if (!location || !date || !type) {
    return res.status(400).json({ 
      success: false, 
      error: { code: 'VALIDATION_ERROR', message: 'Поля location, date и type обязательны' } 
    });
  }

  const newAccident = {
    id: String(accidents.length + 1),
    location,
    date,
    weather: weather || 'Неизвестно',
    roadCondition: roadCondition || 'Неизвестно',
    lighting: lighting || 'Неизвестно',
    type,
    severity: severity || 'Неизвестно'
  };

  accidents.push(newAccident);
  res.status(201).json({ success: true, data: newAccident });
});

// 4. PUT /api/v1/accidents/:id — полное обновление ДТП
app.put('/api/v1/accidents/:id', (req, res) => {
  const index = accidents.findIndex(a => a.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ 
      success: false, 
      error: { code: 'NOT_FOUND', message: 'ДТП для обновления не найдено' } 
    });
  }

  const { location, date, weather, roadCondition, lighting, type, severity } = req.body;
  
  accidents[index] = { 
    id: req.params.id, 
    location, 
    date, 
    weather, 
    roadCondition, 
    lighting, 
    type, 
    severity 
  };

  res.status(200).json({ success: true, data: accidents[index] });
});

// 5. DELETE /api/v1/accidents/:id — удаление ДТП
app.delete('/api/v1/accidents/:id', (req, res) => {
  const index = accidents.findIndex(a => a.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ 
      success: false, 
      error: { code: 'NOT_FOUND', message: 'ДТП для удаления не найдено' } 
    });
  }

  accidents.splice(index, 1);
  res.status(204).send(); // 204 No Content
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Сервер ДТП (REST API) запущен на http://localhost:${PORT}`);
});