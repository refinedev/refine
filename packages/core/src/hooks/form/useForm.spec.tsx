import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper, act } from "@test";
import { useForm } from "./useForm";

import React from "react";

import { posts } from "@test/dataMocks";
import { mockRouterBindings } from "@test";

const SimpleWrapper = TestWrapper({});

const EditWrapper = TestWrapper({
    dataProvider: MockJSONServer,
    routerProvider: mockRouterBindings({
        resource: {
            name: "posts",
        },
        action: "edit",
        id: "1",
    }),
});

const CloneWrapper = TestWrapper({
    dataProvider: MockJSONServer,
    routerProvider: mockRouterBindings({
        resource: {
            name: "posts",
        },
        action: "clone",
        id: "1",
    }),
});

const EditWrapperWithRoute: React.FC<{
    children?: React.ReactNode;
}> = ({ children }) => <EditWrapper>{children}</EditWrapper>;

const CloneWrapperWithRoute: React.FC<{
    children?: React.ReactNode;
}> = ({ children }) => <CloneWrapper>{children}</CloneWrapper>;

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

    it("correctly return id value after its updated with a new value", async () => {
        const { result, rerender } = renderHook(
            ({ id }) =>
                useForm({
                    resource: "posts",
                    id,
                }),
            {
                wrapper: EditWrapperWithRoute,
                initialProps: {
                    id: "1",
                },
            },
        );

        await waitFor(() => expect(result.current.id).toEqual("1"));

        await act(async () => {
            rerender({ id: "2" });
        });

        await waitFor(() => expect(result.current.id).toEqual("2"));
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

    it("should pass meta from resource defination, hook parameter and query parameters to dataProvider", async () => {
        const getOneMock = jest.fn();

        renderHook(() => useForm({ resource: "posts", meta: { foo: "bar" } }), {
            wrapper: TestWrapper({
                dataProvider: {
                    default: {
                        ...MockJSONServer.default,
                        getOne: getOneMock,
                    },
                },
                routerProvider: mockRouterBindings({
                    action: "edit",
                    resource: { name: "posts" },
                    id: "1",
                    pathname: "/posts/edit/1",
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

        renderHook(() => useForm({ resource: "recentPosts", id: "1" }), {
            wrapper: TestWrapper({
                dataProvider: {
                    default: {
                        ...MockJSONServer.default,
                        getOne: getOneMock,
                    },
                },
                routerProvider: mockRouterBindings({
                    action: "edit",
                    resource: { name: "posts" },
                    id: "1",
                    pathname: "/posts/edit/1",
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
