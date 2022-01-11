import React from "react";

import { fireEvent, render, TestWrapper } from "@test";
import { RefreshButton } from "./";

describe("Refresh Button", () => {
    const refresh = jest.fn();

    it("should render button successfuly", () => {
        const { container, getByText } = render(
            <RefreshButton onClick={() => refresh()} />,
            {
                wrapper: TestWrapper({}),
            },
        );

        expect(container).toBeTruthy();

        getByText("Refresh");
    });

    it("should render text by children", () => {
        const { container, getByText } = render(
            <RefreshButton>refine</RefreshButton>,
            {
                wrapper: TestWrapper({}),
            },
        );

        expect(container).toBeTruthy();

        getByText("refine");
    });

    it("should render without text show only icon", () => {
        const { container, queryByText } = render(<RefreshButton hideText />, {
            wrapper: TestWrapper({}),
        });
        expect(container).toBeTruthy();

        expect(queryByText("Refresh")).not.toBeInTheDocument();
    });

    it("should render called function successfully if click the button", () => {
        const { getByText } = render(
            <RefreshButton onClick={() => refresh()} />,
            {
                wrapper: TestWrapper({}),
            },
        );

        fireEvent.click(getByText("Refresh"));

        expect(refresh).toHaveBeenCalledTimes(1);
    });
});
