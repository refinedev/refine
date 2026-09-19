import { shouldDotAccess, accessor, dotAccessor, getAccessorKey } from ".";
import { stringLiteral } from "../string-literal";

describe("accessor", () => {
  it.each([
    "author's name",
    'a "quoted" label',
    "folder\\name",
    "line\nbreak",
    "日本語",
  ])("serializes field names and nested accessors as data %j", (key) => {
    const literal = stringLiteral(key);
    expect(accessor("record", key)).toBe(`record?.[${literal}]`);
    expect(accessor("record", "title", key)).toBe(
      `record?.title?.[${literal}]`,
    );
    expect(accessor("record", key, [key], false)).toBe(
      `record?.[${literal}]?.[${literal}]`,
    );
    expect(getAccessorKey({ key, type: "text" })).toBe(
      `accessorKey: ${literal}`,
    );
  });
  it("should return a string to access", () => {
    expect(accessor("myVar", "myKey", "myAccessor")).toBe(
      "myVar?.myKey?.myAccessor",
    );
  });
  it("should return a string to access with first accessor", () => {
    expect(
      accessor("myVar", "myKey", ["myAccessor1", "myAccessor2"], false),
    ).toBe("myVar?.myKey?.myAccessor1");
  });
  it("should combine accessors with joiner", () => {
    expect(accessor("myVar", "myKey", ["myAccessor1", "myAccessor2"])).toBe(
      `myVar?.myKey?.myAccessor1 + \" \" + myVar?.myKey?.myAccessor2`,
    );
  });
});

describe("dotAccessor", () => {
  it("should return a string to access", () => {
    expect(dotAccessor("myVar", "myKey", "myAccessor")).toBe(
      "myVar.myKey.myAccessor",
    );
  });
  it("should return a string to access with first accessor", () => {
    expect(dotAccessor("myVar", "myKey", ["myAccessor1", "myAccessor2"])).toBe(
      "myVar.myKey.myAccessor1",
    );
  });
});

describe("shouldDotAccess", () => {
  it("should return true for dot access", () => {
    expect(shouldDotAccess("myVar")).toBe(true);
  });
  it("should return false for bracket access", () => {
    expect(shouldDotAccess("my-var")).toBe(false);
  });
});
