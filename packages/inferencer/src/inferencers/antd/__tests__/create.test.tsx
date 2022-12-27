import React from "react";
import { Route, Routes } from "react-router-dom";

import { render, act, TestWrapper } from "@test";
import { CreateInferencer } from "../create";

xdescribe("AntdCreateInferencer", () => {
    it("should match the snapshot", async () => {
        const Wrapper = TestWrapper({
            routerInitialEntries: ["/posts/create"],
            resources: [
                {
                    name: "posts",
                    list: () => <div>list</div>,
                    create: CreateInferencer,
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
                        path="/:resource/create"
                        element={<CreateInferencer resource="posts" />}
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

        const node = rendering.asFragment();

        expect(node).toMatchSnapshot();
    });
});
