import React from "react";
import { TestWrapper, render } from "@test";

import { CircularDeterminate } from ".";

jest.useFakeTimers();

describe("CircularDeterminate", () => {
    it("should render CircularDeterminate", () => {
        const { getByText } = render(
            <CircularDeterminate undoableTimeout={5} message="test" />,

            {
                wrapper: TestWrapper({}),
            },
        );

        getByText("test");
        expect(getByText("5")).toBeTruthy();
        jest.advanceTimersByTime(1100);

        expect(getByText("4")).toBeTruthy();
    });

    it("should render CircularDeterminate with undoableTimeout is 0", () => {
        const { getByText } = render(
            <CircularDeterminate undoableTimeout={0} message="test" />,

            {
                wrapper: TestWrapper({}),
            },
        );

        getByText("test");
        expect(getByText("0")).toBeTruthy();
        jest.advanceTimersByTime(1100);

        expect(getByText("0")).toBeTruthy();

        jest.advanceTimersByTime(1100);

        expect(getByText("0")).toBeTruthy();
    });
});
