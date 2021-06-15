import React from "react";

import { act, fireEvent, render, TestWrapper, MockJSONServer } from "@test";
import { ExportButton } from "./";

describe("Export Button", () => {
    it("should render button successfuly", () => {
        const { findByText } = render(<ExportButton />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });

        findByText("Export");
    });

    it("should export correctly", async () => {
        window.open = jest.fn();

        const { getByTestId } = render(
            <ExportButton maxItemCount={1} data-testid="btn" />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                    dataProvider: MockJSONServer,
                }),
            },
        );

        await act(async () => {
            fireEvent.click(getByTestId("btn"));
        });

        expect(window.open).toBeCalled();
    });
});
