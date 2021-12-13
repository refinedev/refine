import React from "react";

import { fireEvent, render, TestWrapper } from "@test";
import { SaveButton } from "./";

describe("Save Button", () => {
    const save = jest.fn();

    it("should render button successfuly", () => {
        const { container, getByText } = render(
            <SaveButton onClick={() => save()} />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );

        expect(container).toBeTruthy();

        getByText("Save");
    });

    it("should render text by children", () => {
        const { container, getByText } = render(
            <SaveButton>refine</SaveButton>,
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
        const { container, queryByText } = render(<SaveButton hideText />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });

        expect(container).toBeTruthy();

        expect(queryByText("Save")).not.toBeInTheDocument();
    });

    it("should render called function successfully if click the button", () => {
        const { getByText } = render(<SaveButton onClick={() => save()} />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });

        fireEvent.click(getByText("Save"));

        expect(save).toHaveBeenCalledTimes(1);
    });
});
