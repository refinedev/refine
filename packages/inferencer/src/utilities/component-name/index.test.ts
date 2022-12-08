import { componentName } from ".";

describe("componentName", () => {
    it("should turn `posts,list` into `PostList`", () => {
        expect(componentName("posts", "list")).toBe("PostList");
    });
    it("should turn `categories,show` into `CategoryShow`", () => {
        expect(componentName("categories", "show")).toBe("CategoryShow");
    });
    it("should turn `user,edit` into `UserEdit`", () => {
        expect(componentName("user", "edit")).toBe("UserEdit");
    });
    it("should turn `12345,edit` into `Edit12345`", () => {
        expect(componentName("12345", "edit")).toBe("Edit12345");
    });
    it("should turn `12345User,edit` into `Edit12345User`", () => {
        expect(componentName("12345User", "edit")).toBe("Edit12345User");
        expect(componentName("12345-User", "edit")).toBe("Edit12345User");
    });
    it("should turn `user/account` into `UserAccountEdit`", () => {
        expect(componentName("user/account", "edit")).toBe("UserAccountEdit");
        expect(componentName("user-account", "edit")).toBe("UserAccountEdit");
        expect(componentName("user?.account", "edit")).toBe("UserAccountEdit");
    });
});
