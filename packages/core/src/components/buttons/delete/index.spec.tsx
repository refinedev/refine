import React from "react";

import { fireEvent, render, TestWrapper } from "@test";
import { DeleteButton } from "./";

describe("Delete Button", () => {
    const deleteFunc = jest.fn();

    it("should render button successfully", () => {
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

    it("should render Popconfirm successfully", () => {
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
});
