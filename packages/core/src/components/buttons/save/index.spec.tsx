import React from "react";

import { fireEvent, render, TestWrapper } from "@test";
import { SaveButton } from "./";

describe("Save Button", () => {
    const save = jest.fn();

    it("should render button successfully", () => {
        const saveButton = render(<SaveButton onClick={() => save()} />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });
        const { container, getByText } = saveButton;

        expect(container).toBeTruthy();

        getByText("Save");
    });

    it("should render called function successfully if click the button", () => {
        const saveButton = render(<SaveButton onClick={() => save()} />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });
        const { getByText } = saveButton;

        fireEvent.click(getByText("Save"));

        expect(save).toHaveBeenCalledTimes(1);
    });
});
