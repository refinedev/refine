import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { Route } from "react-router-dom";

import { MockJSONServer, TestWrapper } from "@test";

import { useCreateForm } from "./useCreateForm";

const Wrapper = TestWrapper({
    dataProvider: MockJSONServer,
    resources: [{ name: "posts", route: "posts" }],
    routerInitialEntries: ["/resources/posts/create/1"],
});

const WrapperWithRoute: React.FC = ({ children }) => (
    <Wrapper>
        <Route path="/resources/:resource/:action/:id">{children}</Route>
    </Wrapper>
);
describe("useCreateForm Hook", () => {
    it("renders with form", async () => {
        const { result } = renderHook(() => useCreateForm(), {
            wrapper: WrapperWithRoute,
        });

        expect(result.current.form).toBeDefined();
    });
});
