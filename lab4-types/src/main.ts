import { User, Accident } from "./models";
import { toUserResponse, toAccidentResponse, paginate } from "./mappers";
import { parseAccident } from "./api";

console.log("--- Запуск тестов Lab 4 ---\n");

// 1. Тест Mappers (преобразователи)
const testUser: User = {
  id: 1,
  email: "inspector@road.kg",
  passwordHash: "super_secret_hash",
  role: "INSPECTOR",
  createdAt: "2026-11-09T10:00:00Z"
};

console.log("1. Маппинг пользователя (должен скрыть пароль):");
const userResponse = toUserResponse(testUser);
console.log(userResponse);
console.log("Есть ли пароль в ответе?", "passwordHash" in userResponse, "\n");

// 2. Тест Дженериков (пагинация)
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("2. Тест пагинации (страница 1, по 3 элемента):");
console.log(paginate(numbers, 1, 3));
console.log("\n");

// 3. Тест Type Guards и безопасного парсинга (Задание 4)
// Подготовим 5 JSON-строк по методичке

// Строка 1: Корректная
const jsonValid = JSON.stringify({
  id: 1, location: "Бишкек", date: "2026-11-09", type: "COLLISION",
  severity: 3, status: "OPEN", inspectorId: 10, vehicles: [], createdAt: "2026-11-09"
});

// Строка 2: Неверный тип поля (severity - строка вместо числа)
const jsonWrongType = JSON.stringify({
  id: 1, location: "Бишкек", date: "2026-11-09", type: "COLLISION",
  severity: "три", status: "OPEN", inspectorId: 10, vehicles: [], createdAt: "2026-11-09"
});

// Строка 3: Недопустимое значение (type - "CRASH", которого нет в объединении)
const jsonInvalidType = JSON.stringify({
  id: 1, location: "Бишкек", date: "2026-11-09", type: "CRASH",
  severity: 3, status: "OPEN", inspectorId: 10, vehicles: [], createdAt: "2026-11-09"
});

// Строка 4: Отсутствует обязательное поле (нет location)
const jsonMissingField = JSON.stringify({
  id: 1, date: "2026-11-09", type: "COLLISION",
  severity: 3, status: "OPEN", inspectorId: 10, vehicles: [], createdAt: "2026-11-09"
});

// Строка 5: Синтаксически неверный JSON (забыли закрывающую скобку)
const jsonSyntaxError = `{"id": 1, "location": "Бишкек"`;

console.log("3. Тест безопасного парсинга (Type Guards):");
console.log("Валидный JSON:", parseAccident(jsonValid));
console.log("Неверный тип данных:", parseAccident(jsonWrongType));
console.log("Неверный литерал (CRASH):", parseAccident(jsonInvalidType));
console.log("Нет поля location:", parseAccident(jsonMissingField));
console.log("Синтаксическая ошибка:", parseAccident(jsonSyntaxError));

console.log("\n--- Тесты завершены ---");