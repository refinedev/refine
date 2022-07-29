import React from "react";
import { act, TestWrapper, render } from "@test";

import { CircularDeterminate } from ".";

describe("CircularDeterminate", () => {
    it("should render CircularDeterminate", async () => {
        jest.useFakeTimers();

        const { getByText } = render(
            <CircularDeterminate undoableTimeout={5} message="test" />,
            {
                wrapper: TestWrapper({}),
            },
        );
        expect(getByText?.("5")).toBeTruthy();

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        getByText?.("test");

        expect(getByText?.("4")).toBeTruthy();

        await act(async () => {
            jest.advanceTimersByTime(1000);
        });

        expect(getByText?.("3")).toBeTruthy();
    });

    it("should render CircularDeterminate with undoableTimeout is 0", async () => {
        jest.useFakeTimers();

        const { getByText } = render(
            <CircularDeterminate undoableTimeout={0} message="test" />,

            {
                wrapper: TestWrapper({}),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        getByText("test");

        expect(getByText("0")).toBeTruthy();
        await act(async () => {
            jest.advanceTimersByTime(1100);
        });

        expect(getByText("0")).toBeTruthy();

        await act(async () => {
            jest.advanceTimersByTime(1100);
        });

        expect(getByText("0")).toBeTruthy();
    });
});
