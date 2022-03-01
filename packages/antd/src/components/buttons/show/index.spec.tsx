import React from "react";
import ReactRouterDom, { Route } from "react-router-dom";

import { fireEvent, render, TestWrapper, waitFor } from "@test";
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
                wrapper: TestWrapper({}),
            },
        );

        expect(container).toBeTruthy();

        getByText("Show");
    });

    it("should render text by children", () => {
        const { container, getByText } = render(
            <ShowButton>refine</ShowButton>,
            {
                wrapper: TestWrapper({}),
            },
        );

        expect(container).toBeTruthy();

        getByText("refine");
    });

    it("should render without text show only icon", () => {
        const { container, queryByText } = render(<ShowButton hideText />, {
            wrapper: TestWrapper({}),
        });

        expect(container).toBeTruthy();

        expect(queryByText("Show")).not.toBeInTheDocument();
    });

    it("should be disabled when user not have access", async () => {
        const { container, getByText } = render(<ShowButton>Show</ShowButton>, {
            wrapper: TestWrapper({
                accessControlProvider: {
                    can: () => Promise.resolve({ can: false }),
                },
            }),
        });

        expect(container).toBeTruthy();

        await waitFor(() =>
            expect(getByText("Show").closest("button")).toBeDisabled(),
        );
    });

    it("should be disabled when recordId not allowed", async () => {
        const { container, getByText } = render(
            <ShowButton recordItemId="1">Show</ShowButton>,
            {
                wrapper: TestWrapper({
                    accessControlProvider: {
                        can: ({ params }) => {
                            if (params.id === "1") {
                                return Promise.resolve({ can: false });
                            }
                            return Promise.resolve({ can: true });
                        },
                    },
                }),
            },
        );

        expect(container).toBeTruthy();

        await waitFor(() =>
            expect(getByText("Show").closest("button")).toBeDisabled(),
        );
    });

    it("should skip access control", async () => {
        const { container, getByText } = render(
            <ShowButton ignoreAccessControlProvider>Show</ShowButton>,
            {
                wrapper: TestWrapper({
                    accessControlProvider: {
                        can: () => Promise.resolve({ can: false }),
                    },
                }),
            },
        );

        expect(container).toBeTruthy();

        await waitFor(() =>
            expect(getByText("Show").closest("button")).not.toBeDisabled(),
        );
    });

    it("should successfully return disabled button custom title", async () => {
        const { container, getByText } = render(<ShowButton>Show</ShowButton>, {
            wrapper: TestWrapper({
                accessControlProvider: {
                    can: () =>
                        Promise.resolve({
                            can: false,
                            reason: "Access Denied",
                        }),
                },
            }),
        });

        expect(container).toBeTruthy();

        await waitFor(() =>
            expect(getByText("Show").closest("button")).not.toBeDisabled(),
        );
        await waitFor(() =>
            expect(
                getByText("Show").closest("button")?.getAttribute("title"),
            ).toBe("Access Denied"),
        );
    });

    it("should render called function successfully if click the button", () => {
        const { getByText } = render(<ShowButton onClick={() => show()} />, {
            wrapper: TestWrapper({}),
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
                    resources: [{ name: "posts" }],
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
                    resources: [{ name: "posts" }],
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
                    resources: [{ name: "posts" }, { name: "categories" }],
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        fireEvent.click(getByText("Show"));

        expect(mHistory.push).toBeCalledWith("/categories/show/1");
    });
});
