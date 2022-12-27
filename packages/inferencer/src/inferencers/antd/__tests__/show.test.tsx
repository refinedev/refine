import React from "react";
import { Route, Routes } from "react-router-dom";

import { render, act, TestWrapper } from "@test";
import { ShowInferencer } from "../show";

xdescribe("AntdShowInferencer", () => {
    it("should match the snapshot", async () => {
        const Wrapper = TestWrapper({
            routerInitialEntries: ["/posts/show/11"],
            resources: [
                {
                    name: "posts",
                    list: () => <div>list</div>,
                    show: ShowInferencer,
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
                        path="/:resource/show/:id"
                        element={<ShowInferencer resource="posts" />}
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
