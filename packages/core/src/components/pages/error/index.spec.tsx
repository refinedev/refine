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
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });

        getByText("Sorry, the page you visited does not exist.");
    });

    it("renders button successfully", () => {
        const { container, getByText } = render(<ErrorComponent />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });

        expect(container.querySelector("button")).toBeTruthy();
        getByText("Back Home");
    });

    it("renders called function successfully if click the button", () => {
        const { getByText } = render(<ErrorComponent />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });

        fireEvent.click(getByText("Back Home"));

        expect(mHistory.push).toBeCalledWith("/");
    });

    it("renders error messages if resources not found", async () => {
        const { getByTestId, findByText } = render(
            <Route path="/resources/:resource?">
                <ErrorComponent />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts", route: "posts" }],
                    routerInitialEntries: ["/resources/shops"],
                }),
            },
        );

        fireEvent.mouseOver(getByTestId("error-component-tooltip"));

        expect(
            await findByText(
                `Are you sure you have created the "shops" resource.`,
            ),
        ).toBeInTheDocument();
    });

    it("renders error messages if resources action's not found", async () => {
        const { getByTestId, findByText } = render(
            <Route path="/resources/:resource?/:action?">
                <ErrorComponent />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts", route: "posts" }],
                    routerInitialEntries: ["/resources/posts/create"],
                }),
            },
        );

        fireEvent.mouseOver(getByTestId("error-component-tooltip"));

        expect(
            await findByText(
                `You may have forgotten to add the "create" component to "posts" resource.`,
            ),
        ).toBeInTheDocument();
    });

    it("renders error messages if resource action's is different from 'create, edit, show'", () => {
        const { getByText } = render(
            <Route path="/resources/:resource?/:action?">
                <ErrorComponent />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts", route: "posts" }],
                    routerInitialEntries: [
                        "/resources/posts/invalidActionType",
                    ],
                }),
            },
        );

        getByText("Sorry, the page you visited does not exist.");
    });
});
