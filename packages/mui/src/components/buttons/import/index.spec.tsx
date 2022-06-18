import React from "react";
import { act, Simulate } from "react-dom/test-utils";

import { renderHook } from "@testing-library/react-hooks";
import { useImport, UseImportInputPropsType } from "@pankod/refine-core";

import { render, TestWrapper, MockJSONServer } from "@test";

import { ImportButton } from "./";

const parseMock = jest.fn();

jest.mock("papaparse", () => {
    return {
        parse: jest.fn(() => parseMock()),
    };
});

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
    it("should trigger parse when used with useImport hook", async () => {
        // Temporary silence the console error
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (
                message?.includes?.(
                    "Can't perform a React state update on an unmounted component.",
                )
            ) {
                console.log("Memory leak - unmounted state update.");
                return;
            }
            console.warn(message);
        });

        const { container } = render(
            <ImportButton inputProps={inputProps} loading={isLoading}>
                Test
            </ImportButton>,
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        const file = new File(
            [
                `"id","title","createdAt","updatedAt"
    "35ad97dd-9379-480a-b6ac-6fc9c13e9224","Viral Strategist Local","2021-04-09T12:03:23.933Z","2021-04-09T12:03:23.933Z"
    "9a428977-1b03-4c3e-8cdd-1e4e2813528a","Concrete Soap Neural","2021-04-09T12:03:23.835Z","2021-04-09T12:03:23.835Z"`,
            ],
            "data.csv",
            { type: "text/csv" },
        );
        const hiddenFileInput = container.querySelector('input[type="file"]');
        const files = { files: [file] } as unknown as EventTarget;

        await act(async () => {
            Simulate.change(hiddenFileInput as Element, {
                target: files,
            });
        });

        await act(async () => {
            jest.runAllTimers();
        });

        await act(async () => {
            jest.advanceTimersByTime(5000);
        });

        expect(parseMock).toHaveBeenCalled();
    });
});
