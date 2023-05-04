import { generateDefaultDocumentTitle } from ".";

describe("generateDocumentTitle", () => {
    it("should return `resource name` when action is `list`", () => {
        expect(generateDefaultDocumentTitle({ name: "posts" }, "list")).toBe(
            "Posts | Refine",
        );
    });

    it("should return `Create new resource name` when action is `create`", () => {
        expect(generateDefaultDocumentTitle({ name: "posts" }, "create")).toBe(
            "Create new Post | Refine",
        );
    });

    it("should return `#id Edit resource name` when action is `edit`", () => {
        expect(
            generateDefaultDocumentTitle({ name: "posts" }, "edit", "1"),
        ).toBe("#1 Edit Post | Refine");
    });

    it("should return `#id Show resource name` when action is `show`", () => {
        expect(
            generateDefaultDocumentTitle({ name: "posts" }, "show", "1"),
        ).toBe("#1 Show Post | Refine");
    });
});
