import React from "react";
import { Simulate } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";
import {
    RefineImportButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";

import { act, MockJSONServer, render, TestWrapper } from "@test";
import { useImport } from "@pankod/refine-core";

export const buttonImportTests = function (
    ImportButton: React.ComponentType<RefineImportButtonProps<any, any>>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Import Button", () => {
        const parseMock = jest.fn();

        beforeAll(() => {
            jest.useFakeTimers();

            jest.mock("papaparse", () => {
                return {
                    parse: jest.fn(() => parseMock()),
                };
            });
        });

        it("should render button successfuly", async () => {
            const { container } = render(<ImportButton />, {
                wrapper: TestWrapper({}),
            });

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(container).toBeTruthy();
        });

        it("should have the correct test-id", async () => {
            const { queryByTestId } = render(<ImportButton />, {
                wrapper: TestWrapper({}),
            });

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(
                queryByTestId(RefineButtonTestIds.ImportButton),
            ).toBeTruthy();
        });

        it("should render text by children", async () => {
            const { container, getByText } = render(
                <ImportButton>refine</ImportButton>,
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
        it("should trigger parse when used with useImport hook", async () => {
            const {
                result: { current: importProps },
            } = renderHook(() => useImport(), {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "categories" }],
                }),
            });
            const { container } = render(
                <ImportButton {...importProps}>Test</ImportButton>,
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
            const hiddenFileInput =
                container.querySelector('input[type="file"]');
            const files = { files: [file] } as unknown as EventTarget;
            await act(async () => {
                Simulate.change(hiddenFileInput as Element, {
                    target: files,
                });
            });
            expect(parseMock).toHaveBeenCalled();
        });
    });
};
