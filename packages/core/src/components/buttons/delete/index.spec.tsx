import React from "react";
import { Route } from "react-router-dom";

import { fireEvent, render, TestWrapper, act, MockJSONServer } from "@test";
import { DeleteButton } from "./";

describe("Delete Button", () => {
    const deleteFunc = jest.fn();

    it("should render button successfuly", () => {
        const { container, getByText } = render(
            <DeleteButton onClick={() => deleteFunc()} />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );

        expect(container).toBeTruthy();

        getByText("Delete");
    });

    it("should render text by children", () => {
        const { container, getByText } = render(
            <DeleteButton>refine</DeleteButton>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );

        expect(container).toBeTruthy();

        getByText("refine");
    });

    it("should render without text show only icon", () => {
        const { container, queryByText } = render(<DeleteButton hideText />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });

        expect(container).toBeTruthy();

        expect(queryByText("Delete")).not.toBeInTheDocument();
    });

    it("should render called function successfully if click the button", () => {
        const { getByText } = render(
            <DeleteButton onClick={() => deleteFunc()} />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
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
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
                    }),
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
                    resources: [{ name: "posts" }],
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
                        resources: [{ name: "posts" }],
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
                <DeleteButton onSuccess={onSuccessMock} />,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
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
            expect(onSuccessMock).toBeCalledTimes(1);
        });
    });

    it("should render with custom mutationMode", () => {
        const { getByText } = render(
            <Route path="/:resource">
                <DeleteButton mutationMode="pessimistic" />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts", route: "posts" }],
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        fireEvent.click(getByText("Delete"));
    });

    it("should render with custom resource", () => {
        const { getByText } = render(
            <Route path="/:resource">
                <DeleteButton resourceName="categories" />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [
                        { name: "posts", route: "posts" },
                        { name: "categories", route: "categories" },
                    ],
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        fireEvent.click(getByText("Delete"));
    });
});
