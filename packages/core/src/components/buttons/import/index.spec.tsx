import React, { ReactNode } from "react";
import { Route } from "react-router-dom";
import { render, TestWrapper, MockJSONServer } from "@test";
import { ImportButton } from ".";

const customRender = (show: ReactNode) => {
    return render(<Route path="/resources/:resource/show/:id">{show}</Route>, {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "categories", route: "categories" }],
            routerInitialEntries: ["/resources/categories/"],
        }),
    });
};

describe("<ImportButton />", () => {
    it("should render without error", () => {
        customRender(<ImportButton>Test</ImportButton>);
    });
});
