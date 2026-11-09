import { Accident } from "./models";

export function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

export function isAccident(x: unknown): x is Accident {
  if (!isRecord(x)) return false;

  return (
    typeof x.id === "number" &&
    typeof x.location === "string" &&
    typeof x.date === "string" &&
    (x.type === "COLLISION" || x.type === "PEDESTRIAN" || x.type === "ROLLOVER") &&
    typeof x.severity === "number" &&
    (x.status === "OPEN" || x.status === "CLOSED" || x.status === "IN_PROGRESS") &&
    typeof x.inspectorId === "number" &&
    Array.isArray(x.vehicles) &&
    typeof x.createdAt === "string" &&
    (x.weather === undefined || typeof x.weather === "string")
  );
}