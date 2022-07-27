import { renderHook } from "@testing-library/react";

import { TestWrapper } from "@test";

import { useSubscription } from "./";

const onLiveEventMock = jest.fn();
describe("useSubscribe Hook", () => {
    it("useSubscribe enabled and all types", async () => {
        const onSubscribeMock = jest.fn();

        const subscriptionParams = {
            channel: "channel",
            onLiveEvent: onLiveEventMock,
        };
        renderHook(
            () =>
                useSubscription({
                    channel: "channel",
                    onLiveEvent: onLiveEventMock,
                }),
            {
                wrapper: TestWrapper({
                    liveProvider: {
                        subscribe: onSubscribeMock,
                        unsubscribe: () => jest.fn(),
                        publish: () => jest.fn(),
                    },
                }),
            },
        );

        expect(onSubscribeMock).toBeCalled();
        expect(onSubscribeMock).toHaveBeenCalledWith({
            channel: subscriptionParams.channel,
            callback: subscriptionParams.onLiveEvent,
            params: undefined,
            types: ["*"],
        });
    });

    it("useSubscribe enabled false", async () => {
        const onSubscribeMock = jest.fn();

        renderHook(
            () =>
                useSubscription({
                    channel: "channel",
                    onLiveEvent: onLiveEventMock,
                    enabled: false,
                }),
            {
                wrapper: TestWrapper({
                    liveProvider: {
                        subscribe: onSubscribeMock,
                        unsubscribe: () => jest.fn(),
                        publish: () => jest.fn(),
                    },
                }),
            },
        );

        expect(onSubscribeMock).not.toBeCalled();
    });

    it("useSubscribe spesific type", async () => {
        const onSubscribeMock = jest.fn();

        const subscriptionParams = {
            channel: "channel",
            onLiveEvent: onLiveEventMock,
        };
        renderHook(
            () =>
                useSubscription({
                    channel: "channel",
                    onLiveEvent: onLiveEventMock,
                    types: ["test", "test2"],
                }),
            {
                wrapper: TestWrapper({
                    liveProvider: {
                        subscribe: onSubscribeMock,
                        unsubscribe: () => jest.fn(),
                        publish: () => jest.fn(),
                    },
                }),
            },
        );

        expect(onSubscribeMock).toBeCalled();
        expect(onSubscribeMock).toHaveBeenCalledWith({
            channel: subscriptionParams.channel,
            callback: subscriptionParams.onLiveEvent,
            params: undefined,
            types: ["test", "test2"],
        });
    });

    it("useSubscribe calls unsubscribe on unmount", async () => {
        const onSubscribeMock = jest.fn(() => true);
        const onUnsubscribeMock = jest.fn();

        const subscriptionParams = {
            channel: "channel",
            onLiveEvent: onLiveEventMock,
        };
        const { unmount } = renderHook(
            () =>
                useSubscription({
                    channel: "channel",
                    onLiveEvent: onLiveEventMock,
                }),
            {
                wrapper: TestWrapper({
                    liveProvider: {
                        subscribe: onSubscribeMock,
                        unsubscribe: onUnsubscribeMock,
                        publish: () => jest.fn(),
                    },
                }),
            },
        );

        expect(onSubscribeMock).toBeCalled();
        expect(onSubscribeMock).toHaveBeenCalledWith({
            channel: subscriptionParams.channel,
            callback: subscriptionParams.onLiveEvent,
            params: undefined,
            types: ["*"],
        });

        unmount();
        expect(onUnsubscribeMock).toBeCalledWith(true);
        expect(onUnsubscribeMock).toBeCalledTimes(1);
    });
});
