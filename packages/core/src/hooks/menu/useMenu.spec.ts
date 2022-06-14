import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";

import { TestWrapper } from "@test";

import { useMenu } from ".";

describe("useMenu Hook", () => {
    it("should be empty by default", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({}),
        });

        expect(result.current.menuItems).toEqual([]);
    });

    it("should contain one item with label `Posts`", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                resources: [
                    {
                        name: "posts",
                        key: "posts",
                        label: "Posts",
                    },
                ],
            }),
        });

        expect(result.current.menuItems).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ label: "Posts" }),
            ]),
        );
    });

    it("should have the selectedKey = `/posts/create`", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                routerInitialEntries: ["/posts/create"],
            }),
        });

        expect(result.current.selectedKey).toEqual("/posts/create");
    });

    it("should have the defaultOpenKeys = [posts, create]", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                routerInitialEntries: ["/posts/create"],
            }),
        });

        expect(result.current.defaultOpenKeys).toEqual(
            expect.arrayContaining(["posts", "create"]),
        );
    });
});
