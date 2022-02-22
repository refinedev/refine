import { renderHook } from "@testing-library/react-hooks";

import { TestWrapper } from "@test";

import { useResourceSubscription } from "./";
import { IRefineContextProvider } from "../../../interfaces";

const mockRefineProvider: IRefineContextProvider = {
    hasDashboard: false,
    mutationMode: "pessimistic",
    warnWhenUnsavedChanges: false,
    syncWithLocation: false,
    undoableTimeout: 500,
};

const onLiveEventMock = jest.fn();
describe("useResourceSubscription Hook", () => {
    it("useResourceSubscription enabled and all types", async () => {
        const onSubscribeMock = jest.fn();

        const subscriptionParams = {
            channel: "channel",
            onLiveEvent: onLiveEventMock,
        };
        renderHook(
            () =>
                useResourceSubscription({
                    onLiveEvent: onLiveEventMock,
                    channel: subscriptionParams.channel,
                    resource: "posts",
                    types: ["*"],
                }),
            {
                wrapper: TestWrapper({
                    liveProvider: {
                        subscribe: onSubscribeMock,
                        unsubscribe: () => jest.fn(),
                        publish: () => jest.fn(),
                    },
                    refineProvider: {
                        ...mockRefineProvider,
                        liveMode: "auto",
                    },
                }),
            },
        );

        expect(onSubscribeMock).toBeCalled();
    });

    it("useResourceSubscription liveMode off", async () => {
        const onSubscribeMock = jest.fn();

        const subscriptionParams = {
            channel: "channel",
            onLiveEvent: onLiveEventMock,
        };
        renderHook(
            () =>
                useResourceSubscription({
                    onLiveEvent: onLiveEventMock,
                    channel: subscriptionParams.channel,
                    resource: "posts",
                    types: ["*"],
                }),
            {
                wrapper: TestWrapper({
                    liveProvider: {
                        subscribe: onSubscribeMock,
                        unsubscribe: () => jest.fn(),
                        publish: () => jest.fn(),
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

    it("useResourceSubscription liveMode on context off, params auto", async () => {
        const onSubscribeMock = jest.fn();

        const subscriptionParams = {
            channel: "channel",
            onLiveEvent: onLiveEventMock,
        };
        renderHook(
            () =>
                useResourceSubscription({
                    onLiveEvent: onLiveEventMock,
                    channel: subscriptionParams.channel,
                    resource: "posts",
                    types: ["*"],
                    liveMode: "auto",
                }),
            {
                wrapper: TestWrapper({
                    liveProvider: {
                        subscribe: onSubscribeMock,
                        unsubscribe: () => jest.fn(),
                        publish: () => jest.fn(),
                    },
                    refineProvider: {
                        ...mockRefineProvider,
                        liveMode: "off",
                    },
                }),
            },
        );

        expect(onSubscribeMock).toBeCalled();
    });

    it("useResourceSubscription subscribe undefined", async () => {
        const onSubscribeMock = jest.fn();

        const subscriptionParams = {
            channel: "channel",
            onLiveEvent: onLiveEventMock,
        };
        renderHook(
            () =>
                useResourceSubscription({
                    channel: subscriptionParams.channel,
                    onLiveEvent: onLiveEventMock,
                    resource: "posts",
                    types: ["*"],
                }),
            {
                wrapper: TestWrapper({
                    refineProvider: {
                        ...mockRefineProvider,
                        liveMode: "auto",
                    },
                }),
            },
        );

        expect(onSubscribeMock).not.toBeCalled();
    });

    it("useResourceSubscription calls unsubscribe on unmount", async () => {
        const onSubscribeMock = jest.fn(() => true);
        const onUnsubscribeMock = jest.fn();

        const subscriptionParams = {
            channel: "channel",
            onLiveEvent: onLiveEventMock,
        };
        const { unmount } = renderHook(
            () =>
                useResourceSubscription({
                    onLiveEvent: onLiveEventMock,
                    channel: subscriptionParams.channel,
                    resource: "posts",
                    types: ["*"],
                }),
            {
                wrapper: TestWrapper({
                    liveProvider: {
                        subscribe: onSubscribeMock,
                        unsubscribe: onUnsubscribeMock,
                        publish: () => jest.fn(),
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
