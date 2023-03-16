import { Task } from "./task";
import { Logger } from "./logger";
import { NoopLogger } from "./logger/noop-logger";

export class Runner<T = undefined> {
  private cache = new Map<Task<T>, Promise<void>>();

  constructor(private context: T, private logger: Logger<T> = new NoopLogger<T>()) {}

  async runTasks(...tasks: Task<T>[]): Promise<T> {
    const results = await Promise.allSettled(
      tasks.map((task) => {
        const cached = this.cache.get(task);
        if (cached) {
          return cached;
        }

        const promise = this.runTask(task);
        this.cache.set(task, promise);
        return promise;
      })
    );
    for (const result of results) {
      if (result.status === "rejected") {
        throw new Error(result.reason);
      }
    }
    return this.context;
  }

  private async runTask(task: Task<T>): Promise<void> {
    const { dependencies, run } = task.options;

    if (dependencies) {
      await this.runTasks(...dependencies);
    }

    if (!run) {
      return;
    }

    try {
      this.logger.onTaskStart(task);
      await run(this.context);
      this.logger.onTaskEnd(task);
    } catch (e: unknown) {
      this.logger.onTaskError(task, e);
      throw e;
    }
  }
}
