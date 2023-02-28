import { createTree } from "../create-tree";

describe("createTree", () => {
    it("should return an empty array if no resources are provided", () => {
        expect(createTree([])).toEqual([]);
    });

    it("should return a tree with a single resource", () => {
        const resources = [
            {
                name: "posts",
            },
        ];

        expect(createTree(resources)).toEqual([
            {
                name: "posts",
                key: "posts",
                children: [],
            },
        ]);
    });

    it("should return two items", () => {
        const resources = [
            {
                name: "posts",
            },
            {
                name: "comments",
            },
        ];

        expect(createTree(resources)).toEqual([
            {
                name: "posts",
                key: "posts",
                children: [],
            },
            {
                name: "comments",
                key: "comments",
                children: [],
            },
        ]);
    });

    it("should return nested items", () => {
        const resources = [
            {
                name: "posts",
            },
            {
                name: "categories",
            },
            {
                name: "comments",
                meta: { parent: "posts" },
            },
        ];

        expect(createTree(resources)).toEqual([
            {
                name: "posts",
                key: "posts",
                children: [
                    {
                        name: "comments",
                        key: "posts/comments",
                        meta: { parent: "posts" },
                        children: [],
                    },
                ],
            },
            {
                name: "categories",
                key: "categories",
                children: [],
            },
        ]);
    });

    it("should return double nested items", () => {
        const resources = [
            {
                name: "posts",
                meta: { parent: "cms" },
            },
            {
                name: "categories",
            },
            {
                name: "comments",
                meta: { parent: "posts" },
            },
        ];

        expect(createTree(resources)).toEqual([
            {
                name: "cms",
                key: "cms",
                children: [
                    {
                        name: "posts",
                        key: "cms/posts",
                        meta: { parent: "cms" },
                        children: [
                            {
                                name: "comments",
                                key: "cms/posts/comments",
                                meta: { parent: "posts" },
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                name: "categories",
                key: "categories",
                children: [],
            },
        ]);
    });
});
