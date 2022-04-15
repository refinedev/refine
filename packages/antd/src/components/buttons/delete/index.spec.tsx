import React from "react";
import { Route, Routes } from "react-router-dom";

import {
    fireEvent,
    render,
    TestWrapper,
    act,
    MockJSONServer,
    waitFor,
} from "@test";
import { DeleteButton } from "./";

describe("Delete Button", () => {
    const deleteFunc = jest.fn();

    it("should render button successfuly", () => {
        const { container, getByText } = render(
            <DeleteButton onClick={() => deleteFunc()} />,
            {
                wrapper: TestWrapper({}),
            },
        );

        expect(container).toBeTruthy();

        getByText("Delete");
    });

    it("should render text by children", () => {
        const { container, getByText } = render(
            <DeleteButton>refine</DeleteButton>,
            {
                wrapper: TestWrapper({}),
            },
        );

        expect(container).toBeTruthy();

        getByText("refine");
    });

    it("should render without text show only icon", () => {
        const { container, queryByText } = render(<DeleteButton hideText />, {
            wrapper: TestWrapper({}),
        });

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

        await waitFor(() =>
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
                            if (params.id === "1") {
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
            expect(getByText("Delete").closest("button")).toBeDisabled(),
        );
    });

    it("should skip access control", async () => {
        const { container, getByText } = render(
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
            expect(getByText("Delete").closest("button")).not.toBeDisabled(),
        );
    });

    it("should render called function successfully if click the button", () => {
        const { getByText } = render(
            <DeleteButton onClick={() => deleteFunc()} />,
            {
                wrapper: TestWrapper({}),
            },
        );

        fireEvent.click(getByText("Delete"));

        expect(deleteFunc).toHaveBeenCalledTimes(1);
    });

    describe("Delete Button popconfirm", () => {
        it("should render Popconfirm successfuly", () => {
            const { getByText, getAllByText } = render(
                <DeleteButton onClick={() => deleteFunc()} />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            fireEvent.click(getByText("Delete"));

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

            const { getByText, getAllByText, debug } = render(
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
    });

    it("should render with custom mutationMode", () => {
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

        fireEvent.click(getByText("Delete"));
    });

    it("should render with custom resource", () => {
        const { getByText } = render(
            <Routes>
                <Route
                    path="/:resource"
                    element={<DeleteButton resourceName="categories" />}
                />
            </Routes>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }, { name: "categories" }],
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        fireEvent.click(getByText("Delete"));
    });

    it("should render with resourceNameOrRouteName", () => {
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

        fireEvent.click(getByText("Delete"));
    });
});
