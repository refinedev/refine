import React from "react";

import { Route, Routes } from "react-router-dom";

import { act, render, TestWrapper } from "@test";
import { Create } from "./";
import { crudCreateTests } from "@pankod/refine-ui-tests";

describe("Create", () => {
    crudCreateTests.bind(this)(Create);

    it("should render breadcrumb", async () => {
        jest.useFakeTimers();

        const { getAllByLabelText } = render(
            <Routes>
                <Route
                    path="/:resource/:action"
                    element={<Create resource="posts" />}
                />
            </Routes>,
            {
                wrapper: TestWrapper({
                    routerInitialEntries: ["/posts/create"],
                }),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(getAllByLabelText("breadcrumb")).not.toBeNull();
    });
    it("should not render breadcrumb", async () => {
        jest.useFakeTimers();

        const { queryByLabelText } = render(
            <Routes>
                <Route
                    path="/:resource/:action"
                    element={<Create resource="posts" breadcrumb={null} />}
                />
            </Routes>,
            {
                wrapper: TestWrapper({
                    routerInitialEntries: ["/posts/create"],
                }),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(queryByLabelText("breadcrumb")).not.toBeInTheDocument();
    });
});
