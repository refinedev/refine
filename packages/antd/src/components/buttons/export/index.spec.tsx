import React from "react";
import { screen, render, act } from "@test";
import { ExportButton } from "./index";

describe("<ExportButton/>", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    it("should render", async () => {
        const { getByText } = render(<ExportButton />);

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        getByText("Export");
    });

    it("should render text by children", async () => {
        const { container, getByText } = render(
            <ExportButton>refine</ExportButton>,
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();

        getByText("refine");
    });

    it("should render without text show only icon", async () => {
        const { container, queryByText } = render(<ExportButton hideText />);

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();

        expect(queryByText("Export")).not.toBeInTheDocument();
    });

    it("should have text 'Export'", async () => {
        window.open = jest.fn();

        render(<ExportButton data-testid="btn" />);

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        screen.getByText("Export");
    });
});
