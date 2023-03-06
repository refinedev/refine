import React from "react";
import { Route, Routes } from "react-router-dom";
import {
    RefineCloneButtonProps,
    RefineButtonTestIds,
} from "@refinedev/ui-types";

import { act, fireEvent, render, TestWrapper, waitFor } from "@test";

export const buttonCloneTests = function (
    CloneButton: React.ComponentType<RefineCloneButtonProps<any, any>>,
): void {
    describe("[@refinedev/ui-tests] Common Tests / Clone Button", () => {
        beforeAll(() => {
            jest.spyOn(console, "warn").mockImplementation(jest.fn());
        });

        it("should render button successfuly", async () => {
            const { container } = render(<CloneButton />, {
                wrapper: TestWrapper({}),
            });

            expect(container).toBeTruthy();
        });

        it("should have the correct test-id", async () => {
            const { queryByTestId } = render(<CloneButton />, {
                wrapper: TestWrapper({}),
            });

            expect(queryByTestId(RefineButtonTestIds.CloneButton)).toBeTruthy();
        });

        it("should render text by children", async () => {
            const { container, getByText } = render(
                <CloneButton>refine</CloneButton>,
                {
                    wrapper: TestWrapper({}),
                },
            );

            expect(container).toBeTruthy();

            getByText("refine");
        });

        it("should render without text show only icon", async () => {
            const { container, queryByText } = render(
                <CloneButton hideText />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            expect(container).toBeTruthy();

            expect(queryByText("Clone")).not.toBeInTheDocument();
        });

        it("should be disabled when user not have access", async () => {
            const { container, getByText } = render(
                <CloneButton>Clone</CloneButton>,
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
                expect(getByText("Clone")?.closest("button")).toBeDisabled(),
            );
        });

        it("should be disabled when recordId not allowed", async () => {
            const { container, getByText } = render(
                <CloneButton recordItemId="1">Clone</CloneButton>,
                {
                    wrapper: TestWrapper({
                        accessControlProvider: {
                            can: ({ params }) => {
                                if (params?.id === "1") {
                                    return Promise.resolve({ can: false });
                                }
                                return Promise.resolve({ can: false });
                            },
                        },
                    }),
                },
            );

            expect(container).toBeTruthy();

            waitFor(() =>
                expect(getByText("Clone").closest("button")).toBeDisabled(),
            );
        });

        it("should skip access control", async () => {
            const { container, getByText } = render(
                <CloneButton
                    accessControl={{
                        enabled: false,
                    }}
                >
                    Clone
                </CloneButton>,
                {
                    wrapper: TestWrapper({
                        accessControlProvider: {
                            can: () => Promise.resolve({ can: false }),
                        },
                    }),
                },
            );

            expect(container).toBeTruthy();

            expect(getByText("Clone").closest("button")).not.toBeDisabled();
        });

        it("should successfully return disabled button custom title", async () => {
            const { container, getByText } = render(
                <CloneButton>Clone</CloneButton>,
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

            waitFor(() =>
                expect(getByText("Clone").closest("button")).toBeDisabled(),
            );
            waitFor(() =>
                expect(
                    getByText("Clone").closest("button")?.getAttribute("title"),
                ).toBe("Access Denied"),
            );
        });

        it("should render called function successfully if click the button", async () => {
            const clone = jest.fn();

            const { getByText } = render(
                <CloneButton onClick={() => clone()} recordItemId="1" />,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
                    }),
                },
            );

            await act(async () => {
                fireEvent.click(getByText("Clone"));
            });

            expect(clone).toHaveBeenCalledTimes(1);
        });

        it("should create page redirect clone route called function successfully if click the button", async () => {
            const { getByText } = render(
                <Routes>
                    <Route
                        path="/:resource"
                        element={<CloneButton recordItemId="1" />}
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        routerInitialEntries: ["/posts"],
                    }),
                },
            );

            await act(async () => {
                fireEvent.click(getByText("Clone"));
            });

            expect(window.location.pathname).toBe("/posts/clone/1");
        });

        it("should edit page redirect clone route called function successfully if click the button", async () => {
            const { getByText } = render(
                <Routes>
                    <Route
                        path="/:resource/:action/:id"
                        element={<CloneButton />}
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        routerInitialEntries: ["/posts/edit/1"],
                    }),
                },
            );

            await act(async () => {
                fireEvent.click(getByText("Clone"));
            });

            expect(window.location.pathname).toBe("/posts/clone/1");
        });

        it("should custom resource and recordItemId redirect clone route called function successfully if click the button", async () => {
            const { getByText } = render(
                <Routes>
                    <Route
                        path="/:resource"
                        element={
                            <CloneButton
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
                fireEvent.click(getByText("Clone"));
            });

            expect(window.location.pathname).toBe("/categories/clone/1");
        });

        it("should redirect with custom route called function successfully if click the button", async () => {
            const { getByText } = render(
                <Routes>
                    <Route
                        path="/:resource"
                        element={
                            <CloneButton
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
                fireEvent.click(getByText("Clone"));
            });

            expect(window.location.pathname).toBe(
                "/custom-route-posts/clone/1",
            );
        });
    });
};
