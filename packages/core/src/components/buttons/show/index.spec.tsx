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
        const { container, getByText } = render(
            <ShowButton onClick={() => show()} />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );

        expect(container).toBeTruthy();

        getByText("Show");
    });

    it("should render text by children", () => {
        const { container, getByText } = render(
            <ShowButton>refine</ShowButton>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );

        expect(container).toBeTruthy();

        getByText("refine");
    });

    it("should render without text show only icon", () => {
        const { container, queryByText } = render(<ShowButton hideText />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });

        expect(container).toBeTruthy();

        expect(queryByText("Show")).not.toBeInTheDocument();
    });

    it("should render called function successfully if click the button", () => {
        const { getByText } = render(<ShowButton onClick={() => show()} />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });

        fireEvent.click(getByText("Show"));

        expect(show).toHaveBeenCalledTimes(1);
    });

    it("should create page redirect show route called function successfully if click the button", () => {
        const { getByText } = render(
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

        fireEvent.click(getByText("Show"));

        expect(mHistory.push).toBeCalledWith("/posts/show/1");
    });

    it("should edit page redirect show route called function successfully if click the button", () => {
        const { getByText } = render(
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

        fireEvent.click(getByText("Show"));

        expect(mHistory.push).toBeCalledWith("/posts/show/1");
    });

    it("should custom resource and recordItemId redirect show route called function successfully if click the button", () => {
        const { getByText } = render(
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

        fireEvent.click(getByText("Show"));

        expect(mHistory.push).toBeCalledWith("/categories/show/1");
    });
});
