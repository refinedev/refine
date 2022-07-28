import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";
import { buttonImportTests } from "@pankod/refine-ui-tests";
import { render, TestWrapper, MockJSONServer } from "@test";

import { ImportButton } from "./index";
import { useImport } from "@hooks/import";

const parseMock = jest.fn();

jest.mock("papaparse", () => {
    return {
        parse: jest.fn(() => parseMock()),
    };
});

describe("<ImportButton /> usage with useImport", () => {
    buttonImportTests.bind(this)(ImportButton);

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
        const hiddenFileInput = container.querySelector('input[type="file"]');
        const files = { files: [file] } as unknown as EventTarget;
        await act(async () => {
            Simulate.change(hiddenFileInput as Element, {
                target: files,
            });
        });
        expect(parseMock).toHaveBeenCalled();
    });
});
