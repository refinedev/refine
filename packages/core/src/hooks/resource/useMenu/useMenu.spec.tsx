import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useMenu } from "./";

describe("useMenu Hook", () => {
    it("returns resources", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        expect(result.current.resources).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: "posts" }),
            ]),
        );
    });

    it("returns menuItems", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        expect(result.current.menuItems).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "posts",
                    route: "/resources/undefined",
                    key: "/resources/undefined",
                    label: "Posts",
                }),
            ]),
        );
    });
});
