import { Accident } from "./models";
import { Result } from "./dto";
import { isAccident } from "./guards";

// Функция принимает строку JSON и возвращает либо данные (ok: true), либо ошибку (ok: false)
export function parseAccident(json: string): Result<Accident> {
  let data: unknown;

  // 1. Пытаемся распарсить JSON
  try {
    data = JSON.parse(json);
  } catch (error) {
    return { ok: false, status: 400, message: "Некорректный JSON" };
  }

  // 2. Проверяем, что это действительно ДТП
  if (!isAccident(data)) {
    return { ok: false, status: 422, message: "Данные не соответствуют формату ДТП" };
  }

  // 3. Все хорошо, возвращаем данные
  return { ok: true, data: data };
}