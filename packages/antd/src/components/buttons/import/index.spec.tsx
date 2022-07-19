import React from "react";
import { render, TestWrapper, MockJSONServer } from "@test";
import { act, Simulate } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";

import { ImportButton } from "./index";
import { useImport } from "@hooks/import";

describe("<ImportButton /> usage with useImport", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    it("should render without crashing", async () => {
        const {
            result: { current: importProps },
        } = renderHook(() => useImport(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "categories" }],
            }),
        });
        const { container, getByText } = render(
            <ImportButton {...importProps}>Test</ImportButton>,
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();
        getByText("Test");
    });
    it("should render without text show only icon", async () => {
        const {
            result: { current: importProps },
        } = renderHook(() => useImport(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "categories" }],
            }),
        });
        const { container, queryByText } = render(
            <ImportButton {...importProps} hideText />,
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();
        expect(queryByText("Import")).not.toBeInTheDocument();
    });
});
