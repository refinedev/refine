import { createTreeView } from ".";
import { IMenuItem, ITreeMenu } from "src/interfaces";

const mockLocation: IMenuItem[] = [
    {
        name: "posts",
        key: "1",
        route: "posts",
    },
    { name: "categories", key: "2", route: "categories" },
    { name: "active", key: "3", route: "posts/active", parentName: "posts" },
];
const expectedMockLocation: ITreeMenu[] = [
    {
        name: "posts",
        key: "1",
        route: "posts",
        children: [
            {
                name: "active",
                key: "3",
                route: "posts/active",
                parentName: "posts",
                children: [],
            },
        ],
    },
    { name: "categories", key: "2", route: "categories", children: [] },
];

describe("createTreeView", () => {
    const tree: ITreeMenu[] = createTreeView(mockLocation);
    it("should return an tree which has two member", async () => {
        expect(tree.length).toBe(2);
    });
    it("should be equal expectedMockLocation", async () => {
        expect(tree).toEqual(expectedMockLocation);
    });
});
