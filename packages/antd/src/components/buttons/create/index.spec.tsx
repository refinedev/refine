import React from "react";
import ReactRouterDom, { Route, Routes } from "react-router-dom";

import { fireEvent, render, TestWrapper, waitFor } from "@test";
import { CreateButton } from "./";

const mHistory = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useNavigate: () => mHistory,
}));

describe("Create Button", () => {
    const create = jest.fn();

    it("should render button successfuly", () => {
        const { container, getByText } = render(
            <CreateButton onClick={() => create()} />,
            {
                wrapper: TestWrapper({}),
            },
        );

        expect(container).toBeTruthy();

        getByText("Create");
    });

    it("should render text by children", () => {
        const { container, getByText } = render(
            <CreateButton>refine</CreateButton>,
            {
                wrapper: TestWrapper({}),
            },
        );

        expect(container).toBeTruthy();

        getByText("refine");
    });

    it("should render without text show only icon", () => {
        const { container, queryByText } = render(<CreateButton hideText />, {
            wrapper: TestWrapper({}),
        });

        expect(container).toBeTruthy();
        expect(queryByText("Create")).not.toBeInTheDocument();
    });

    it("should be disabled when user not have access", async () => {
        const { container, getByText } = render(
            <CreateButton>Create</CreateButton>,
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
            expect(getByText("Create").closest("button")).toBeDisabled(),
        );
    });

    it("should skip access control", async () => {
        const { container, getByText } = render(
            <CreateButton ignoreAccessControlProvider>Create</CreateButton>,
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
            expect(getByText("Create").closest("button")).not.toBeDisabled(),
        );
    });

    it("should successfully return disabled button custom title", async () => {
        const { container, getByText } = render(
            <CreateButton>Create</CreateButton>,
            {
                wrapper: TestWrapper({
                    accessControlProvider: {
                        can: () =>
                            Promise.resolve({
                                can: false,
                                reason: "Access Denied",
                            }),
                    },
                }),
            },
        );

        expect(container).toBeTruthy();

        await waitFor(() =>
            expect(getByText("Create").closest("button")).not.toBeDisabled(),
        );
        await waitFor(() =>
            expect(
                getByText("Create").closest("button")?.getAttribute("title"),
            ).toBe("Access Denied"),
        );
    });

    it("should render called function successfully if click the button", () => {
        const { getByText } = render(
            <CreateButton onClick={() => create()} />,
            {
                wrapper: TestWrapper({}),
            },
        );

        fireEvent.click(getByText("Create"));

        expect(create).toHaveBeenCalledTimes(1);
    });

    it("should redirect custom resource route called function successfully if click the button", () => {
        const { getByText } = render(
            <Routes>
                <Route
                    path="/:resource"
                    element={<CreateButton resourceName="categories" />}
                />
            </Routes>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }, { name: "categories" }],
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        fireEvent.click(getByText("Create"));

        expect(mHistory).toBeCalledWith("/categories/create");
    });

    it("should redirect create route called function successfully if click the button", () => {
        const { getByText } = render(
            <Routes>
                <Route path="/:resource" element={<CreateButton />} />
            </Routes>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        fireEvent.click(getByText("Create"));

        expect(mHistory).toBeCalledWith("/posts/create");
    });

    it("should redirect with custom route called function successfully if click the button", () => {
        const { getByText } = render(
            <Routes>
                <Route
                    path="/:resource"
                    element={
                        <CreateButton resourceNameOrRouteName="custom-route-posts" />
                    }
                />
            </Routes>,
            {
                wrapper: TestWrapper({
                    resources: [
                        {
                            name: "posts",
                            options: { route: "custom-route-posts" },
                        },
                        { name: "posts" },
                    ],
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        fireEvent.click(getByText("Create"));

        expect(mHistory).toBeCalledWith("/custom-route-posts/create");
    });
});
