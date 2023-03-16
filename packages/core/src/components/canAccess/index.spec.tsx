import React from "react";
import { render, TestWrapper } from "@test";

import { CanAccess } from ".";
import { act } from "react-dom/test-utils";

import * as RouterPicker from "../../contexts/router-picker";
import * as LegacyRouterContext from "../../hooks/legacy-router/useRouterContext";
import * as UseCanHook from "../../hooks/accessControl/useCan";
import * as UseParsedHook from "../../hooks/router/use-parsed";
import * as PickResource from "../../definitions/helpers/pick-resource";

describe("CanAccess Component", () => {
    it("should render children", async () => {
        const { container, findByText } = render(
            <CanAccess action="list" resource="posts">
                Accessible
            </CanAccess>,
            {
                wrapper: TestWrapper({
                    accessControlProvider: {
                        can: async ({ resource, action }) => {
                            if (action === "list" && resource === "posts") {
                                return {
                                    can: true,
                                };
                            }

                            return { can: false };
                        },
                    },
                }),
            },
        );

        expect(container).toBeTruthy();
        await findByText("Accessible");
    });

    it("should not render children", async () => {
        const { container, queryByText } = render(
            <CanAccess action="list" resource="posts">
                Accessible
            </CanAccess>,
            {
                wrapper: TestWrapper({
                    accessControlProvider: {
                        can: async () => ({
                            can: false,
                        }),
                    },
                }),
            },
        );

        await act(async () => {
            expect(container).toBeTruthy();
            expect(queryByText("Accessible")).not.toBeInTheDocument();
        });
    });

    it("should successfully pass the own attirbute to its children", async () => {
        const { container, findByText } = render(
            <CanAccess action="list" resource="posts" data-id="refine">
                <p>Accessible</p>
            </CanAccess>,
            {
                wrapper: TestWrapper({
                    accessControlProvider: {
                        can: async () => ({
                            can: true,
                        }),
                    },
                }),
            },
        );

        expect(container).toBeTruthy();

        const el = await findByText("Accessible");

        expect(el.closest("p")?.getAttribute("data-id"));
    });

    it("should fallback successfully render when not accessible", async () => {
        const { container, queryByText, findByText } = render(
            <CanAccess
                action="list"
                resource="posts"
                fallback={<p>Access Denied</p>}
            >
                <p>Accessible</p>
            </CanAccess>,
            {
                wrapper: TestWrapper({
                    accessControlProvider: {
                        can: async () => ({ can: false }),
                    },
                }),
            },
        );

        expect(container).toBeTruthy();

        expect(queryByText("Accessible")).not.toBeInTheDocument();
        await findByText("Access Denied");
    });

    describe("when no prop is passed", () => {
        it("should work", async () => {
            const useParsedSpy = jest.spyOn(UseParsedHook, "useParsed");

            useParsedSpy.mockImplementation(() => ({
                action: "list",
                id: undefined,
                resource: { name: "posts", list: "/posts" },
            }));

            const pickResourceSpy = jest.spyOn(PickResource, "pickResource");

            pickResourceSpy.mockImplementation(() => ({
                name: "posts",
            }));

            const useCanSpy = jest.spyOn(UseCanHook, "useCan");

            const { container, queryByText, findByText } = render(
                <CanAccess fallback={<p>Access Denied</p>}>
                    <p>Accessible</p>
                </CanAccess>,
                {
                    wrapper: TestWrapper({
                        accessControlProvider: {
                            can: async () => {
                                return { can: false };
                            },
                        },
                    }),
                },
            );

            expect(container).toBeTruthy();

            expect(useCanSpy).toHaveBeenCalledWith({
                resource: "posts",
                action: "list",
                params: {
                    id: undefined,
                    resource: {
                        list: "/posts",
                        name: "posts",
                    },
                },
            });

            expect(queryByText("Accessible")).not.toBeInTheDocument();

            await findByText("Access Denied");
        });

        test("when fallback is empty", async () => {
            const { container } = render(
                <CanAccess action="list" resource="posts">
                    Accessible
                </CanAccess>,
                {
                    wrapper: TestWrapper({
                        accessControlProvider: {
                            can: async () => {
                                return { can: false };
                            },
                        },
                    }),
                },
            );

            expect(container.nodeValue).toStrictEqual(null);
        });

        describe("When props not passed", () => {
            describe("When new router", () => {
                let routerPickerSpy: jest.SpyInstance<"legacy" | "new">;

                beforeAll(() => {
                    routerPickerSpy = jest.spyOn(RouterPicker, "useRouterType");

                    routerPickerSpy.mockImplementation(() => "new");
                });

                afterAll(() => {
                    routerPickerSpy.mockReset();
                });

                describe("when resource is an object", () => {
                    it("should deny access", async () => {
                        const useParsedSpy = jest.spyOn(
                            UseParsedHook,
                            "useParsed",
                        );

                        useParsedSpy.mockImplementation(() => ({
                            action: "list",
                            id: undefined,
                            resource: { name: "posts", list: "/posts" },
                        }));

                        const useCanSpy = jest.spyOn(UseCanHook, "useCan");

                        const { container, queryByText, findByText } = render(
                            <CanAccess fallback={<p>Access Denied</p>}>
                                <p>Accessible</p>
                            </CanAccess>,
                            {
                                wrapper: TestWrapper({
                                    accessControlProvider: {
                                        can: async () => {
                                            return { can: false };
                                        },
                                    },
                                }),
                            },
                        );

                        expect(container).toBeTruthy();

                        expect(useCanSpy).toHaveBeenCalledWith({
                            resource: "posts",
                            action: "list",
                            params: {
                                id: undefined,
                                resource: {
                                    name: "posts",
                                    list: "/posts",
                                },
                            },
                        });

                        expect(
                            queryByText("Accessible"),
                        ).not.toBeInTheDocument();

                        await findByText("Access Denied");
                    });
                });

                describe("when resource is a string", () => {
                    describe("when pick resource is object", () => {
                        it("should deny access", async () => {
                            const useParsedSpy = jest.spyOn<any, any>(
                                UseParsedHook,
                                "useParsed",
                            );

                            useParsedSpy.mockImplementation(() => ({
                                action: "list",
                                id: undefined,
                                resource: "posts",
                            }));

                            const useCanSpy = jest.spyOn(UseCanHook, "useCan");

                            const { container, queryByText, findByText } =
                                render(
                                    <CanAccess fallback={<p>Access Denied</p>}>
                                        <p>Accessible</p>
                                    </CanAccess>,
                                    {
                                        wrapper: TestWrapper({
                                            accessControlProvider: {
                                                can: async () => {
                                                    return { can: false };
                                                },
                                            },
                                        }),
                                    },
                                );

                            expect(container).toBeTruthy();

                            expect(useCanSpy).toHaveBeenCalledWith({
                                resource: "posts",
                                action: "list",
                                params: {
                                    id: undefined,
                                    resource: {
                                        name: "posts",
                                        list: "/posts",
                                    },
                                },
                            });

                            expect(
                                queryByText("Accessible"),
                            ).not.toBeInTheDocument();

                            await findByText("Access Denied");
                        });
                    });

                    describe("when pick resource is undefined", () => {
                        it("should work", async () => {
                            const useParsedSpy = jest.spyOn<any, any>(
                                UseParsedHook,
                                "useParsed",
                            );

                            useParsedSpy.mockImplementation(() => ({
                                action: "list",
                                id: undefined,
                                resource: "posts",
                            }));

                            const useCanSpy = jest.spyOn(UseCanHook, "useCan");

                            const pickSpy = jest.spyOn(
                                PickResource,
                                "pickResource",
                            );

                            pickSpy.mockImplementation(() => undefined);

                            const { container, queryByText, findByText } =
                                render(
                                    <CanAccess fallback={<p>Access Denied</p>}>
                                        <p>Accessible</p>
                                    </CanAccess>,
                                    {
                                        wrapper: TestWrapper({
                                            accessControlProvider: {
                                                can: async () => {
                                                    return { can: false };
                                                },
                                            },
                                        }),
                                    },
                                );

                            expect(container).toBeTruthy();

                            expect(useCanSpy).toHaveBeenCalledWith({
                                resource: "posts",
                                action: "list",
                                params: {
                                    id: undefined,
                                    resource: {
                                        name: "posts",
                                        list: "/posts",
                                    },
                                },
                            });

                            expect(
                                queryByText("Accessible"),
                            ).not.toBeInTheDocument();

                            await findByText("Access Denied");
                        });
                    });
                });
            });

            describe("when legacy router", () => {
                let routerPickerSpy: jest.SpyInstance<"legacy" | "new">;

                beforeAll(() => {
                    routerPickerSpy = jest.spyOn(RouterPicker, "useRouterType");

                    routerPickerSpy.mockImplementation(() => "legacy");
                });

                afterAll(() => {
                    routerPickerSpy.mockReset();
                });

                it("should deny access", async () => {
                    const useRouterContextSpy = jest.spyOn<any, any>(
                        LegacyRouterContext,
                        "useRouterContext",
                    );

                    useRouterContextSpy.mockImplementation(() => ({
                        useParams: () => ({
                            resource: "posts",
                            id: undefined,
                            action: "list",
                        }),
                    }));

                    const useCanSpy = jest.spyOn(UseCanHook, "useCan");

                    const { container, queryByText, findByText } = render(
                        <CanAccess fallback={<p>Access Denied</p>}>
                            <p>Accessible</p>
                        </CanAccess>,
                        {
                            wrapper: TestWrapper({
                                accessControlProvider: {
                                    can: async () => {
                                        return { can: false };
                                    },
                                },
                            }),
                        },
                    );

                    expect(container).toBeTruthy();

                    expect(useCanSpy).toHaveBeenCalledWith({
                        resource: "posts",
                        action: "list",
                        params: {
                            id: undefined,
                            resource: {
                                name: "posts",
                                list: "/posts",
                            },
                        },
                    });

                    expect(queryByText("Accessible")).not.toBeInTheDocument();

                    await findByText("Access Denied");
                });
            });
        });
    });
});
