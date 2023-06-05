import { mockRouterBindings, mockLegacyRouterProvider } from "@test/index";
import { checkRouterPropMisuse } from ".";

describe("checkRouterPropMisuse", () => {
    it("should return false when pass routerBindings", () => {
        expect(checkRouterPropMisuse(mockRouterBindings())).toBeFalsy();
    });

    it("should return true when pass legacyRouterProvider", () => {
        expect(checkRouterPropMisuse(mockLegacyRouterProvider())).toBeTruthy();
    });
});
