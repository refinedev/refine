import React from "react";

import { fireEvent, render, TestWrapper } from "@test";
import { ListButton } from "./";

describe("List Button", () => {
    const list = jest.fn();

    it("should render button successfully", () => {
        const listButton = render(
            <ListButton onClick={() => list()} resourceName="posts-light" />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts-light" }],
                }),
            },
        );
        const { container, getByText } = listButton;

        getByText("Posts light");

        expect(container).toBeTruthy();
    });

    it("should render called function successfully if click the button", () => {
        const listButton = render(
            <ListButton onClick={() => list()} resourceName="posts" />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );
        const { getByText } = listButton;

        fireEvent.click(getByText("Posts"));

        expect(list).toHaveBeenCalledTimes(1);
    });
});
