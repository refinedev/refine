import React from "react";
import ReactRouterDom, { Route } from "react-router-dom";

import { fireEvent, render, TestWrapper } from "@test";
import { CloneButton } from "./";

const mHistory = {
    push: jest.fn(),
};

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useHistory: jest.fn(() => mHistory),
}));

describe("Clone Button", () => {
    const clone = jest.fn();

    it("should render button successfuly", () => {
        const cloneButton = render(<CloneButton onClick={() => clone()} />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });
        const { container, getByText } = cloneButton;

        expect(container).toBeTruthy();

        getByText("Clone");
    });

    it("should render called function successfully if click the button", () => {
        const cloneButton = render(
            <CloneButton onClick={() => clone()} recordItemId="1" />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );
        const { getByText } = cloneButton;

        fireEvent.click(getByText("Clone"));

        expect(clone).toHaveBeenCalledTimes(1);
    });

    it("should create page redirect clone route called function successfully if click the button", () => {
        const cloneButton = render(
            <Route path="/resources/:resource">
                <CloneButton recordItemId="1" />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                    routerInitialEntries: ["/resources/posts"],
                }),
            },
        );
        const { getByText } = cloneButton;

        fireEvent.click(getByText("Clone"));

        expect(mHistory.push).toBeCalledWith(
            "/resources/posts/create/1",
            undefined,
        );
    });

    it("should edit page redirect clone route called function successfully if click the button", () => {
        const cloneButton = render(
            <Route path="/resources/:resource/:id">
                <CloneButton />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                    routerInitialEntries: ["/resources/posts/edit/1"],
                }),
            },
        );
        const { getByText } = cloneButton;

        fireEvent.click(getByText("Clone"));

        expect(mHistory.push).toBeCalledWith(
            "/resources/posts/create/1",
            undefined,
        );
    });

    it("should custom resource and recordItemId redirect clone route called function successfully if click the button", () => {
        const cloneButton = render(
            <Route path="/resources/:resource">
                <CloneButton resourceName="categories" recordItemId="1" />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                    routerInitialEntries: ["/resources/posts"],
                }),
            },
        );
        const { getByText } = cloneButton;

        fireEvent.click(getByText("Clone"));

        expect(mHistory.push).toBeCalledWith(
            "/resources/categories/create/1",
            undefined,
        );
    });
});
