import React from "react";
import {
    RefineDeleteButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";

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
    describe("[@pankod/refine-ui-tests] Common Tests / Delete Button", () => {
        beforeAll(() => {
            jest.spyOn(console, "error").mockImplementation(jest.fn());
        });
        it("should render button successfuly", async () => {
            const { container } = render(<DeleteButton />, {
                wrapper: TestWrapper({}),
            });

            await act(async () => {
                // jest.advanceTimersToNextTimer(1);
            });

            expect(container).toBeTruthy();
        });

        it("should have the correct test-id", async () => {
            const { queryByTestId } = render(<DeleteButton />, {
                wrapper: TestWrapper({}),
            });

            expect(
                queryByTestId(RefineButtonTestIds.DeleteButton),
            ).toBeTruthy();
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
            const { container, getByText } = render(
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

            waitFor(() =>
                expect(getByText("Delete").closest("button")).toBeDisabled(),
            );
        });

        it("should be disabled when recordId not allowed", async () => {
            const { container, getByText } = render(
                <DeleteButton recordItemId="1">Delete</DeleteButton>,
                {
                    wrapper: TestWrapper({
                        accessControlProvider: {
                            can: ({ params }) => {
                                if (params?.id === "1") {
                                    return Promise.resolve({ can: false });
                                }
                                console.log("ff");
                                return Promise.resolve({ can: true });
                            },
                        },
                    }),
                },
            );

            expect(container).toBeTruthy();

            waitFor(() =>
                expect(getByText("Delete").closest("button")).toBeDisabled(),
            );
        });

        it("should skip access control", async () => {
            const { container, getAllByText } = render(
                <DeleteButton ignoreAccessControlProvider>Delete</DeleteButton>,
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
                    getAllByText("Delete")?.[0].closest("button"),
                ).not.toBeDisabled(),
            );
        });

        it("should render called function successfully if click the button", async () => {
            const deleteFunc = jest.fn();
            const { getByText } = render(
                <DeleteButton onClick={() => deleteFunc()} />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            await act(async () => {
                fireEvent.click(getByText("Delete"));
            });

            expect(deleteFunc).toHaveBeenCalledTimes(1);
        });

        it("should render Popconfirm successfuly", async () => {
            const { getByText, getAllByText } = render(<DeleteButton />, {
                wrapper: (props) => {
                    const W = TestWrapper({});
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore testing purposes
                    return <W {...props} />;
                },
            });

            await act(async () => {
                fireEvent.click(getByText("Delete"));
            });

            getByText("Are you sure?");
            getByText("Cancel");
            getAllByText("Delete");
        });

        it("should confirm Popconfirm successfuly", async () => {
            const deleteOneMock = jest.fn();
            const { getByText, getAllByText } = render(<DeleteButton />, {
                wrapper: TestWrapper({
                    dataProvider: {
                        ...MockJSONServer,
                        deleteOne: deleteOneMock,
                    },
                }),
            });

            await act(async () => {
                fireEvent.click(getByText("Delete"));
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

            const { getByText, getAllByText } = render(
                <DeleteButton recordItemId="1" />,
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
                fireEvent.click(getByText("Delete"));
            });

            getByText("Are you sure?");
            getByText("Cancel");

            const deleteButtons = getAllByText("Delete");

            await act(async () => {
                fireEvent.click(deleteButtons[1]);
            });

            expect(deleteOneMock).toBeCalledTimes(1);
        });

        it("should confirm Popconfirm successfuly with onSuccess", async () => {
            const deleteOneMock = jest.fn();
            const onSuccessMock = jest.fn();

            const { getByText, getAllByText } = render(
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
                fireEvent.click(getByText("Delete"));
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

            const { getByText } = render(
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
                fireEvent.click(getByText("Delete"));
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
            const { getByText } = render(
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

            await act(async () => {
                fireEvent.click(getByText("Delete"));
            });
        });

        it("should render with custom resource", async () => {
            const { getByText } = render(
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

            await act(async () => {
                fireEvent.click(getByText("Delete"));
            });
        });

        it("should render with resourceNameOrRouteName", async () => {
            const { getByText } = render(
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

            await act(async () => {
                fireEvent.click(getByText("Delete"));
            });
        });
    });
};
