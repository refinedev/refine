import React, { ReactNode } from "react";
import { Route } from "react-router-dom";
import { render, TestWrapper, MockJSONServer } from "@test";
import { act, Simulate } from "react-dom/test-utils";

import { ImportButton } from ".";

const parseMock = jest.fn();

jest.mock("papaparse", () => {
    return {
        parse: jest.fn(() => parseMock()),
    };
});

const customRender = (show: ReactNode) => {
    return render(<Route path="/resources/:resource/">{show}</Route>, {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "categories", route: "categories" }],
            routerInitialEntries: ["/resources/categories/"],
        }),
    });
};

describe("<ImportButton />", () => {
    it("should render without crashing", () => {
        const result = customRender(<ImportButton>Test</ImportButton>);
        expect(result).toBeTruthy();
    });

    it("should trigger parse", async () => {
        const { container } = customRender(<ImportButton>Test</ImportButton>);

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
        const files = { files: [file] } as unknown as EventTarget; // TODO: töbe töbe

        await act(async () => {
            Simulate.change(hiddenFileInput as Element, {
                target: files,
            });
        });

        expect(parseMock).toHaveBeenCalled();
    });
});
