// TODO : This Unit test is testing only related UI component
// It should be update after implementation of logic
import React from "react";
import { render } from "@test";

import { ImportButton } from "./";

describe("ImportButton", () => {
    it("should render import button", () => {
        const { getByText } = render(
            <ImportButton buttonProps={{ color: "inherit" }} />,
        );

        getByText("Import");
    });

    it("should render input", () => {
        const { getByTestId } = render(
            <ImportButton buttonProps={{ color: "inherit" }} />,
        );

        getByTestId("import-input");
    });

    it("should render children as title", () => {
        const { getByText } = render(
            <ImportButton buttonProps={{ color: "inherit" }}>
                Test
            </ImportButton>,
        );

        getByText("Test");
    });
});
