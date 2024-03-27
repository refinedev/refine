import { mockLegacyRouterProvider, mockRouterProvider } from "@test/index";

import { checkRouterPropMisuse } from ".";

describe("checkRouterPropMisuse", () => {
  it("should return false when pass routerBindings", () => {
    expect(checkRouterPropMisuse(mockRouterProvider())).toBeFalsy();
  });

  it("should return true when pass legacyRouterProvider", () => {
    expect(checkRouterPropMisuse(mockLegacyRouterProvider())).toBeTruthy();
  });
});
