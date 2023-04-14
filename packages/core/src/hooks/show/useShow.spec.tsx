import React from "react";
import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper, act } from "@test";
import { mockRouterBindings, posts } from "@test/dataMocks";

import { useShow } from "./useShow";

const Wrapper = TestWrapper({
    dataProvider: MockJSONServer,
    resources: [{ name: "posts" }],
    routerProvider: mockRouterBindings({
        action: "show",
        resource: { name: "posts" },
        id: "1",
        pathname: "/posts/show/1",
    }),
});

const WrapperWithRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => <Wrapper>{children}</Wrapper>;
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

    it("correctly return id value after its updated with a new value", async () => {
        const { result, rerender } = renderHook(({ id }) => useShow({ id }), {
            wrapper: WrapperWithRoute,
            initialProps: { id: "1" },
        });

        await waitFor(() => expect(result.current.showId).toEqual("1"));

        await act(async () => {
            rerender({ id: "2" });
        });

        await waitFor(() => expect(result.current.showId).toEqual("2"));
    });

    it("should pass meta from resource defination, hook parameter and query parameters to dataProvider", async () => {
        const getOneMock = jest.fn();

        renderHook(() => useShow({ resource: "posts", meta: { foo: "bar" } }), {
            wrapper: TestWrapper({
                dataProvider: {
                    default: {
                        ...MockJSONServer.default,
                        getOne: getOneMock,
                    },
                },
                routerProvider: mockRouterBindings({
                    action: "show",
                    resource: { name: "posts" },
                    id: "1",
                    pathname: "/posts/show/1",
                    params: { baz: "qux" },
                }),
                resources: [{ name: "posts", meta: { dip: "dop" } }],
            }),
        });

        await waitFor(() => {
            expect(getOneMock).toBeCalled();
        });

        expect(getOneMock).toBeCalledWith(
            expect.objectContaining({
                meta: expect.objectContaining({
                    foo: "bar",
                    baz: "qux",
                    dip: "dop",
                }),
            }),
        );
    });

    it("two resources with same name, should pass resource meta according to identifier", async () => {
        const getOneMock = jest.fn();

        renderHook(() => useShow({ resource: "recentPosts", id: "1" }), {
            wrapper: TestWrapper({
                dataProvider: {
                    default: {
                        ...MockJSONServer.default,
                        getOne: getOneMock,
                    },
                },
                routerProvider: mockRouterBindings({
                    action: "show",
                    resource: { name: "posts" },
                    id: "1",
                    pathname: "/posts/show/1",
                }),
                resources: [
                    {
                        name: "posts",
                        identifier: "recentPosts",
                        meta: {
                            startDate: "2021-01-01",
                        },
                    },
                    {
                        name: "posts",
                        identifier: "popularPosts",
                        meta: {
                            likes: 100,
                        },
                    },
                ],
            }),
        });

        await waitFor(() => {
            expect(getOneMock).toBeCalled();
        });

        expect(getOneMock).toBeCalledWith(
            expect.objectContaining({
                meta: expect.objectContaining({
                    startDate: "2021-01-01",
                }),
            }),
        );

        expect(getOneMock).not.toBeCalledWith(
            expect.objectContaining({
                meta: expect.objectContaining({
                    likes: 100,
                }),
            }),
        );
    });
});
