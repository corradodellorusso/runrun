import { Task } from "../task";

export interface Logger<T> {
  onTaskStart(task: Task<T>): void;
  onTaskEnd(task: Task<T>): void;
  onTaskError(task: Task<T>, error: unknown): void;
}
