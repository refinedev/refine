import React from "react";
import renderer, { act } from "react-test-renderer";
import { Route, Routes } from "react-router-dom";

import { TestWrapper } from "@test";
import { ListInferencer } from "../list";

describe("AntdListInferencer", () => {
    it("should match the snapshot", async () => {
        let node: any;

        await act(async () => {
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

            node = renderer.create(
                <Wrapper>
                    <Routes>
                        <Route
                            path="/:resource"
                            element={<ListInferencer resource="posts" />}
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
