import React from "react";
import { Route, Routes } from "react-router-dom";
import { buttonCloneTests } from "@pankod/refine-ui-tests";

import { fireEvent, render, TestWrapper, act } from "@test";
import { CloneButton } from "./";

describe("Clone Button", () => {
    beforeAll(() => {
        jest.spyOn(console, "warn").mockImplementation(jest.fn());
        jest.useFakeTimers();
    });

    buttonCloneTests.bind(this)(CloneButton);

    it("should create page redirect clone route called function successfully if click the button", async () => {
        const { getByText } = render(
            <Routes>
                <Route
                    path="/:resource"
                    element={<CloneButton recordItemId="1" />}
                />
            </Routes>,
            {
                wrapper: TestWrapper({
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await act(async () => {
            fireEvent.click(getByText("Clone"));
        });

        expect(window.location.pathname).toBe("/posts/clone/1");
    });

    it("should edit page redirect clone route called function successfully if click the button", async () => {
        const { getByText } = render(
            <Routes>
                <Route
                    path="/:resource/:action/:id"
                    element={<CloneButton />}
                />
            </Routes>,
            {
                wrapper: TestWrapper({
                    routerInitialEntries: ["/posts/edit/1"],
                }),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await act(async () => {
            fireEvent.click(getByText("Clone"));
        });

        expect(window.location.pathname).toBe("/posts/clone/1");
    });

    it("should custom resource and recordItemId redirect clone route called function successfully if click the button", async () => {
        const { getByText } = render(
            <Routes>
                <Route
                    path="/:resource"
                    element={
                        <CloneButton
                            resourceName="categories"
                            recordItemId="1"
                        />
                    }
                />
            </Routes>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }, { name: "categories" }],
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await act(async () => {
            fireEvent.click(getByText("Clone"));
        });

        expect(window.location.pathname).toBe("/categories/clone/1");
    });

    it("should redirect with custom route called function successfully if click the button", async () => {
        const { getByText } = render(
            <Routes>
                <Route
                    path="/:resource"
                    element={
                        <CloneButton
                            resourceNameOrRouteName="custom-route-posts"
                            recordItemId="1"
                        />
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
            fireEvent.click(getByText("Clone"));
        });

        expect(window.location.pathname).toBe("/custom-route-posts/clone/1");
    });
});
