import React from "react";
import {
    RefineDeleteButtonProps,
    RefineButtonTestIds,
} from "@refinedev/ui-types";

import {
    act,
    fireEvent,
    MockJSONServer,
    render,
    TestWrapper,
    waitFor,
} from "@test";
import { Route, Routes } from "react-router-dom";

export const buttonDeleteTests = function (
    DeleteButton: React.ComponentType<RefineDeleteButtonProps<any, any>>,
): void {
    describe("[@refinedev/ui-tests] Common Tests / Delete Button", () => {
        beforeAll(() => {
            jest.spyOn(console, "error").mockImplementation(jest.fn());
            jest.clearAllTimers();
        });

        it("should render button successfuly", async () => {
            const { container } = render(<DeleteButton />, {
                wrapper: TestWrapper({}),
            });

            expect(container).toBeTruthy();
        });

        it("should have the correct test-id", async () => {
            const { getByTestId } = render(<DeleteButton />, {
                wrapper: TestWrapper({}),
            });

            getByTestId(RefineButtonTestIds.DeleteButton);
        });

        it("should render text by children", async () => {
            const { container, getByText } = render(
                <DeleteButton>refine</DeleteButton>,
                {
                    wrapper: TestWrapper({}),
                },
            );

            expect(container).toBeTruthy();

            getByText("refine");
        });

        it("should render without text show only icon", async () => {
            const { container, queryByText } = render(
                <DeleteButton hideText />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            expect(container).toBeTruthy();

            expect(queryByText("Delete")).not.toBeInTheDocument();
        });

        it("should be disabled when user not have access", async () => {
            const { container, getByTestId } = render(
                <DeleteButton>Delete</DeleteButton>,
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
                expect(
                    getByTestId(RefineButtonTestIds.DeleteButton),
                ).toBeDisabled(),
            );
        });

        it("should be disabled when recordId not allowed", async () => {
            const { container, getByTestId } = render(
                <DeleteButton recordItemId="1">Delete</DeleteButton>,
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
                expect(
                    getByTestId(RefineButtonTestIds.DeleteButton),
                ).toBeDisabled(),
            );
        });

        it("should skip access control", async () => {
            const { container, getByTestId } = render(
                <DeleteButton
                    accessControl={{
                        enabled: false,
                    }}
                >
                    Delete
                </DeleteButton>,
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
                expect(
                    getByTestId(RefineButtonTestIds.DeleteButton),
                ).not.toBeDisabled(),
            );
        });

        it("should render called function successfully if click the button", async () => {
            const deleteFunc = jest.fn();
            const { getByTestId } = render(
                <DeleteButton onClick={() => deleteFunc()} />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            await act(async () => {
                fireEvent.click(getByTestId(RefineButtonTestIds.DeleteButton));
            });

            expect(deleteFunc).toHaveBeenCalledTimes(1);
        });

        it("should render Popconfirm successfuly", async () => {
            const { getByText, getAllByText, getByTestId } = render(
                <DeleteButton
                    resourceNameOrRouteName="posts"
                    recordItemId="1"
                />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            await act(async () => {
                fireEvent.click(getByTestId(RefineButtonTestIds.DeleteButton));
            });

            getByText("Are you sure?");
            getByText("Cancel");
            getAllByText("Delete");
        });

        it("should confirm Popconfirm successfuly", async () => {
            const deleteOneMock = jest.fn();
            const { getByText, getAllByText, getByTestId } = render(
                <DeleteButton
                    resourceNameOrRouteName="posts"
                    recordItemId="1"
                />,
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            ...MockJSONServer,
                            deleteOne: deleteOneMock,
                        },
                    }),
                },
            );

            await act(async () => {
                fireEvent.click(getByTestId(RefineButtonTestIds.DeleteButton));
            });

            getByText("Are you sure?");
            getByText("Cancel");

            const deleteButtons = getAllByText("Delete");

            await act(async () => {
                fireEvent.click(deleteButtons[1]);
            });

            expect(deleteOneMock).toBeCalledTimes(1);
        });

        it("should confirm Popconfirm successfuly with recordItemId", async () => {
            const deleteOneMock = jest.fn();

            const { getByText, getAllByText, getByTestId } = render(
                <DeleteButton
                    recordItemId="record-id"
                    resourceNameOrRouteName="posts"
                />,
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            ...MockJSONServer,
                            deleteOne: deleteOneMock,
                        },
                    }),
                },
            );

            await act(async () => {
                fireEvent.click(getByTestId(RefineButtonTestIds.DeleteButton));
            });

            getByText("Are you sure?");
            getByText("Cancel");

            const deleteButtons = getAllByText("Delete");

            await act(async () => {
                fireEvent.click(deleteButtons[1]);
            });

            expect(deleteOneMock).toBeCalledWith(
                expect.objectContaining({ id: "record-id" }),
            );
        });

        it("should confirm Popconfirm successfuly with onSuccess", async () => {
            const deleteOneMock = jest.fn();
            const onSuccessMock = jest.fn();

            const { getByText, getAllByText, getByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource/:action/:id"
                        element={<DeleteButton onSuccess={onSuccessMock} />}
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            ...MockJSONServer,
                            deleteOne: deleteOneMock,
                        },
                        routerInitialEntries: ["/posts/edit/1"],
                    }),
                },
            );

            await act(async () => {
                fireEvent.click(getByTestId(RefineButtonTestIds.DeleteButton));
            });

            getByText("Are you sure?");
            getByText("Cancel");

            const deleteButtons = getAllByText("Delete");

            await act(async () => {
                fireEvent.click(deleteButtons[1]);
            });

            expect(deleteOneMock).toBeCalledTimes(1);
            expect(onSuccessMock).toBeCalledTimes(1);
        });

        it("should confirm Popconfirm successfuly with onSuccess", async () => {
            const deleteOneMock = jest.fn();
            const onSuccessMock = jest.fn();

            const { getByText, getByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource/:action/:id"
                        element={
                            <DeleteButton
                                onSuccess={onSuccessMock}
                                confirmOkText="confirmOkText"
                                confirmCancelText="confirmCancelText"
                                confirmTitle="confirmTitle"
                            />
                        }
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            ...MockJSONServer,
                            deleteOne: deleteOneMock,
                        },
                        routerInitialEntries: ["/posts/edit/1"],
                    }),
                },
            );

            await act(async () => {
                fireEvent.click(getByTestId(RefineButtonTestIds.DeleteButton));
            });

            getByText("confirmTitle");
            getByText("confirmOkText");
            getByText("confirmCancelText");

            await act(async () => {
                fireEvent.click(getByText("confirmOkText"));
            });

            expect(deleteOneMock).toBeCalledTimes(1);
            expect(onSuccessMock).toBeCalledTimes(1);
        });

        it("should render with custom mutationMode", async () => {
            const { getByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource"
                        element={<DeleteButton mutationMode="pessimistic" />}
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
                        routerInitialEntries: ["/posts"],
                    }),
                },
            );

            getByTestId(RefineButtonTestIds.DeleteButton);
        });

        it("should render with custom resource", async () => {
            const { getByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource"
                        element={
                            <DeleteButton resourceNameOrRouteName="categories" />
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

            getByTestId(RefineButtonTestIds.DeleteButton);
        });

        it("should render with resourceNameOrRouteName", async () => {
            const { getByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource"
                        element={
                            <DeleteButton resourceNameOrRouteName="users" />
                        }
                    />
                </Routes>,

                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }, { name: "users" }],
                        routerInitialEntries: ["/posts"],
                    }),
                },
            );

            getByTestId(RefineButtonTestIds.DeleteButton);
        });
    });
};
