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
                    route: "/undefined",
                    key: "/undefined",
                    label: "Posts",
                }),
            ]),
        );
    });

    it("returns dashboard if hasDashboard from RefineContext is true", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
                refineProvider: {
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
                    route: "/undefined",
                    key: "/undefined",
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

    it("doesnt return dashboard if hasDashboard from RefineContext is false", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                refineProvider: {
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

    it("should show label correctly", async () => {
        const i18nProvider = {
            translate: (key: string) => {
                const translations: Record<string, string> = {
                    "posts.posts": "Dummy Label",
                    "users.users": "Dummy Label",
                };

                return translations[key];
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            changeLocale: async () => {},
            getLocale: () => "en",
        };

        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                i18nProvider,
                refineProvider: {
                    mutationMode: "pessimistic",
                    warnWhenUnsavedChanges: false,
                    syncWithLocation: false,
                    undoableTimeout: 20000,
                    hasDashboard: false,
                },
                resources: [
                    { name: "posts" },
                    { name: "categories", label: "categories label text" },
                    { name: "users", label: "users label text" },
                ],
            }),
        });

        expect(result.current.menuItems).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "posts",
                    route: "/undefined",
                    key: "/undefined",
                    label: "Dummy Label",
                }),
                expect.objectContaining({
                    name: "categories",
                    route: "/undefined",
                    key: "/undefined",
                    label: "categories label text",
                }),
                expect.objectContaining({
                    name: "users",
                    route: "/undefined",
                    key: "/undefined",
                    label: "users label text",
                }),
            ]),
        );
    });
});
