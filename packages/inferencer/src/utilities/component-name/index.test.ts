import { componentName } from ".";

describe("componentName", () => {
    it("should return `PostList`", () => {
        expect(componentName("posts", "list")).toBe("PostList");
    });
    it("should return `CategoryShow`", () => {
        expect(componentName("categories", "show")).toBe("CategoryShow");
    });
    it("should return UserEdit", () => {
        expect(componentName("user", "edit")).toBe("UserEdit");
    });
    it("should return Edit", () => {
        expect(componentName("12345", "edit")).toBe("ResourceEdit");
    });
    it("should return UserEdit", () => {
        expect(componentName("12345User", "edit")).toBe("UserEdit");
        expect(componentName("12345-User", "edit")).toBe("UserEdit");
    });
    it("should return UsersAccountEdit", () => {
        expect(componentName("user/account", "edit")).toBe("UserAccountEdit");
        expect(componentName("user-account", "edit")).toBe("UserAccountEdit");
        expect(componentName("user?.account", "edit")).toBe("UserAccountEdit");
    });
});
