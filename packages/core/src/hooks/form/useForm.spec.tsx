import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper, act } from "@test";
import { useForm } from "./useForm";

import React from "react";
import { Route, Routes } from "react-router-dom";

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

const EditWrapperWithRoute: React.FC<{
    children?: React.ReactNode;
}> = ({ children }) => (
    <EditWrapper>
        <Routes>
            <Route path="/:resource/:action/:id" element={children} />
        </Routes>
    </EditWrapper>
);

const CloneWrapperWithRoute: React.FC<{
    children?: React.ReactNode;
}> = ({ children }) => (
    <CloneWrapper>
        <Routes>
            <Route path="/:resource/:action/:id" element={children} />
        </Routes>
    </CloneWrapper>
);

describe("useForm Hook", () => {
    it("renders with form", async () => {
        const { result } = renderHook(() => useForm({ resource: "posts" }), {
            wrapper: SimpleWrapper,
        });

        await waitFor(() => {
            expect(result.current.formLoading).toBeDefined();
        });
    });

    it("fetches data and puts in the form", async () => {
        const { result } = renderHook(() => useForm({ resource: "posts" }), {
            wrapper: EditWrapperWithRoute,
        });

        await waitFor(() => {
            expect(!result.current.formLoading).toBeTruthy();
        });

        expect(result.current.queryResult?.data?.data.title).toEqual(
            posts[0].title,
        );
    });

    it("correctly render edit form from route", async () => {
        const { result } = renderHook(() => useForm(), {
            wrapper: EditWrapperWithRoute,
        });

        await waitFor(() => {
            expect(!result.current.formLoading).toBeTruthy();
        });

        expect(result.current.id).toEqual("1");
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

        await waitFor(() => {
            expect(!result.current.formLoading).toBeTruthy();
        });

        expect(result.current.id).toEqual("1");
    });

    it("correctly return id value from props", async () => {
        const { result } = renderHook(
            () =>
                useForm({
                    resource: "posts",
                    id: 2,
                }),
            {
                wrapper: EditWrapperWithRoute,
            },
        );

        await waitFor(() => {
            expect(!result.current.formLoading).toBeTruthy();
        });

        expect(result.current.queryResult?.data?.data.title).toEqual(
            posts[0].title,
        );
        expect(result.current.id).toEqual(2);
    });

    it("correctly return id value from route with custom resource", async () => {
        const { result } = renderHook(
            () =>
                useForm({
                    resource: "categories",
                    action: "edit",
                    id: 2,
                }),
            {
                wrapper: EditWrapperWithRoute,
            },
        );

        await waitFor(() => {
            expect(!result.current.formLoading).toBeTruthy();
        });

        expect(result.current.queryResult?.data?.data.title).toEqual(
            posts[0].title,
        );

        expect(result.current.id).toEqual(2);
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

        await act(async () => {
            result.current.setId?.("3");
        });

        expect(result.current.id).toEqual("3");
    });

    it("correctly return id undefined when route and options is different", async () => {
        const { result } = renderHook(
            () =>
                useForm({
                    resource: "categories",
                }),
            {
                wrapper: EditWrapperWithRoute,
            },
        );

        expect(result.current.id).toEqual(undefined);
    });

    it("fetches data and puts in the form while cloning", async () => {
        const { result } = renderHook(() => useForm({ resource: "posts" }), {
            wrapper: CloneWrapperWithRoute,
        });

        await waitFor(() => {
            expect(!result.current.formLoading).toBeTruthy();
        });

        expect(result.current.queryResult?.data?.data.title).toEqual(
            posts[0].title,
        );
    });
});
