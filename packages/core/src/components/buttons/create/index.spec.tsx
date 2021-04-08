import React from "react";

import { fireEvent, render, TestWrapper } from "@test";
import { CreateButton } from "./";

describe("Create Button", () => {
    const create = jest.fn();

    it("should render button successfuly", () => {
        const createButton = render(<CreateButton onClick={() => create()} />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });
        const { container, getByText } = createButton;

        expect(container).toBeTruthy();

        getByText("Create");
    });

    it("should render called function successfully if click the button", () => {
        const createButton = render(<CreateButton onClick={() => create()} />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });
        const { getByText } = createButton;

        fireEvent.click(getByText("Create"));

        expect(create).toHaveBeenCalledTimes(1);
    });
});
