import React from "react";
import { Route, Routes } from "react-router-dom";

import { render, act, TestWrapper } from "@test";
import { EditInferencer } from "../edit";

describe("ChakraEditInferencer", () => {
    it("should match the snapshot", async () => {
        const Wrapper = TestWrapper({
            routerInitialEntries: ["/posts/edit/11"],
            resources: [
                {
                    name: "posts",
                    list: () => <div>list</div>,
                    edit: EditInferencer,
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
                        path="/:resource/edit/:id"
                        element={<EditInferencer resource="posts" />}
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
