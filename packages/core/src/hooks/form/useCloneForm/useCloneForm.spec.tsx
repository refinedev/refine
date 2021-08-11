import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { Route } from "react-router-dom";

import { MockJSONServer, TestWrapper } from "@test";
import { posts } from "@test/dataMocks";

import { useCloneForm } from "./useCloneForm";

const Wrapper = TestWrapper({
    dataProvider: MockJSONServer,
    routerInitialEntries: ["/posts/create/1"],
});

const WrapperWithRoute: React.FC = ({ children }) => (
    <Wrapper>
        <Route path="/:resource/:action/:id">{children}</Route>
    </Wrapper>
);
describe("useCloneForm Hook", () => {
    it("fetches data and puts in the form", async () => {
        const { result, waitFor } = renderHook(
            () => useCloneForm({ resource: { name: "posts" } }),
            {
                wrapper: WrapperWithRoute,
            },
        );

        await waitFor(() => {
            return !result.current.formLoading;
        });

        expect(result.current.form.getFieldValue("title")).toEqual(
            posts[0].title,
        );
    });
});
