import { API_URL } from "./config";
import type { Accident, AccidentInput, Result } from "./types";
// Базовая функция для запросов
async function request<T>(url: string, init?: RequestInit): Promise<Result<T>> {
  try {
    const res = await fetch(url, init);
    
    // Для DELETE запросов сервер возвращает 204 (без тела)
    if (res.status === 204) return { ok: true, data: {} as T };

    const body = await res.json();

    if (!res.ok) {
      return { ok: false, error: { status: res.status, message: body.error?.message || "Ошибка сервера" } };
    }

    return { ok: true, data: body.data }; // Наш сервер возвращает { success, data }
  } catch (error) {
    return { ok: false, error: { status: 0, message: "Нет связи с сервером" } };
  }
}

// Получить список ДТП
export function listAccidents(): Promise<Result<Accident[]>> {
  // Пока мы получаем все ДТП без пагинации на сервере, 
  // но интерфейс готов к ней.
  return request<Accident[]>(API_URL);
}

// Создать ДТП
export function createAccident(input: AccidentInput): Promise<Result<Accident>> {
  return request<Accident>(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

// Удалить ДТП
export function deleteAccident(id: number): Promise<Result<void>> {
  return request<void>(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}