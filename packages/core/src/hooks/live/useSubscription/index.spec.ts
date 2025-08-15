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
          meta: {
            dataProviderName: "test",
          },
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

    expect(onSubscribeMock).toHaveBeenCalled();
    expect(onSubscribeMock).toHaveBeenCalledWith({
      channel: subscriptionParams.channel,
      callback: subscriptionParams.onLiveEvent,
      params: undefined,
      types: ["*"],
      meta: {
        dataProviderName: "test",
      },
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

    expect(onSubscribeMock).not.toHaveBeenCalled();
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
          meta: {
            dataProviderName: "default",
          },
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

    expect(onSubscribeMock).toHaveBeenCalled();
    expect(onSubscribeMock).toHaveBeenCalledWith({
      channel: subscriptionParams.channel,
      callback: subscriptionParams.onLiveEvent,
      params: undefined,
      types: ["test", "test2"],
      meta: {
        dataProviderName: "default",
      },
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

    expect(onSubscribeMock).toHaveBeenCalled();
    expect(onSubscribeMock).toHaveBeenCalledWith({
      channel: subscriptionParams.channel,
      callback: subscriptionParams.onLiveEvent,
      params: undefined,
      types: ["*"],
      meta: {
        dataProviderName: "default",
      },
    });

    unmount();
    expect(onUnsubscribeMock).toHaveBeenCalledWith(true);
    expect(onUnsubscribeMock).toHaveBeenCalledTimes(1);
  });

  it("should not throw error when liveProvider is undefined", async () => {
    renderHook(
      () =>
        useSubscription({
          channel: "channel",
          onLiveEvent: onLiveEventMock,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );
  });
});
