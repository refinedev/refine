import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterBindings } from "@test";

import { useOne } from "./useOne";
import { defaultRefineOptions } from "@contexts/refine";
import { IRefineContextProvider } from "../../interfaces";

const mockRefineProvider: IRefineContextProvider = {
    hasDashboard: false,
    ...defaultRefineOptions,
    options: defaultRefineOptions,
};

describe("useOne Hook", () => {
    it("with rest json server", async () => {
        const { result } = renderHook(
            () => useOne({ resource: "posts", id: "1" }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            expect(!result.current.isLoading).toBeTruthy();
        });

        const { status, data } = result.current;

        expect(status).toBe("success");
        expect(data?.data.slug).toBe("ut-ad-et");
    });

    it("should only pass meta from the hook parameter and query parameters to the dataProvider", async () => {
        const getOneMock = jest.fn();

        renderHook(
            () => useOne({ resource: "posts", meta: { foo: "bar" }, id: "" }),
            {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            getOne: getOneMock,
                        },
                    },
                    routerProvider: mockRouterBindings({
                        params: { baz: "qux" },
                    }),
                    resources: [{ name: "posts", meta: { dip: "dop" } }],
                }),
            },
        );

        await waitFor(() => {
            expect(getOneMock).toBeCalled();
        });

        expect(getOneMock).toBeCalledWith(
            expect.objectContaining({
                meta: expect.objectContaining({
                    foo: "bar",
                    baz: "qux",
                }),
            }),
        );
    });

    describe("useResourceSubscription", () => {
        it("useSubscription", async () => {
            const onSubscribeMock = jest.fn();

            const { result } = renderHook(
                () => useOne({ resource: "posts", id: "1" }),
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{ name: "posts" }],
                        liveProvider: {
                            unsubscribe: jest.fn(),
                            subscribe: onSubscribeMock,
                        },
                        refineProvider: {
                            ...mockRefineProvider,
                            liveMode: "auto",
                        },
                    }),
                },
            );

            await waitFor(() => {
                expect(!result.current.isLoading).toBeTruthy();
            });

            expect(onSubscribeMock).toBeCalled();
            expect(onSubscribeMock).toHaveBeenCalledWith({
                channel: "resources/posts",
                callback: expect.any(Function),
                params: expect.objectContaining({
                    ids: ["1"],
                    id: "1",
                    resource: "posts",
                    subscriptionType: "useOne",
                }),
                types: ["*"],
            });
        });

        it("liveMode = Off useSubscription", async () => {
            const onSubscribeMock = jest.fn();

            const { result } = renderHook(
                () => useOne({ resource: "posts", id: "1" }),
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{ name: "posts" }],
                        liveProvider: {
                            unsubscribe: jest.fn(),
                            subscribe: onSubscribeMock,
                        },
                        refineProvider: {
                            ...mockRefineProvider,
                            liveMode: "off",
                        },
                    }),
                },
            );

            await waitFor(() => {
                expect(!result.current.isLoading).toBeTruthy();
            });

            expect(onSubscribeMock).not.toBeCalled();
        });

        it("liveMode = Off and liveMode hook param auto", async () => {
            const onSubscribeMock = jest.fn();

            const { result } = renderHook(
                () => useOne({ resource: "posts", id: "1", liveMode: "auto" }),
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{ name: "posts" }],
                        liveProvider: {
                            unsubscribe: jest.fn(),
                            subscribe: onSubscribeMock,
                        },
                        refineProvider: {
                            ...mockRefineProvider,
                            liveMode: "off",
                        },
                    }),
                },
            );

            await waitFor(() => {
                expect(!result.current.isLoading).toBeTruthy();
            });

            expect(onSubscribeMock).toBeCalled();
        });

        it("unsubscribe call on unmount", async () => {
            const onSubscribeMock = jest.fn(() => true);
            const onUnsubscribeMock = jest.fn();

            const { result, unmount } = renderHook(
                () => useOne({ resource: "posts", id: "1" }),
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{ name: "posts" }],
                        liveProvider: {
                            unsubscribe: onUnsubscribeMock,
                            subscribe: onSubscribeMock,
                        },
                        refineProvider: {
                            ...mockRefineProvider,
                            liveMode: "auto",
                        },
                    }),
                },
            );

            await waitFor(() => {
                expect(!result.current.isLoading).toBeTruthy();
            });

            expect(onSubscribeMock).toBeCalled();

            unmount();
            expect(onUnsubscribeMock).toBeCalledWith(true);
            expect(onUnsubscribeMock).toBeCalledTimes(1);
        });
    });
});
