import React from "react";

import { fireEvent, render, TestWrapper } from "@test";
import { EditButton } from "./";

describe("Edit Button", () => {
    const edit = jest.fn();

    it("should render button successfuly", () => {
        const editButton = render(<EditButton onClick={() => edit()} />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });
        const { container, getByText } = editButton;

        expect(container).toBeTruthy();

        getByText("Edit");
    });

    it("should render called function successfully if click the button", () => {
        const editButton = render(<EditButton onClick={() => edit()} />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });
        const { getByText } = editButton;

        fireEvent.click(getByText("Edit"));

        expect(edit).toHaveBeenCalledTimes(1);
    });
});
