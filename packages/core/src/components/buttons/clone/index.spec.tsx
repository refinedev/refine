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
        const { container, getByText } = render(
            <CloneButton onClick={() => clone()} />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );

        expect(container).toBeTruthy();

        getByText("Clone");
    });

    it("should render text by children", () => {
        const { container, getByText } = render(
            <CloneButton>refine</CloneButton>,
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
        const { container, queryByText } = render(<CloneButton hideText />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });

        expect(container).toBeTruthy();

        expect(queryByText("Clone")).not.toBeInTheDocument();
    });

    it("should render called function successfully if click the button", () => {
        const { getByText } = render(
            <CloneButton onClick={() => clone()} recordItemId="1" />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );

        fireEvent.click(getByText("Clone"));

        expect(clone).toHaveBeenCalledTimes(1);
    });

    it("should create page redirect clone route called function successfully if click the button", () => {
        const { getByText } = render(
            <Route path="/:resource">
                <CloneButton recordItemId="1" />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts", route: "posts" }],
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        fireEvent.click(getByText("Clone"));

        expect(mHistory.push).toBeCalledWith("/posts/create/1");
    });

    it("should edit page redirect clone route called function successfully if click the button", () => {
        const { getByText } = render(
            <Route path="/:resource/:id">
                <CloneButton />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts", route: "posts" }],
                    routerInitialEntries: ["/posts/edit/1"],
                }),
            },
        );

        fireEvent.click(getByText("Clone"));

        expect(mHistory.push).toBeCalledWith("/posts/create/1");
    });

    it("should custom resource and recordItemId redirect clone route called function successfully if click the button", () => {
        const { getByText } = render(
            <Route path="/:resource">
                <CloneButton resourceName="categories" recordItemId="1" />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [
                        { name: "posts", route: "posts" },
                        { name: "categories", route: "categories" },
                    ],
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        fireEvent.click(getByText("Clone"));

        expect(mHistory.push).toBeCalledWith("/categories/create/1");
    });
});
