import { hasPermission } from ".";

describe("hasPermission", () => {
    it("should return true if permissions includes the action", () => {
        expect(hasPermission(["create", "edit"], "create")).toBeTruthy();
    });

    it("should return true if permissions includes *", () => {
        expect(hasPermission(["*"], "create")).toBeTruthy();
    });

    it("should return false if permissions not includes the action", () => {
        expect(hasPermission(["edit", "show"], "create")).toBeFalsy();
    });
});
