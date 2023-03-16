# @runrun/core

🚀 A simple task executor

---

```typescript
const context: Context = {
  /*...*/
}; // Whatever you want to provide to your tasks!

const bendSpoon = new Task<Context>({
  name: "bending-spoon",
  run: (context: Context) => {
    /*...*/
  },
});

const spinTheWheel = new Task<Context>({
  name: "spin-the-wheel",
  run: async (context: Context) => {
    /*...*/
  },
});

const doTheMagic = new Task<Context>({
  name: "do-the-magic",
  dependencies: [bendSpoon, spinTheWheel],
});

const runner = new Runner(context);
await runner.runTasks(doTheMagic);
```
