import { describe, expect, test } from "vitest";
import { Task } from "../task";

describe("task", () => {
  test("should fail if name is not a string", () => {
    const options: any = { name: 1 };
    expect(() => new Task(options)).toThrowError("Task name is not a string.");
  });
  test("should fail if name is empty", () => {
    const options: any = { name: "" };
    expect(() => new Task(options)).toThrowError("Task name must not be empty.");
  });
  test("should fail if description is not a string", () => {
    const options: any = { name: "name", description: 1 };
    expect(() => new Task(options)).toThrowError("Task description is not a string or undefined.");
  });
  test("should fail if dependencies is not an array", () => {
    const options: any = { name: "name", description: "description", dependencies: {} };
    expect(() => new Task(options)).toThrowError("Task dependencies is not an array or undefined.");
  });
  test("should fail if dependencies are not tasks", () => {
    const options: any = { name: "name", description: "description", dependencies: [{}] };
    expect(() => new Task(options)).toThrowError("Task dependency is not a task.");
  });
  test("should fail if run is not a function", () => {
    const options: any = { name: "name", description: "description", run: "run" };
    expect(() => new Task(options)).toThrowError("Task run is not a function or undefined.");
  });
  test("should fail if no run and dependencies", () => {
    const options: any = { name: "name", description: "description" };
    expect(() => new Task(options)).toThrowError("Task must have a run function or dependencies.");
  });
});
