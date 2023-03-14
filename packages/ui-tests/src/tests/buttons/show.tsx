import React from "react";
import {
    RefineShowButtonProps,
    RefineButtonTestIds,
} from "@refinedev/ui-types";

import { act, fireEvent, render, TestWrapper, waitFor } from "@test";
import { Route, Routes } from "react-router-dom";

export const buttonShowTests = function (
    ShowButton: React.ComponentType<RefineShowButtonProps<any, any>>,
): void {
    describe("[@refinedev/ui-tests] Common Tests / Show Button", () => {
        const show = jest.fn();

        beforeAll(() => {
            jest.spyOn(console, "warn").mockImplementation(jest.fn());
        });

        it("should render button successfuly", async () => {
            const { container } = render(<ShowButton />, {
                wrapper: TestWrapper({}),
            });

            expect(container).toBeTruthy();
        });

        it("should have the correct test-id", async () => {
            const { queryByTestId } = render(<ShowButton />, {
                wrapper: TestWrapper({}),
            });

            expect(queryByTestId(RefineButtonTestIds.ShowButton)).toBeTruthy();
        });

        it("should render text by children", async () => {
            const { container, getByText } = render(
                <ShowButton>refine</ShowButton>,
                {
                    wrapper: TestWrapper({}),
                },
            );

            expect(container).toBeTruthy();

            getByText("refine");
        });

        it("should render without text show only icon", async () => {
            const { container, queryByText } = render(<ShowButton hideText />, {
                wrapper: TestWrapper({}),
            });

            expect(container).toBeTruthy();

            expect(queryByText("Show")).not.toBeInTheDocument();
        });

        it("should be disabled when user not have access", async () => {
            const { container, getByText } = render(
                <ShowButton>Show</ShowButton>,
                {
                    wrapper: TestWrapper({
                        accessControlProvider: {
                            can: () => Promise.resolve({ can: false }),
                        },
                    }),
                },
            );

            expect(container).toBeTruthy();

            waitFor(() =>
                expect(getByText("Show").closest("button")).toBeDisabled(),
            );
        });

        it("should be disabled when recordId not allowed", async () => {
            const { container, getByText } = render(
                <ShowButton recordItemId="1">Show</ShowButton>,
                {
                    wrapper: TestWrapper({
                        accessControlProvider: {
                            can: ({ params }) => {
                                if (params?.id === "1") {
                                    return Promise.resolve({ can: false });
                                }
                                return Promise.resolve({ can: true });
                            },
                        },
                    }),
                },
            );

            expect(container).toBeTruthy();

            waitFor(() =>
                expect(getByText("Show").closest("button")).toBeDisabled(),
            );
        });

        it("should skip access control", async () => {
            const { container, getByText } = render(
                <ShowButton
                    accessControl={{
                        enabled: false,
                    }}
                >
                    Show
                </ShowButton>,
                {
                    wrapper: TestWrapper({
                        accessControlProvider: {
                            can: () => Promise.resolve({ can: false }),
                        },
                    }),
                },
            );

            expect(container).toBeTruthy();

            expect(getByText("Show").closest("button")).not.toBeDisabled();
        });

        it("should successfully return disabled button custom title", async () => {
            const { container, getByText } = render(
                <ShowButton>Show</ShowButton>,
                {
                    wrapper: TestWrapper({
                        accessControlProvider: {
                            can: () =>
                                Promise.resolve({
                                    can: false,
                                    reason: "Access Denied",
                                }),
                        },
                    }),
                },
            );

            expect(container).toBeTruthy();

            await waitFor(() =>
                expect(getByText("Show").closest("button")).toBeDisabled(),
            );
            await waitFor(() =>
                expect(
                    getByText("Show").closest("button")?.getAttribute("title"),
                ).toBe("Access Denied"),
            );
        });

        it("should render called function successfully if click the button", async () => {
            const { getByText } = render(
                <ShowButton onClick={() => show()} />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            await act(async () => {
                fireEvent.click(getByText("Show"));
            });

            expect(show).toHaveBeenCalledTimes(1);
        });

        it("should create page redirect show route called function successfully if click the button", async () => {
            const { getByText } = render(
                <Routes>
                    <Route
                        path="/:resource"
                        element={<ShowButton recordItemId="1" />}
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
                        routerInitialEntries: ["/posts"],
                    }),
                },
            );

            await act(async () => {
                fireEvent.click(getByText("Show"));
            });

            expect(window.location.pathname).toBe("/posts/show/1");
        });

        it("should edit page redirect show route called function successfully if click the button", async () => {
            const { getByText } = render(
                <Routes>
                    <Route
                        path="/:resource/:action/:id"
                        element={<ShowButton />}
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            await act(async () => {
                fireEvent.click(getByText("Show"));
            });

            expect(window.location.pathname).toBe("/posts/show/1");
        });

        it("should custom resource and recordItemId redirect show route called function successfully if click the button", async () => {
            const { getByText } = render(
                <Routes>
                    <Route
                        path="/:resource"
                        element={
                            <ShowButton
                                resourceNameOrRouteName="categories"
                                recordItemId="1"
                            />
                        }
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }, { name: "categories" }],
                        routerInitialEntries: ["/posts"],
                    }),
                },
            );

            await act(async () => {
                fireEvent.click(getByText("Show"));
            });

            expect(window.location.pathname).toBe("/categories/show/1");
        });

        it("should redirect with custom route called function successfully if click the button", async () => {
            const { getByText } = render(
                <Routes>
                    <Route
                        path="/:resource"
                        element={
                            <ShowButton
                                resourceNameOrRouteName="custom-route-posts"
                                recordItemId="1"
                            />
                        }
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [
                            {
                                name: "posts",
                                meta: { route: "custom-route-posts" },
                            },
                            { name: "posts" },
                        ],
                        routerInitialEntries: ["/posts"],
                    }),
                },
            );

            await act(async () => {
                fireEvent.click(getByText("Show"));
            });

            expect(window.location.pathname).toBe("/custom-route-posts/show/1");
        });
    });
};
