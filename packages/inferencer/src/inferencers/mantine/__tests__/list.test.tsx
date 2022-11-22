import React from "react";
import { Route, Routes } from "react-router-dom";

import { render, act, TestWrapper } from "@test";
import { ListInferencer } from "../list";

describe("MantineListInferencer", () => {
    it("should match the snapshot", async () => {
        const Wrapper = TestWrapper({
            routerInitialEntries: ["/posts"],
            resources: [
                {
                    name: "posts",
                    list: ListInferencer,
                },
                {
                    name: "categories",
                },
                {
                    name: "tags",
                },
                { name: "users" },
            ],
        });

        const rendering = render(
            <Wrapper>
                <Routes>
                    <Route
                        path="/:resource"
                        element={<ListInferencer resource="posts" />}
                    />
                </Routes>
            </Wrapper>,
        );

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
        });
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
        });
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
        });
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
        });

        const node = rendering.asFragment();

        expect(node).toMatchSnapshot();
    });
});
