import React from "react";

import { renderHook, waitFor } from "@testing-library/react";
import { useImport, UseImportInputPropsType } from "@pankod/refine-core";

import { render, TestWrapper, MockJSONServer, fireEvent, act } from "@test";

import { ImportButton } from "./";

describe("ImportButton", () => {
    let inputProps: UseImportInputPropsType;
    let isLoading: boolean;

    beforeAll(async () => {
        jest.useFakeTimers();

        const { result } = renderHook(() => useImport(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "categories" }],
            }),
        });

        await waitFor(() => {
            expect(!result.current.isLoading).toBeTruthy();
        });

        isLoading = result.current.isLoading;
        inputProps = result.current.inputProps;
    });

    it("should render without crashing", async () => {
        const { container, getByText } = render(
            <ImportButton inputProps={inputProps} loading={isLoading}>
                Test
            </ImportButton>,
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();
        getByText("Test");
    });
    it("should render without text show only icon", async () => {
        const { container, queryByText } = render(
            <ImportButton
                inputProps={inputProps}
                loading={isLoading}
                hideText
            />,
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();
        expect(queryByText("Import")).not.toBeInTheDocument();
    });
});
