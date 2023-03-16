import { beforeEach, describe, expect, test, vitest } from "vitest";
import { Task } from "../task";
import { Runner } from "../runner";

const simple = new Task({ name: "simple", run: vitest.fn() });
const rejecting = new Task({ name: "rejecting", run: () => Promise.reject("reject") });
const withDependencies = new Task({ name: "withDependencies", run: vitest.fn(), dependencies: [simple] });
const onlyDependencies = new Task({ name: "withDependencies", dependencies: [simple] });
describe("runner", () => {
  beforeEach(() => {
    vitest.resetAllMocks();
  });

  test("should run a task", async () => {
    const runner = new Runner(undefined);
    await runner.runTasks(simple);
    expect(simple.options.run).toHaveBeenCalledOnce();
  });

  test("should cache tasks", async () => {
    const runner = new Runner(undefined);
    await runner.runTasks(simple, simple, simple);
    expect(simple.options.run).toHaveBeenCalledOnce();
  });

  test("should throw on rejecting promise", () => {
    const runner = new Runner(undefined);
    expect(() => runner.runTasks(simple, rejecting)).rejects.toThrowError("reject");
  });

  test("should run dependencies and run fn", async () => {
    const runner = new Runner(undefined);
    await runner.runTasks(withDependencies);
    expect(simple.options.run).toHaveBeenCalledOnce();
    expect(withDependencies.options.run).toHaveBeenCalledOnce();
  });

  test("should run dependencies ", async () => {
    const runner = new Runner(undefined);
    await runner.runTasks(onlyDependencies);
    expect(simple.options.run).toHaveBeenCalledOnce();
  });
});
