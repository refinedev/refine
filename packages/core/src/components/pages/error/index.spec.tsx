import React from "react";
import ReactRouterDom, { Route } from "react-router-dom";

import { ErrorComponent } from ".";
import { render, fireEvent, TestWrapper } from "@test";

const mHistory = {
    push: jest.fn(),
    replace: jest.fn(),
};
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useHistory: jest.fn(() => mHistory),
}));

describe("ErrorComponent", () => {
    it("renders subtitle successfully", () => {
        const { getByText } = render(<ErrorComponent />, {
            wrapper: TestWrapper({}),
        });

        getByText("Sorry, the page you visited does not exist.");
    });

    it("renders button successfully", () => {
        const { container, getByText } = render(<ErrorComponent />, {
            wrapper: TestWrapper({}),
        });

        expect(container.querySelector("button")).toBeTruthy();
        getByText("Back Home");
    });

    it("renders called function successfully if click the button", () => {
        const { getByText } = render(<ErrorComponent />, {
            wrapper: TestWrapper({}),
        });

        fireEvent.click(getByText("Back Home"));

        expect(mHistory.push).toBeCalledWith("/", undefined);
    });

    it("renders error messages if resources action's not found", async () => {
        const { getByText } = render(
            <Route path="/:resource?/:action?">
                <ErrorComponent />
            </Route>,
            {
                wrapper: TestWrapper({
                    routerInitialEntries: ["/posts/create"],
                }),
            },
        );

        getByText(
            `You may have forgotten to add the "create" component to "posts" resource.`,
        );
    });

    it("renders error messages if resource action's is different from 'create, edit, show'", () => {
        const { getByText } = render(
            <Route path="/:resource?/:action?">
                <ErrorComponent />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts", route: "posts" }],
                    routerInitialEntries: ["/posts/invalidActionType"],
                }),
            },
        );

        getByText("Sorry, the page you visited does not exist.");
    });
});
