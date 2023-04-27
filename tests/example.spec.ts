import { test, expect } from "@playwright/test";
import { z } from "zod";

class MyError extends Error {
  #issues: string[] = [];
  constructor(message: string) {
    super();
    this.name = "MyError";
    this.#issues.push(message);
  }

  get message() {
    return this.#issues.join("\n");
  }
}

test("Error", async () => {
  // Error: Error message
  throw new Error("Error message");

  // TypeError: Cannot set property message of Error which has only a getter
  throw new MyError("Error message");

  z.object({
    name: z.string(),
  })
    // TypeError: Cannot set property message of [object Object] which has only a getter
    .parse({
      // throws ZodError with only message getter
      name: undefined,
    });
});
