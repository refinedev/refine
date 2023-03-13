import React from "react";
import { Route, Routes } from "react-router-dom";
import {
    RefineCreateButtonProps,
    RefineButtonTestIds,
} from "@refinedev/ui-types";

import { act, render, TestWrapper, fireEvent, waitFor } from "@test";

export const buttonCreateTests = function (
    CreateButton: React.ComponentType<RefineCreateButtonProps<any, any>>,
): void {
    describe("[@refinedev/ui-tests] Common Tests / Create Button", () => {
        beforeAll(() => {
            jest.spyOn(console, "warn").mockImplementation(jest.fn());
        });

        const create = jest.fn();

        it("should render button successfuly", async () => {
            const { container } = render(<CreateButton />, {
                wrapper: TestWrapper({}),
            });

            expect(container).toBeTruthy();
        });

        it("should have the correct test-id", async () => {
            const { queryByTestId } = render(<CreateButton />, {
                wrapper: TestWrapper({}),
            });

            expect(
                queryByTestId(RefineButtonTestIds.CreateButton),
            ).toBeTruthy();
        });
        it("should render text by children", async () => {
            const { container, getByText } = render(
                <CreateButton>refine</CreateButton>,
                {
                    wrapper: TestWrapper({}),
                },
            );

            expect(container).toBeTruthy();

            getByText("refine");
        });

        it("should render without text show only icon", async () => {
            const { container, queryByText } = render(
                <CreateButton hideText />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            expect(container).toBeTruthy();
            expect(queryByText("Create")).not.toBeInTheDocument();
        });

        it("should be disabled when user not have access", async () => {
            const { container, getByText } = render(
                <CreateButton>Create</CreateButton>,
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
                expect(getByText("Create").closest("button")).toBeDisabled(),
            );
        });

        it("should skip access control", async () => {
            const { container, getByText } = render(
                <CreateButton
                    accessControl={{
                        enabled: false,
                    }}
                >
                    Create
                </CreateButton>,
                {
                    wrapper: TestWrapper({
                        accessControlProvider: {
                            can: () => Promise.resolve({ can: false }),
                        },
                    }),
                },
            );

            expect(container).toBeTruthy();

            expect(getByText("Create").closest("button")).not.toBeDisabled();
        });

        it("should successfully return disabled button custom title", async () => {
            const { container, getByText } = render(
                <CreateButton>Create</CreateButton>,
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
                expect(getByText("Create").closest("button")).toBeDisabled(),
            );
            await waitFor(() =>
                expect(
                    getByText("Create")
                        .closest("button")
                        ?.getAttribute("title"),
                ).toBe("Access Denied"),
            );
        });

        it("should render called function successfully if click the button", async () => {
            const { getByText } = render(
                <CreateButton onClick={() => create()} />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            await act(async () => {
                fireEvent.click(getByText("Create"));
            });

            expect(create).toHaveBeenCalledTimes(1);
        });

        it("should redirect custom resource route called function successfully if click the button", async () => {
            const { getByText } = render(
                <Routes>
                    <Route
                        path="/:resource"
                        element={
                            <CreateButton resourceNameOrRouteName="categories" />
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
                fireEvent.click(getByText("Create"));
            });

            expect(window.location.pathname).toBe("/categories/create");
        });

        it("should redirect create route called function successfully if click the button", async () => {
            const { getByText } = render(
                <Routes>
                    <Route path="/:resource" element={<CreateButton />} />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
                        routerInitialEntries: ["/posts"],
                    }),
                },
            );

            await act(async () => {
                fireEvent.click(getByText("Create"));
            });

            expect(window.location.pathname).toBe("/posts/create");
        });

        it("should redirect with custom route called function successfully if click the button", async () => {
            const { getByText } = render(
                <Routes>
                    <Route
                        path="/:resource"
                        element={
                            <CreateButton resourceNameOrRouteName="custom-route-posts" />
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
                fireEvent.click(getByText("Create"));
            });

            expect(window.location.pathname).toBe("/custom-route-posts/create");
        });
    });
};
