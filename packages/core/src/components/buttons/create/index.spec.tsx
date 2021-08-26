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
        const { container, getByText } = render(
            <CreateButton onClick={() => create()} />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );

        expect(container).toBeTruthy();

        getByText("Create");
    });

    it("should render text by children", () => {
        const { container, getByText } = render(
            <CreateButton>refine</CreateButton>,
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
        const { container, queryByText } = render(<CreateButton hideText />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });

        expect(container).toBeTruthy();

        expect(queryByText("Create")).not.toBeInTheDocument();
    });

    it("should render called function successfully if click the button", () => {
        const { getByText } = render(
            <CreateButton onClick={() => create()} />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );

        fireEvent.click(getByText("Create"));

        expect(create).toHaveBeenCalledTimes(1);
    });

    it("should redirect custom resource route called function successfully if click the button", () => {
        const { getByText } = render(
            <Route path="/:resource">
                <CreateButton resourceName="categories" />
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

        fireEvent.click(getByText("Create"));

        expect(mHistory.push).toBeCalledWith("/categories/create");
    });

    it("should redirect create route called function successfully if click the button", () => {
        const { getByText } = render(
            <Route path="/:resource">
                <CreateButton />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts", route: "posts" }],
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        fireEvent.click(getByText("Create"));

        expect(mHistory.push).toBeCalledWith("/posts/create");
    });
});
