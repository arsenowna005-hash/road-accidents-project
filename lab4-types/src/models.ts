// Роли пользователей (инспектор или водитель)
export type Role = "INSPECTOR" | "DRIVER";

// Тип ДТП
export type AccidentType = "COLLISION" | "PEDESTRIAN" | "ROLLOVER";

// Статус дела
export type CaseStatus = "OPEN" | "CLOSED" | "IN_PROGRESS";

// Интерфейс Пользователя
export interface User {
  id: number;
  email: string;
  passwordHash: string; // Это поле мы потом скроем в DTO
  role: Role;
  createdAt: string;
}

// Интерфейс Автомобиля
export interface Vehicle {
  id: number;
  plateNumber: string;
  model: string;
  ownerId: number;
}

// Интерфейс ДТП
export interface Accident {
  id: number;
  location: string;
  date: string;
  type: AccidentType;
  severity: number;
  status: CaseStatus;
  inspectorId: number;
  vehicles: Vehicle[];
  readonly createdAt: string;
  weather?: string; // Необязательное поле
}