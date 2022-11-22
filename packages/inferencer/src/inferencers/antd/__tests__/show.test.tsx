import React from "react";
import renderer, { act } from "react-test-renderer";
import { Route, Routes } from "react-router-dom";

import { TestWrapper } from "@test";
import { ShowInferencer } from "../show";

describe("AntdShowInferencer", () => {
    it("should match the snapshot", async () => {
        let node: any;

        await act(async () => {
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

            node = renderer.create(
                <Wrapper>
                    <Routes>
                        <Route
                            path="/:resource/show/:id"
                            element={<ShowInferencer resource="posts" />}
                        />
                    </Routes>
                </Wrapper>,
            );
        });

        // wait for 5 seconds
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 5000));
        });

        const tree = node?.toJSON();

        expect(tree).toMatchSnapshot();
    });
});
