import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useList } from "./useList";
import { IRefineContextProvider } from "../../interfaces";

const mockRefineProvider: IRefineContextProvider = {
    hasDashboard: false,
    mutationMode: "pessimistic",
    warnWhenUnsavedChanges: false,
    syncWithLocation: false,
    undoableTimeout: 500,
};

describe("useList Hook", () => {
    it("with rest json server", async () => {
        const { result, waitFor } = renderHook(
            () => useList({ resource: "posts" }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            return result.current.isSuccess;
        });

        const { data } = result.current;

        expect(data?.data).toHaveLength(2);
        expect(data?.total).toEqual(2);
    });

    describe("useResourceSubscription", () => {
        it("useSubscription", async () => {
            const onSubscribeMock = jest.fn();

            renderHook(
                () =>
                    useList({
                        resource: "posts",
                    }),
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

            expect(onSubscribeMock).toBeCalled();
            expect(onSubscribeMock).toHaveBeenCalledWith({
                channel: "resources/posts",
                callback: expect.any(Function),
                params: undefined,
                types: ["*"],
            });
        });

        it("liveMode = Off useSubscription", async () => {
            const onSubscribeMock = jest.fn();

            renderHook(
                () =>
                    useList({
                        resource: "posts",
                    }),
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

            expect(onSubscribeMock).not.toBeCalled();
        });

        it("liveMode = Off and liveMode hook param auto", async () => {
            const onSubscribeMock = jest.fn();

            renderHook(() => useList({ resource: "posts", liveMode: "auto" }), {
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
            });

            expect(onSubscribeMock).toBeCalled();
        });

        it("unsubscribe call on unmount", async () => {
            const onSubscribeMock = jest.fn(() => true);
            const onUnsubscribeMock = jest.fn();

            const { unmount } = renderHook(
                () =>
                    useList({
                        resource: "posts",
                    }),
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

            expect(onSubscribeMock).toBeCalled();

            unmount();
            expect(onUnsubscribeMock).toBeCalledWith(true);
            expect(onUnsubscribeMock).toBeCalledTimes(1);
        });
    });
});
