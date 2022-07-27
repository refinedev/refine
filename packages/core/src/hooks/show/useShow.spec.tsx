import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";

import { MockJSONServer, TestWrapper, act } from "@test";
import { posts } from "@test/dataMocks";

import { useShow } from "./useShow";

const Wrapper = TestWrapper({
    dataProvider: MockJSONServer,
    resources: [{ name: "posts", route: "posts" }],
    routerInitialEntries: ["/posts/show/1"],
});

const WrapperWithRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => (
    <Wrapper>
        <Routes>
            <Route path="/:resource/:action/:id" element={children} />
        </Routes>
    </Wrapper>
);
describe("useShow Hook", () => {
    it("should fetch data with use-query params succesfully", async () => {
        const { result } = renderHook(() => useShow(), {
            wrapper: WrapperWithRoute,
        });

        await waitFor(() => {
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.queryResult.data?.data.id).toEqual(posts[0].id);
    });

    it("should fetch data with hook params succesfully", async () => {
        const { result } = renderHook(
            () => useShow({ resource: "posts", id: "1" }),
            {
                wrapper: WrapperWithRoute,
            },
        );

        await waitFor(() => {
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.queryResult.data?.data.id).toEqual(posts[0].id);
        expect(result.current.showId).toEqual("1");
    });

    it("correctly return id value from options", async () => {
        const { result } = renderHook(
            () =>
                useShow({
                    resource: "categories",
                    id: "2",
                }),
            {
                wrapper: WrapperWithRoute,
            },
        );

        await waitFor(() => {
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.showId).toEqual("2");
    });

    it("correctly return id value from route", async () => {
        const { result } = renderHook(() => useShow(), {
            wrapper: WrapperWithRoute,
        });

        await waitFor(() => {
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.showId).toEqual("1");
    });

    it("correctly return id undefined when route and options is different", async () => {
        const { result } = renderHook(
            () =>
                useShow({
                    resource: "categories",
                }),
            {
                wrapper: WrapperWithRoute,
            },
        );

        expect(result.current.showId).toEqual(undefined);
    });

    it("correctly return id undefined when resource different from route", async () => {
        const { result } = renderHook(
            () =>
                useShow({
                    resource: "categories",
                }),
            {
                wrapper: WrapperWithRoute,
            },
        );

        expect(result.current.showId).toEqual(undefined);
    });

    it("correctly return id when resource different from route", async () => {
        const { result } = renderHook(
            () =>
                useShow({
                    resource: "categories",
                    id: "2",
                }),
            {
                wrapper: WrapperWithRoute,
            },
        );

        await waitFor(() => {
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.showId).toEqual("2");
    });

    it("correctly return id value which was set with setShowId after it was set", async () => {
        const { result } = renderHook(() => useShow(), {
            wrapper: WrapperWithRoute,
        });

        expect(result.current.showId).toEqual("1");

        await act(async () => {
            result.current.setShowId("3");
        });

        expect(result.current.showId).toEqual("3");
    });
});
