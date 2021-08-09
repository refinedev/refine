import React from "react";
import ReactRouterDom, { Route } from "react-router-dom";

import { fireEvent, render, TestWrapper } from "@test";
import { ShowButton } from "./";

const mHistory = {
    push: jest.fn(),
};

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useHistory: jest.fn(() => mHistory),
}));

describe("Show Button", () => {
    const show = jest.fn();

    it("should render button successfuly", () => {
        const showButton = render(<ShowButton onClick={() => show()} />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });
        const { container, getByText } = showButton;

        expect(container).toBeTruthy();

        getByText("Show");
    });

    it("should render called function successfully if click the button", () => {
        const showButton = render(<ShowButton onClick={() => show()} />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });
        const { getByText } = showButton;

        fireEvent.click(getByText("Show"));

        expect(show).toHaveBeenCalledTimes(1);
    });

    it("should create page redirect show route called function successfully if click the button", () => {
        const showButton = render(
            <Route path="/:resource">
                <ShowButton recordItemId="1" />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts", route: "posts" }],
                    routerInitialEntries: ["/posts"],
                }),
            },
        );
        const { getByText } = showButton;

        fireEvent.click(getByText("Show"));

        expect(mHistory.push).toBeCalledWith("/posts/show/1");
    });

    it("should edit page redirect show route called function successfully if click the button", () => {
        const showButton = render(
            <Route path="/:resource/:id">
                <ShowButton />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts", route: "posts" }],
                    routerInitialEntries: ["/posts/1"],
                }),
            },
        );
        const { getByText } = showButton;

        fireEvent.click(getByText("Show"));

        expect(mHistory.push).toBeCalledWith("/posts/show/1");
    });

    it("should custom resource and recordItemId redirect show route called function successfully if click the button", () => {
        const showButton = render(
            <Route path="/:resource">
                <ShowButton resourceName="categories" recordItemId="1" />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [
                        { name: "posts" },
                        { name: "categories", route: "categories" },
                    ],
                    routerInitialEntries: ["/posts"],
                }),
            },
        );
        const { getByText } = showButton;

        fireEvent.click(getByText("Show"));

        expect(mHistory.push).toBeCalledWith("/categories/show/1");
    });
});
