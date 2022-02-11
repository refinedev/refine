import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper, act } from "@test";
import { useForm } from "./useForm";

import React from "react";
import { Route } from "react-router-dom";

import { posts } from "@test/dataMocks";

const SimpleWrapper = TestWrapper({});

const EditWrapper = TestWrapper({
    dataProvider: MockJSONServer,
    routerInitialEntries: ["/posts/edit/1"],
});

const CloneWrapper = TestWrapper({
    dataProvider: MockJSONServer,
    routerInitialEntries: ["/posts/clone/1"],
});

const EditWrapperWithRoute: React.FC = ({ children }) => (
    <EditWrapper>
        <Route path="/:resource/:action/:id">{children}</Route>
    </EditWrapper>
);

const CloneWrapperWithRoute: React.FC = ({ children }) => (
    <CloneWrapper>
        <Route path="/:resource/:action/:id">{children}</Route>
    </CloneWrapper>
);

describe("useForm Hook", () => {
    it("renders with form", async () => {
        const { result } = renderHook(() => useForm({ resource: "posts" }), {
            wrapper: SimpleWrapper,
        });

        expect(result.current.formLoading).toBeDefined();
    });

    it("fetches data and puts in the form", async () => {
        const { result, waitFor } = renderHook(
            () => useForm({ resource: "posts" }),
            {
                wrapper: EditWrapperWithRoute,
            },
        );

        await waitFor(() => {
            return !result.current.formLoading;
        });

        expect(result.current.queryResult?.data?.data.title).toEqual(
            posts[0].title,
        );
    });

    it("correctly return id value from route", async () => {
        const { result } = renderHook(
            () =>
                useForm({
                    resource: "posts",
                }),
            {
                wrapper: EditWrapperWithRoute,
            },
        );

        expect(result.current.id).toEqual("1");
    });

    it("correctly return id value which was set with setId after it was set", async () => {
        const { result } = renderHook(
            () =>
                useForm({
                    resource: "posts",
                }),
            {
                wrapper: EditWrapperWithRoute,
            },
        );

        expect(result.current.id).toEqual("1");

        act(() => {
            result.current.setId?.("3");
        });

        expect(result.current.id).toEqual("3");
    });

    it("fetches data and puts in the form while cloning", async () => {
        const { result, waitFor } = renderHook(
            () => useForm({ resource: "posts" }),
            {
                wrapper: CloneWrapperWithRoute,
            },
        );

        await waitFor(() => {
            return !result.current.formLoading;
        });

        expect(result.current.queryResult?.data?.data.title).toEqual(
            posts[0].title,
        );
    });
});
