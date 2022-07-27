import React from "react";
import { Route, Routes } from "react-router-dom";
import { buttonCreateTests } from "@pankod/refine-ui-tests";

import { act, fireEvent, render, TestWrapper } from "@test";
import { CreateButton } from "./";

describe("Create Button", () => {
    beforeAll(() => {
        jest.spyOn(console, "warn").mockImplementation(jest.fn());
        jest.useFakeTimers();
    });

    buttonCreateTests.bind(this)(CreateButton);

    const create = jest.fn();

    it("should render called function successfully if click the button", async () => {
        const { getByText } = render(
            <CreateButton onClick={() => create()} />,
            {
                wrapper: TestWrapper({}),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await act(async () => {
            fireEvent.click(getByText("Create"));
        });

        expect(create).toHaveBeenCalledTimes(1);
    });

    it("should redirect create route called function successfully if click the button", async () => {
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

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await act(async () => {
            fireEvent.click(getByText("Create"));
        });

        expect(window.location.pathname).toBe("/posts/create");
    });

    it("should redirect with custom route called function successfully if click the button", async () => {
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

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await act(async () => {
            fireEvent.click(getByText("Create"));
        });

        expect(window.location.pathname).toBe("/custom-route-posts/create");
    });
});
