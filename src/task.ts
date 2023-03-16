export type TaskOptions<T> = {
  /**
   * The name of the task.
   */
  name: string;

  /**
   * The description of the task.
   */
  description?: string;

  /**
   * A list of tasks that must have been run to completion before
   * this task can execute.
   */
  dependencies?: readonly Task<T>[];

  /**
   * A function to execute when this task is run. If this function
   * returns a promise, the task will not be marked as finished until
   * that promise resolves.
   */
  run?: ((context: T) => void) | ((context: T) => PromiseLike<void>);

  /**
   * Object that gets passed through tasks.
   */
  context?: T;
};

export class Task<T = undefined> {
  static create<T>(options: TaskOptions<T>): Task<T> {
    return new Task(options);
  }

  constructor(public options: TaskOptions<T>) {
    if (typeof options.name !== "string") {
      throw new TypeError("Task name is not a string.");
    }

    if (typeof options.description !== "string" && options.description !== undefined) {
      throw new TypeError("Task description is not a string or undefined.");
    }

    if (!Array.isArray(options.dependencies) && options.dependencies !== undefined) {
      throw new TypeError("Task dependencies is not an array or undefined.");
    }
    if (options.dependencies) {
      for (const dependency of options.dependencies) {
        if (!(dependency instanceof Task)) {
          throw new TypeError("Task dependency is not a task.");
        }
      }
    }

    if (typeof options.run !== "function" && options.run !== undefined) {
      throw new TypeError("Task run is not a function or undefined.");
    }

    if (!options.name) {
      throw new Error("Task name must not be empty.");
    }
    if (!options.dependencies?.length && !options.run) {
      throw new Error("Task must have a run function or dependencies.");
    }
  }
}
