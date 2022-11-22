import React from "react";
import renderer, { act } from "react-test-renderer";
import { Route, Routes } from "react-router-dom";

import { TestWrapper } from "@test";
import { EditInferencer } from "../edit";

describe("AntdEditInferencer", () => {
    it("should match the snapshot", async () => {
        const Wrapper = TestWrapper({
            routerInitialEntries: ["/posts/edit/11"],
        });

        const node = renderer.create(
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
            await new Promise((resolve) => setTimeout(resolve, 5000));
        });

        const tree = node.toJSON();

        expect(tree).toMatchSnapshot();
    });
});
