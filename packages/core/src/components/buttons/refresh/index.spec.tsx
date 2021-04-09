import React from "react";

import { fireEvent, render, TestWrapper } from "@test";
import { RefreshButton } from "./";

describe("Refresh Button", () => {
    const refresh = jest.fn();

    it("should render button successfully", () => {
        const refreshButton = render(
            <RefreshButton onClick={() => refresh()} />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );
        const { container, getByText } = refreshButton;

        expect(container).toBeTruthy();

        getByText("Refresh");
    });

    it("should render called function successfully if click the button", () => {
        const refreshButton = render(
            <RefreshButton onClick={() => refresh()} />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );
        const { getByText } = refreshButton;

        fireEvent.click(getByText("Refresh"));

        expect(refresh).toHaveBeenCalledTimes(1);
    });
});
