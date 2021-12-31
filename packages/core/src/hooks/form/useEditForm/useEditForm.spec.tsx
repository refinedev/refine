import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { Route } from "react-router-dom";

import { MockJSONServer, TestWrapper, act } from "@test";
import { posts } from "@test/dataMocks";

import { useEditForm } from "./useEditForm";

const Wrapper = TestWrapper({
    dataProvider: MockJSONServer,
    routerInitialEntries: ["/posts/edit/1"],
});

const WrapperWithRoute: React.FC = ({ children }) => (
    <Wrapper>
        <Route path="/:resource/:action/:id">{children}</Route>
    </Wrapper>
);
describe("useEditForm Hook", () => {
    it("fetches data and puts in the form", async () => {
        const { result, waitFor } = renderHook(
            () => useEditForm({ resource: { name: "posts" } }),
            {
                wrapper: WrapperWithRoute,
            },
        );

        await waitFor(() => {
            return !result.current.formLoading;
        });

        expect(result.current.queryResult.data?.data.title).toEqual(
            posts[0].title,
        );
    });

    it("correctly return id value from route", async () => {
        const { result } = renderHook(
            () =>
                useEditForm({
                    resource: {
                        name: "posts",
                    },
                }),
            {
                wrapper: WrapperWithRoute,
            },
        );

        expect(result.current.editId).toEqual("1");
    });

    it("correctly return id value which was set with setEditId after it was set", async () => {
        const { result } = renderHook(
            () =>
                useEditForm({
                    resource: {
                        name: "posts",
                    },
                }),
            {
                wrapper: WrapperWithRoute,
            },
        );

        expect(result.current.editId).toEqual("1");

        act(() => {
            result.current.setEditId?.("3");
        });

        expect(result.current.editId).toEqual("3");
    });
});
