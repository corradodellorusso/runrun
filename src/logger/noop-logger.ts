import { Logger } from "./logger";
import { Task } from "../task";

export class NoopLogger<T> implements Logger<T> {
  onTaskEnd(task: Task<T>): void {
    // do nothing!
  }

  onTaskError(task: Task<T>, error: Error): void {
    // do nothing!
  }

  onTaskStart(task: Task<T>): void {
    // do nothing!
  }
}
