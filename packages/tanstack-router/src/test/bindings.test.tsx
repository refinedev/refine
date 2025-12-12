import { routerBindings } from "../bindings";

describe("TanStack Router Bindings", () => {
  it("should export routerBindings object", () => {
    expect(routerBindings).toBeDefined();
    expect(typeof routerBindings).toBe("object");
  });

  it("should have go function factory", () => {
    expect(routerBindings.go).toBeDefined();
    expect(typeof routerBindings.go).toBe("function");
  });

  it("should have back function factory", () => {
    expect(routerBindings.back).toBeDefined();
    expect(typeof routerBindings.back).toBe("function");
  });

  it("should have parse function factory", () => {
    expect(routerBindings.parse).toBeDefined();
    expect(typeof routerBindings.parse).toBe("function");
  });

  it("should have Link component", () => {
    expect(routerBindings.Link).toBeDefined();
    expect(typeof routerBindings.Link).toBe("object");
  });
});
