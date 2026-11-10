import { renderHook } from "@testing-library/react";
import { vi } from "vitest";

import { TestWrapper } from "@test";

import { useSubscription, type UseSubscriptionProps } from "./";

const onLiveEventMock = vi.fn();
describe("useSubscribe Hook", () => {
  it.each([
    ["channel", { channel: "comments" }],
    ["params", { params: { id: "2" } }],
    ["types", { types: ["created"] }],
    ["meta", { meta: { dataProviderName: "other" } }],
    ["callback", { onLiveEvent: vi.fn() }],
  ] satisfies [string, Partial<UseSubscriptionProps>][])(
    "replaces the subscription when %s changes",
    (_, changes) => {
      const oldSubscription = { id: "old" };
      const newSubscription = { id: "new" };
      const subscribe = vi
        .fn()
        .mockReturnValueOnce(oldSubscription)
        .mockReturnValueOnce(newSubscription);
      const unsubscribe = vi.fn();
      const initialProps: UseSubscriptionProps = {
        channel: "posts",
        params: { id: "1" },
        types: ["updated"],
        meta: { dataProviderName: "default" },
        onLiveEvent: vi.fn(),
      };
      const { rerender, unmount } = renderHook(useSubscription, {
        initialProps,
        wrapper: TestWrapper({ liveProvider: { subscribe, unsubscribe } }),
      });

      expect(subscribe).toHaveBeenCalledTimes(1);
      rerender({ ...initialProps, ...changes });

      expect(unsubscribe).toHaveBeenCalledTimes(1);
      expect(unsubscribe).toHaveBeenCalledWith(oldSubscription);
      expect(subscribe).toHaveBeenCalledTimes(2);
      const { onLiveEvent, ...subscriptionProps } = {
        ...initialProps,
        ...changes,
      };
      expect(subscribe).toHaveBeenLastCalledWith({
        ...subscriptionProps,
        callback: onLiveEvent,
      });
      expect(unsubscribe.mock.invocationCallOrder[0]).toBeLessThan(
        subscribe.mock.invocationCallOrder[1],
      );

      unmount();
      expect(unsubscribe).toHaveBeenCalledTimes(2);
      expect(unsubscribe).toHaveBeenLastCalledWith(newSubscription);
    },
  );

  it("keeps the subscription when params, types and meta are equivalent", () => {
    const subscribe = vi.fn(() => ({ id: "subscription" }));
    const unsubscribe = vi.fn();
    const { rerender } = renderHook(
      () =>
        useSubscription({
          channel: "posts",
          params: { id: "1" },
          types: ["updated"],
          meta: { dataProviderName: "default" },
          onLiveEvent: onLiveEventMock,
        }),
      { wrapper: TestWrapper({ liveProvider: { subscribe, unsubscribe } }) },
    );

    rerender();

    expect(subscribe).toHaveBeenCalledTimes(1);
    expect(unsubscribe).not.toHaveBeenCalled();
  });

  it("useSubscribe enabled and all types", async () => {
    const onSubscribeMock = vi.fn();

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
            unsubscribe: () => vi.fn(),
            publish: () => vi.fn(),
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
    const onSubscribeMock = vi.fn();

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
            unsubscribe: () => vi.fn(),
            publish: () => vi.fn(),
          },
        }),
      },
    );

    expect(onSubscribeMock).not.toHaveBeenCalled();
  });

  it("useSubscribe spesific type", async () => {
    const onSubscribeMock = vi.fn();

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
            unsubscribe: () => vi.fn(),
            publish: () => vi.fn(),
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
    const onSubscribeMock = vi.fn(() => true);
    const onUnsubscribeMock = vi.fn();

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
            publish: () => vi.fn(),
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
