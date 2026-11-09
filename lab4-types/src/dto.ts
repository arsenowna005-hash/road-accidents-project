import { Accident, User, Vehicle } from "./models";


// DTO для создания ДТП: убираем id, createdAt (их ставит сервер) и vehicles (машины добавляются отдельно)
export type CreateAccidentDto = Omit<Accident, "id" | "createdAt" | "vehicles">;

// DTO для обновления ДТП: все поля из CreateAccidentDto становятся необязательными
export type UpdateAccidentDto = Partial<CreateAccidentDto>;

// Ответ сервера для ДТП: скрываем inspectorId (это служебная информация)
export type AccidentResponse = Omit<Accident, "inspectorId">;

// Ответ сервера для Пользователя: убираем passwordHash (секретно!)
export type UserResponse = Omit<User, "passwordHash">;

// Дженерик для пагинации (страниц)
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

// Дженерик Result — для безопасной обработки ответов (успех или ошибка)
export type Result<T> = 
  | { ok: true; data: T } 
  | { ok: false; status: number; message: string };