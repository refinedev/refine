import React from "react";
import { Route } from "react-router-dom";

import { fireEvent, render, TestWrapper, act } from "@test";
import { DeleteButton } from "./";

describe("Delete Button", () => {
    const deleteFunc = jest.fn();

    it("should render button successfuly", () => {
        const deleteButton = render(
            <DeleteButton onClick={() => deleteFunc()} />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );
        const { container, getByText } = deleteButton;

        expect(container).toBeTruthy();

        getByText("Delete");
    });

    it("should render called function successfully if click the button", () => {
        const deleteButton = render(
            <DeleteButton onClick={() => deleteFunc()} />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );
        const { getByText } = deleteButton;

        fireEvent.click(getByText("Delete"));

        expect(deleteFunc).toHaveBeenCalledTimes(1);
    });

    describe("Delete Button popconfirm", () => {
        it("should render Popconfirm successfuly", () => {
            const deleteButton = render(
                <DeleteButton onClick={() => deleteFunc()} />,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
                    }),
                },
            );
            const { getByText, getAllByText } = deleteButton;

            fireEvent.click(getByText("Delete"));

            getByText("Are you sure?");
            getByText("Cancel");
            getAllByText("Delete");
        });

        it("should confirm Popconfirm successfuly", async () => {
            const deleteButton = render(<DeleteButton />, {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            });
            const { getByText, getAllByText } = deleteButton;

            await act(async () => {
                fireEvent.click(getByText("Delete"));
            });

            getByText("Are you sure?");
            getByText("Cancel");

            const deleteButtons = getAllByText("Delete");

            await act(async () => {
                fireEvent.click(deleteButtons[1]);
            });
        });

        it("should confirm Popconfirm successfuly with recordItemId", async () => {
            const deleteButton = render(<DeleteButton recordItemId="1" />, {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            });
            const { getByText, getAllByText } = deleteButton;

            await act(async () => {
                fireEvent.click(getByText("Delete"));
            });

            getByText("Are you sure?");
            getByText("Cancel");

            const deleteButtons = getAllByText("Delete");

            await act(async () => {
                fireEvent.click(deleteButtons[1]);
            });
        });

        it("should confirm Popconfirm successfuly with onSuccess", async () => {
            const deleteButton = render(
                <DeleteButton onSuccess={jest.fn()} />,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
                    }),
                },
            );
            const { getByText, getAllByText } = deleteButton;

            await act(async () => {
                fireEvent.click(getByText("Delete"));
            });

            getByText("Are you sure?");
            getByText("Cancel");

            const deleteButtons = getAllByText("Delete");

            await act(async () => {
                fireEvent.click(deleteButtons[1]);
            });
        });
    });
    it("should render with custom mutationMode", () => {
        const deleteButton = render(
            <Route path="/resources/:resource">
                <DeleteButton mutationMode="pessimistic" />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts", route: "posts" }],
                    routerInitialEntries: ["/resources/posts"],
                }),
            },
        );
        const { getByText } = deleteButton;

        fireEvent.click(getByText("Delete"));
    });

    it("should render with custom resource", () => {
        const deleteButton = render(
            <Route path="/resources/:resource">
                <DeleteButton resourceName="categories" />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [
                        { name: "posts", route: "posts" },
                        { name: "categories", route: "categories" },
                    ],
                    routerInitialEntries: ["/resources/posts"],
                }),
            },
        );
        const { getByText } = deleteButton;

        fireEvent.click(getByText("Delete"));
    });
});
