import React from "react";
import ReactRouterDom, { Route } from "react-router-dom";

import { fireEvent, render, TestWrapper } from "@test";
import { CreateButton } from "./";

const mHistory = {
    push: jest.fn(),
};

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useHistory: jest.fn(() => mHistory),
}));

describe("Create Button", () => {
    const create = jest.fn();

    it("should render button successfuly", () => {
        const createButton = render(<CreateButton onClick={() => create()} />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });
        const { container, getByText } = createButton;

        expect(container).toBeTruthy();

        getByText("Create");
    });

    it("should render called function successfully if click the button", () => {
        const createButton = render(<CreateButton onClick={() => create()} />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });
        const { getByText } = createButton;

        fireEvent.click(getByText("Create"));

        expect(create).toHaveBeenCalledTimes(1);
    });

    it("should redirect custom resource route called function successfully if click the button", () => {
        const createButton = render(
            <Route path="/resources/:resource">
                <CreateButton resourceName="categories" />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [
                        { name: "posts" },
                        { name: "categories", route: "categories" },
                    ],
                    routerInitialEntries: ["/resources/posts"],
                }),
            },
        );
        const { getByText } = createButton;

        fireEvent.click(getByText("Create"));

        expect(mHistory.push).toBeCalledWith("/resources/categories/create");
    });

    it("should redirect create route called function successfully if click the button", () => {
        const createButton = render(
            <Route path="/resources/:resource">
                <CreateButton />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts", route: "posts" }],
                    routerInitialEntries: ["/resources/posts"],
                }),
            },
        );
        const { getByText } = createButton;

        fireEvent.click(getByText("Create"));

        expect(mHistory.push).toBeCalledWith("/resources/posts/create");
    });
});
