import React from "react";
import {
    RefineEditButtonProps,
    RefineButtonTestIds,
} from "@refinedev/ui-types";

import { act, fireEvent, render, TestWrapper, waitFor } from "@test";
import { Route, Routes } from "react-router-dom";

export const buttonEditTests = function (
    EditButton: React.ComponentType<RefineEditButtonProps<any, any>>,
): void {
    describe("[@refinedev/ui-tests] Common Tests / Edit Button", () => {
        const edit = jest.fn();

        beforeAll(() => {
            jest.spyOn(console, "warn").mockImplementation(jest.fn());
        });

        it("should render button successfuly", async () => {
            const { container } = render(<EditButton />, {
                wrapper: TestWrapper({}),
            });

            expect(container).toBeTruthy();
        });

        it("should have the correct test-id", async () => {
            const { queryByTestId } = render(<EditButton />, {
                wrapper: TestWrapper({}),
            });

            expect(queryByTestId(RefineButtonTestIds.EditButton)).toBeTruthy();
        });

        it("should render text by children", async () => {
            const { container, getByText } = render(
                <EditButton>refine</EditButton>,
                {
                    wrapper: TestWrapper({}),
                },
            );

            expect(container).toBeTruthy();

            getByText("refine");
        });

        it("should render without text show only icon", async () => {
            const { container, queryByText } = render(<EditButton hideText />, {
                wrapper: TestWrapper({}),
            });

            expect(container).toBeTruthy();

            expect(queryByText("Edit")).not.toBeInTheDocument();
        });

        it("should be disabled when user not have access", async () => {
            const { container, getByText } = render(
                <EditButton>Edit</EditButton>,
                {
                    wrapper: TestWrapper({
                        accessControlProvider: {
                            can: () => Promise.resolve({ can: false }),
                        },
                    }),
                },
            );

            expect(container).toBeTruthy();

            await waitFor(() =>
                expect(getByText("Edit").closest("button")).toBeDisabled(),
            );
        });

        it("should be disabled when recordId not allowed", async () => {
            const { container, getByText } = render(
                <EditButton recordItemId="1">Edit</EditButton>,
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

            await waitFor(() =>
                expect(getByText("Edit").closest("button")).toBeDisabled(),
            );
        });

        it("should skip access control", async () => {
            const { container, getByText } = render(
                <EditButton
                    accessControl={{
                        enabled: false,
                    }}
                >
                    Edit
                </EditButton>,
                {
                    wrapper: TestWrapper({
                        accessControlProvider: {
                            can: () => Promise.resolve({ can: false }),
                        },
                    }),
                },
            );

            expect(container).toBeTruthy();

            await waitFor(() =>
                expect(getByText("Edit").closest("button")).not.toBeDisabled(),
            );
        });

        it("should successfully return disabled button custom title", async () => {
            const { container, getByText } = render(
                <EditButton>Edit</EditButton>,
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
                expect(getByText("Edit").closest("button")).toBeDisabled(),
            );
            waitFor(() =>
                expect(
                    getByText("Edit").closest("button")?.getAttribute("title"),
                ).toBe("Access Denied"),
            );
        });

        it("should render called function successfully if click the button", async () => {
            const { getByText } = render(
                <EditButton onClick={() => edit()} />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            await act(async () => {
                fireEvent.click(getByText("Edit"));
            });

            expect(edit).toHaveBeenCalledTimes(1);
        });

        it("should custom resource and recordItemId redirect show route called function successfully if click the button", async () => {
            const { getByText } = render(
                <Routes>
                    <Route
                        path="/:resource"
                        element={
                            <EditButton
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
                fireEvent.click(getByText("Edit"));
            });

            expect(window.location.pathname).toBe("/categories/edit/1");
        });

        it("should redirect with custom route called function successfully if click the button", async () => {
            const { getByText } = render(
                <Routes>
                    <Route
                        path="/:resource"
                        element={
                            <EditButton
                                resourceNameOrRouteName="custom-route-posts"
                                recordItemId={1}
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
                fireEvent.click(getByText("Edit"));
            });

            expect(window.location.pathname).toBe("/custom-route-posts/edit/1");
        });
    });
};
