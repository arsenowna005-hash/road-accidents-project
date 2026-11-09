import { Accident, User } from "./models";
import { AccidentResponse, UserResponse, Paginated } from "./dto";

// Явно перечисляем поля для ДТП (без inspectorId)
export function toAccidentResponse(accident: Accident): AccidentResponse {
  return {
    id: accident.id,
    location: accident.location,
    date: accident.date,
    type: accident.type,
    severity: accident.severity,
    status: accident.status,
    vehicles: accident.vehicles,
    createdAt: accident.createdAt,
    weather: accident.weather,
  };
}

// Явно перечисляем поля для Пользователя (без passwordHash)
export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

// Функция пагинации (нарезает массив на страницы)
export function paginate<T>(items: T[], page: number, limit: number): Paginated<T> {
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return {
    items: items.slice(start, end),
    total: items.length,
    page: page,
    limit: limit,
  };
}