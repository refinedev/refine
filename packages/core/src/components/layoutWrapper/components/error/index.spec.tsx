import React from "react";
import ReactRouterDom from "react-router-dom";

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
        const { getByText } = render(<ErrorComponent />);

        getByText("Sorry, the page you visited does not exist.");
    });

    it("renders button successfully", () => {
        const { container, getByText } = render(<ErrorComponent />);

        expect(container.querySelector("button")).toBeTruthy();
        getByText("Back Home");
    });

    it("renders called function successfully if click the button", () => {
        const { getByText } = render(<ErrorComponent />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts", route: "posts" }],
            }),
        });

        fireEvent.click(getByText("Back Home"));

        expect(mHistory.push).toBeCalledWith("/");
    });
});
