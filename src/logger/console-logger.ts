import { Logger } from "./logger";
import { Task } from "../task";

export class ConsoleLogger implements Logger<any> {
  private tasks = new WeakMap<Task<unknown>, number>();
  onTaskEnd(task: Task<any>): void {
    const begin = this.tasks.get(task);
    const date = new Date().toISOString();
    const time = Date.now() - begin!;
    console.log(`[${date}]`, `Task ${task.options.name} completed in ${time}ms.`);
  }

  onTaskError(task: Task<any>, error: unknown): void {
    const begin = this.tasks.get(task);
    const date = new Date().toISOString();
    const time = Date.now() - begin!;
    console.error(`[${date}]`, `Task ${task.options.name} errored after ${time}ms.`, error);
  }

  onTaskStart(task: Task<any>): void {
    const date = new Date().toISOString();
    console.log(`[${date}]`, `Starting task ${task.options.name}...`);
    this.tasks.set(task, Date.now());
  }
}
