import React from "react";
import { Route, Routes } from "react-router-dom";

import { act, fireEvent, render, TestWrapper } from "@test";
import { ListButton } from "./";

describe("List Button", () => {
    const list = jest.fn();

    beforeAll(() => {
        jest.useFakeTimers();
    });

    it("should render button successfuly", async () => {
        const { container, getByText } = render(
            <ListButton
                onClick={() => list()}
                resourceNameOrRouteName="posts-light"
            />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts-light" }],
                }),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        getByText("Posts lights");

        expect(container).toBeTruthy();
    });

    it("should render label as children if specified", async () => {
        const { container, getByText } = render(
            <Routes>
                <Route path="/:resource" element={<ListButton />}></Route>
            </Routes>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts", options: { label: "test" } }],
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();
        getByText("Tests");
    });

    it("should render text by children", async () => {
        const { container, getByText } = render(
            <ListButton>refine</ListButton>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();

        getByText("refine");
    });

    it("should render without text show only icon", async () => {
        const { container, queryByText } = render(<ListButton hideText />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();

        expect(queryByText("Posts")).not.toBeInTheDocument();
    });

    it("should be disabled when user not have access", async () => {
        const { container, getByText } = render(<ListButton>List</ListButton>, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
                accessControlProvider: {
                    can: () => Promise.resolve({ can: false }),
                },
            }),
        });

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();

        expect(getByText("List").closest("button")).toBeDisabled();
    });

    it("should skip access control", async () => {
        const { container, getByText } = render(
            <ListButton ignoreAccessControlProvider>List</ListButton>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                    accessControlProvider: {
                        can: () => Promise.resolve({ can: false }),
                    },
                }),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();

        expect(getByText("List").closest("button")).not.toBeDisabled();
    });

    it("should successfully return disabled button custom title", async () => {
        const { container, getByText } = render(<ListButton>List</ListButton>, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
                accessControlProvider: {
                    can: () =>
                        Promise.resolve({
                            can: false,
                            reason: "Access Denied",
                        }),
                },
            }),
        });

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();

        expect(getByText("List").closest("button")).toBeDisabled();
        expect(getByText("List").closest("button")?.getAttribute("title")).toBe(
            "Access Denied",
        );
    });

    it("should redirect with custom route called function successfully if click the button", async () => {
        const { getByText } = render(
            <Routes>
                <Route
                    path="/:resource"
                    element={
                        <ListButton resourceNameOrRouteName="custom-route-posts" />
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

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await act(async () => {
            fireEvent.click(getByText("Posts"));
        });

        expect(window.location.pathname).toBe("/custom-route-posts");
    });
});
