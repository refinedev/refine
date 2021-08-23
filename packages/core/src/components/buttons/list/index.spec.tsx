import React from "react";

import { fireEvent, render, TestWrapper } from "@test";
import { ListButton } from "./";

describe("List Button", () => {
    const list = jest.fn();

    it("should render button successfuly", () => {
        const { container, getByText } = render(
            <ListButton onClick={() => list()} resourceName="posts-light" />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts-light" }],
                }),
            },
        );

        getByText("Posts light");

        expect(container).toBeTruthy();
    });

    it("should render text by children", () => {
        const { container, getByText } = render(
            <ListButton>refine</ListButton>,
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
        const { container, queryByText } = render(<ListButton hideText />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });

        expect(container).toBeTruthy();

        expect(queryByText("Posts")).not.toBeInTheDocument();
    });

    it("should render called function successfully if click the button", () => {
        const { getByText } = render(
            <ListButton onClick={() => list()} resourceName="posts" />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );

        fireEvent.click(getByText("Posts"));

        expect(list).toHaveBeenCalledTimes(1);
    });
});
