export type AccidentType = "COLLISION" | "PEDESTRIAN" | "ROLLOVER";
export type CaseStatus = "OPEN" | "CLOSED" | "IN_PROGRESS";

export interface Accident {
  id: number;
  location: string;
  date: string;
  type: AccidentType;
  severity: number;
  status: CaseStatus;
  weather?: string;
  inspectorId: number;
  vehicles: any[]; // Пока упростим, чтобы не усложнять код
  readonly createdAt: string;
}

// Тип для формы (без id и createdAt)
export type AccidentInput = Omit<Accident, "id" | "createdAt" | "inspectorId" | "vehicles">;

// Пагинация (дженерик)
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

// Результат запроса
export type Result<T> = 
  | { ok: true; data: T } 
  | { ok: false; error: { status: number; message: string } };