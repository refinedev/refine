import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useMenu } from "./";

describe("useMenu Hook", () => {
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

    it("returns dashboard if hasDashboard from AdminContext is true", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
                adminProvider: {
                    mutationMode: "pessimistic",
                    warnWhenUnsavedChanges: false,
                    syncWithLocation: false,
                    undoableTimeout: 20000,
                    hasDashboard: true,
                },
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
                expect.objectContaining({
                    name: "Dashboard",
                    route: `/`,
                    key: "dashboard",
                    label: "Dashboard",
                }),
            ]),
        );
    });

    it("doesnt return dashboard if hasDashboard from AdminContext is false", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                adminProvider: {
                    mutationMode: "pessimistic",
                    warnWhenUnsavedChanges: false,
                    syncWithLocation: false,
                    undoableTimeout: 20000,
                    hasDashboard: false,
                },
            }),
        });

        expect(result.current.menuItems).toEqual(
            expect.not.arrayContaining([
                expect.objectContaining({
                    name: "Dashboard",
                    route: `/`,
                    key: "dashboard",
                    label: "Dashboard",
                }),
            ]),
        );
    });
});
