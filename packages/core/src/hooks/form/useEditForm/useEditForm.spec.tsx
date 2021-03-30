import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { Route } from "react-router-dom";

import { MockJSONServer, TestWrapper } from "@test";
import { posts } from "@test/dataMocks";

import { useEditForm } from "./useEditForm";

const Wrapper = TestWrapper({
    dataProvider: MockJSONServer,
    resources: [{ name: "posts", route: "posts" }],
    routerInitialEntries: ["/resources/posts/edit/1"],
});

const WrapperWithRoute: React.FC = ({ children }) => (
    <Wrapper>
        <Route path="/resources/:resource/:action/:id">{children}</Route>
    </Wrapper>
);
describe("useEditForm Hook", () => {
    it("fetches data and puts in the form", async () => {
        const { result, waitFor } = renderHook(() => useEditForm({}), {
            wrapper: WrapperWithRoute,
        });

        await waitFor(() => {
            return !result.current.isLoading;
        });

        expect(result.current.form.getFieldValue("title")).toEqual(
            posts[0].title,
        );
    });
});
