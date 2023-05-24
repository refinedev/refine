import { generateDefaultDocumentTitle } from ".";

const translateMock = jest.fn(
    (key: string, options?: any, defaultMessage?: string | undefined) => {
        return defaultMessage ?? options;
    },
);

describe("generateDocumentTitle", () => {
    beforeEach(() => {
        translateMock.mockClear();
    });

    it("should return `resource name` when action is `list`", () => {
        expect(
            generateDefaultDocumentTitle(
                translateMock,
                { name: "posts" },
                "list",
            ),
        ).toBe("Posts | refine");
    });

    it("should return `Create new resource name` when action is `create`", () => {
        expect(
            generateDefaultDocumentTitle(
                translateMock,
                { name: "posts" },
                "create",
            ),
        ).toBe("Create new Post | refine");
    });

    it("should return `#id Edit resource name` when action is `edit`", () => {
        expect(
            generateDefaultDocumentTitle(
                translateMock,
                { name: "posts" },
                "edit",
                "1",
            ),
        ).toBe("#1 Edit Post | refine");
    });

    it("should return `#id Show resource name` when action is `show`", () => {
        expect(
            generateDefaultDocumentTitle(
                translateMock,
                { name: "posts" },
                "show",
                "1",
            ),
        ).toBe("#1 Show Post | refine");
    });

    it("should pass `id` to `translate` function", () => {
        generateDefaultDocumentTitle(
            translateMock,
            { name: "posts" },
            "show",
            "1",
        ),
            expect(translateMock).toHaveBeenCalledWith(
                "documentTitle.posts.show",
                { id: "1" },
                "#1 Show Post | refine",
            );
    });
});
