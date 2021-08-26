import React from "react";

import { fireEvent, render, TestWrapper } from "@test";
import { EditButton } from "./";

describe("Edit Button", () => {
    const edit = jest.fn();

    it("should render button successfuly", () => {
        const { container, getByText } = render(
            <EditButton onClick={() => edit()} />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );

        expect(container).toBeTruthy();

        getByText("Edit");
    });

    it("should render text by children", () => {
        const { container, getByText } = render(
            <EditButton>refine</EditButton>,
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
        const { container, queryByText } = render(<EditButton hideText />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });

        expect(container).toBeTruthy();

        expect(queryByText("Edit")).not.toBeInTheDocument();
    });

    it("should render called function successfully if click the button", () => {
        const { getByText } = render(<EditButton onClick={() => edit()} />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });

        fireEvent.click(getByText("Edit"));

        expect(edit).toHaveBeenCalledTimes(1);
    });
});
