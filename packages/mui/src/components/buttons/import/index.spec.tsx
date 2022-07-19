import React from "react";

import { renderHook } from "@testing-library/react-hooks";
import { useImport, UseImportInputPropsType } from "@pankod/refine-core";

import { render, TestWrapper, MockJSONServer, fireEvent, act } from "@test";

import { ImportButton } from "./";

describe("ImportButton", () => {
    let inputProps: UseImportInputPropsType;
    let isLoading: boolean;

    beforeAll(async () => {
        jest.useFakeTimers();

        await act(async () => {
            const { result } = renderHook(() => useImport(), {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "categories" }],
                }),
            });

            isLoading = result.current.isLoading;
            inputProps = result.current.inputProps;
        });
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
