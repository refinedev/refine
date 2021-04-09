import React from "react";

import { fireEvent, render, TestWrapper } from "@test";
import { ShowButton } from "./";

describe("Show Button", () => {
    const show = jest.fn();

    it("should render button successfully", () => {
        const showButton = render(<ShowButton onClick={() => show()} />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });
        const { container, getByText } = showButton;

        expect(container).toBeTruthy();

        getByText("Show");
    });

    it("should render called function successfully if click the button", () => {
        const showButton = render(<ShowButton onClick={() => show()} />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });
        const { getByText } = showButton;

        fireEvent.click(getByText("Show"));

        expect(show).toHaveBeenCalledTimes(1);
    });
});
