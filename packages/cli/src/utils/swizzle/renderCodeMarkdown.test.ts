import { renderCodeMarkdown } from "./renderCodeMarkdown";

describe("renderCodeMarkdown", () => {
  it("should render boxed highlighted code without title", () => {
    const code = "const a = 1;";
    const result = renderCodeMarkdown(code);

    expect(result).toBeDefined();
    expect(result).toContain("const");
    expect(result).toContain("1");
  });

  it("should render boxed highlighted code with title extracted from comment", () => {
    const codeWithTitle =
      "// title: MyComponent.tsx\nconst App = () => <div />;";
    const result = renderCodeMarkdown(codeWithTitle);

    expect(result).toBeDefined();
    expect(result).toContain("MyComponent.tsx");
    expect(result).toContain("App");
    expect(result).toContain("div");
  });

  it("should fallback gracefully to raw code if highlighting throws on invalid syntax", () => {
    const invalidCode = "function invalid( {";
    const result = renderCodeMarkdown(invalidCode);

    expect(result).toBeDefined();
    expect(result).toContain("function invalid( {");
  });
});
