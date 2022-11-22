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
});
