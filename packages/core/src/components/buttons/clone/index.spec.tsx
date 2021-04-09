import React from "react";

import { fireEvent, render, TestWrapper } from "@test";
import { CloneButton } from "./";

describe("Clone Button", () => {
    const clone = jest.fn();

    it("should render button successfully", () => {
        const cloneButton = render(<CloneButton onClick={() => clone()} />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });
        const { container, getByText } = cloneButton;

        expect(container).toBeTruthy();

        getByText("Clone");
    });

    it("should render called function successfully if click the button", () => {
        const cloneButton = render(<CloneButton onClick={() => clone()} />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });
        const { getByText } = cloneButton;

        fireEvent.click(getByText("Clone"));

        expect(clone).toHaveBeenCalledTimes(1);
    });
});
