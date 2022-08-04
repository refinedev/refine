import React from "react";
import ReactRouterDom, { Route, Routes } from "react-router-dom";

import { ErrorComponent } from ".";
import { render, fireEvent, TestWrapper } from "@test";

const mHistory = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useNavigate: () => mHistory,
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

        expect(mHistory).toBeCalledWith("/");
    });

    it("renders error messages if resources action's not found", async () => {
        const { getByText } = render(
            <Routes>
                <Route
                    path="/:resource/:action"
                    element={<ErrorComponent />}
                ></Route>
            </Routes>,
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
            <Routes>
                <Route
                    path="/:resource/:action"
                    element={<ErrorComponent />}
                ></Route>
            </Routes>,
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
