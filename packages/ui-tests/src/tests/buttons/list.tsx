import React from "react";
import {
    RefineListButtonProps,
    RefineButtonTestIds,
} from "@refinedev/ui-types";

import { act, fireEvent, render, TestWrapper, waitFor } from "@test";
import { Route, Routes } from "react-router-dom";

export const buttonListTests = function (
    ListButton: React.ComponentType<RefineListButtonProps<any, any>>,
): void {
    describe("[@refinedev/ui-tests] Common Tests / List Button", () => {
        const list = jest.fn();

        it("should render button successfuly", async () => {
            const { container } = render(<ListButton />, {
                wrapper: TestWrapper({}),
            });

            expect(container).toBeTruthy();
        });

        it("should have the correct test-id", async () => {
            const { queryByTestId } = render(<ListButton />, {
                wrapper: TestWrapper({}),
            });

            expect(queryByTestId(RefineButtonTestIds.ListButton)).toBeTruthy();
        });

        it("should render text by children", async () => {
            const { container, getByText } = render(
                <ListButton>refine</ListButton>,
                {
                    wrapper: TestWrapper({}),
                },
            );

            expect(container).toBeTruthy();

            getByText("refine");
        });

        it("should render label as children if specified", async () => {
            const { container, getByText } = render(
                <Routes>
                    <Route path="/:resource" element={<ListButton />}></Route>
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", meta: { label: "test" } }],
                        routerInitialEntries: ["/posts"],
                    }),
                },
            );

            expect(container).toBeTruthy();
            getByText("Tests");
        });

        it("should render text by children", async () => {
            const { container, getByText } = render(
                <ListButton>refine</ListButton>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
                    }),
                },
            );

            expect(container).toBeTruthy();

            getByText("refine");
        });

        it("should render without text show only icon", async () => {
            const { container, queryByText } = render(<ListButton hideText />, {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            });

            expect(container).toBeTruthy();

            expect(queryByText("Posts")).not.toBeInTheDocument();
        });

        it("should be disabled when user not have access", async () => {
            const { container, getByText } = render(
                <ListButton>List</ListButton>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
                        accessControlProvider: {
                            can: () => Promise.resolve({ can: false }),
                        },
                    }),
                },
            );

            expect(container).toBeTruthy();

            await waitFor(() =>
                expect(getByText("List").closest("button")).toBeDisabled(),
            );
        });

        it("should skip access control", async () => {
            const { container, getByText } = render(
                <ListButton
                    accessControl={{
                        enabled: false,
                    }}
                >
                    List
                </ListButton>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
                        accessControlProvider: {
                            can: () => Promise.resolve({ can: false }),
                        },
                    }),
                },
            );

            expect(container).toBeTruthy();

            await waitFor(() =>
                expect(getByText("List").closest("button")).not.toBeDisabled(),
            );
        });

        it("should successfully return disabled button custom title", async () => {
            const { container, getByText } = render(
                <ListButton>List</ListButton>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
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
                expect(getByText("List").closest("button")).toBeDisabled(),
            );
            await waitFor(() =>
                expect(
                    getByText("List").closest("button")?.getAttribute("title"),
                ).toBe("Access Denied"),
            );
        });

        it("should render called function successfully if click the button", async () => {
            const { getByText } = render(
                <ListButton
                    onClick={() => list()}
                    resourceNameOrRouteName="posts"
                />,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
                    }),
                },
            );

            await act(async () => {
                fireEvent.click(getByText("Posts"));
            });

            expect(list).toHaveBeenCalledTimes(1);
        });

        it("should redirect with custom route called function successfully if click the button", async () => {
            const { getByText } = render(
                <Routes>
                    <Route
                        path="/:resource"
                        element={
                            <ListButton resourceNameOrRouteName="custom-route-posts" />
                        }
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [
                            {
                                name: "posts",
                                options: { route: "custom-route-posts" },
                            },
                            { name: "posts" },
                        ],
                        routerInitialEntries: ["/posts"],
                    }),
                },
            );

            await act(async () => {
                fireEvent.click(getByText("Posts"));
            });

            expect(window.location.pathname).toBe("/custom-route-posts");
        });
    });
};
