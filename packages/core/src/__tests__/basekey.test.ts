import { describe, it, expect } from "vitest";
import type { BaseKey } from "../contexts/data/types";

describe("BaseKey type support", () => {
  it("should support string as BaseKey", () => {
    const id: BaseKey = "uuid-string-123";
    expect(typeof id).toBe("string");
  });

  it("should support number as BaseKey", () => {
    const id: BaseKey = 42;
    expect(typeof id).toBe("number");
  });

  it("should support number[] as BaseKey", () => {
    const id: BaseKey = [1, 2, 3];
    expect(Array.isArray(id)).toBe(true);
    expect(id).toEqual([1, 2, 3]);
  });

  it("should support UUID arrays from OpenAPI", () => {
    // Simulating OpenAPI-generated UUID type
    const compositeId: BaseKey = [16807, 29347, 45321];
    expect(Array.isArray(compositeId)).toBe(true);
  });
});
