import React from "react";

import { act, fireEvent, render, TestWrapper } from "@test";
import { SaveButton } from "./";

describe("Save Button", () => {
    const save = jest.fn();
    beforeAll(() => {
        jest.useFakeTimers();
    });

    it("should render button successfuly", async () => {
        const { container, getByText } = render(
            <SaveButton onClick={() => save()} />,
            {
                wrapper: TestWrapper({}),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();

        getByText("Save");
    });

    it("should render text by children", async () => {
        const { container, getByText } = render(
            <SaveButton>refine</SaveButton>,
            {
                wrapper: TestWrapper({}),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();

        getByText("refine");
    });

    it("should render without text show only icon", async () => {
        const { container, queryByText } = render(<SaveButton hideText />, {
            wrapper: TestWrapper({}),
        });

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();

        expect(queryByText("Save")).not.toBeInTheDocument();
    });

    it("should render called function successfully if click the button", async () => {
        const { getByText } = render(<SaveButton onClick={() => save()} />, {
            wrapper: TestWrapper({}),
        });

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await act(async () => {
            fireEvent.click(getByText("Save"));
        });

        expect(save).toHaveBeenCalledTimes(1);
    });
});
