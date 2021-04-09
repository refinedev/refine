import React from "react";

import { fireEvent, render, TestWrapper } from "@test";
import { ExportButton } from "./";

describe("Export Button", () => {
    const fetchData = jest.fn();

    it("should render button successfully", () => {
        const exportButton = render(
            <ExportButton onClick={() => fetchData()} />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );
        const { container, getByText } = exportButton;

        expect(container).toBeTruthy();

        getByText("Export");
    });

    it("should render called function successfully if click the button", () => {
        const exportButton = render(
            <ExportButton onClick={() => fetchData()} />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );
        const { getByText } = exportButton;

        fireEvent.click(getByText("Export"));

        expect(fetchData).toHaveBeenCalledTimes(1);
    });
});
