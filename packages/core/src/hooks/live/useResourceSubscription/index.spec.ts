import { renderHook } from "@testing-library/react";
import { vi } from "vitest";

import { TestWrapper } from "@test";

import { defaultRefineOptions } from "@contexts/refine";
import type { IRefineContextProvider } from "../../../contexts/refine/types";
import { useResourceSubscription, type UseResourceSubscriptionProps } from "./";

const invalidateQueriesMock = vi.fn();
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQueryClient: () => ({
      ...(actual as any).useQueryClient(),
      invalidateQueries: invalidateQueriesMock,
    }),
  };
});

const mockRefineProvider: IRefineContextProvider = {
  ...defaultRefineOptions,
  options: defaultRefineOptions,
};

const onLiveEventMock = vi.fn();
describe("useResourceSubscription Hook", () => {
  beforeEach(() => {
    invalidateQueriesMock.mockReset();
  });

  it("useResourceSubscription enabled and all types", async () => {
    const onSubscribeMock = vi.fn();

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
          meta: {
            fields: ["title"],
            operation: "update",
            variables: {
              id: "1",
            },
            dataProviderName: "dataProviderName",
          },
        }),
      {
        wrapper: TestWrapper({
          liveProvider: {
            subscribe: onSubscribeMock,
            unsubscribe: () => vi.fn(),
            publish: () => vi.fn(),
          },
          refineProvider: {
            ...mockRefineProvider,
            liveMode: "auto",
          },
        }),
      },
    );

    expect(onSubscribeMock).toHaveBeenCalledWith({
      channel: subscriptionParams.channel,
      params: {
        resource: "posts",
      },
      types: ["*"],
      callback: expect.any(Function),
      meta: {
        fields: ["title"],
        operation: "update",
        variables: {
          id: "1",
        },
        dataProviderName: "dataProviderName",
      },
    });
  });

  it("useResourceSubscription liveMode off", async () => {
    const onSubscribeMock = vi.fn();

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
            unsubscribe: () => vi.fn(),
            publish: () => vi.fn(),
          },
          refineProvider: {
            ...mockRefineProvider,
            liveMode: "off",
          },
        }),
      },
    );

    expect(onSubscribeMock).not.toHaveBeenCalled();
  });

  it("useResourceSubscription liveMode on context off, params auto", async () => {
    const onLiveEventFromContextCallbackMock = vi.fn();

    const mockCallbackEventPayload = { type: "mock" };
    const onSubscribeMock = vi.fn(({ callback }) =>
      callback(mockCallbackEventPayload),
    );

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
            unsubscribe: () => vi.fn(),
            publish: () => vi.fn(),
          },
          refineProvider: {
            ...mockRefineProvider,
            onLiveEvent: onLiveEventFromContextCallbackMock,
            liveMode: "off",
          },
        }),
      },
    );

    expect(onSubscribeMock).toHaveBeenCalled();
    expect(invalidateQueriesMock).toHaveBeenCalledTimes(1);
    expect(onLiveEventMock).toHaveBeenCalledWith(mockCallbackEventPayload);
    expect(onLiveEventFromContextCallbackMock).toHaveBeenCalledWith(
      mockCallbackEventPayload,
    );
  });

  it("useResourceSubscription subscribe undefined", async () => {
    const onSubscribeMock = vi.fn();

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

    expect(onSubscribeMock).not.toHaveBeenCalled();
  });

  it("useResourceSubscription calls unsubscribe on unmount", async () => {
    const onSubscribeMock = vi.fn(() => true);
    const onUnsubscribeMock = vi.fn();

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
            publish: () => vi.fn(),
          },
          refineProvider: {
            ...mockRefineProvider,
            liveMode: "auto",
          },
        }),
      },
    );

    expect(onSubscribeMock).toHaveBeenCalled();

    unmount();
    expect(onUnsubscribeMock).toHaveBeenCalledWith(true);
    expect(onUnsubscribeMock).toHaveBeenCalledTimes(1);
  });

  it("should invalidate queries based on queryKey created with `identifier`", async () => {
    const mockCallbackEventPayload = { type: "mock" };
    const onSubscribeMock = vi.fn(({ callback }) =>
      callback(mockCallbackEventPayload),
    );

    renderHook(
      () =>
        useResourceSubscription({
          onLiveEvent: onLiveEventMock,
          channel: "resources/posts",
          resource: "featured-posts",
          types: ["*"],
          liveMode: "auto",
        }),
      {
        wrapper: TestWrapper({
          liveProvider: {
            subscribe: onSubscribeMock,
            unsubscribe: () => vi.fn(),
            publish: () => vi.fn(),
          },
          resources: [
            {
              name: "posts",
            },
            {
              name: "posts",
              identifier: "featured-posts",
            },
          ],
        }),
      },
    );

    expect(onSubscribeMock).toHaveBeenCalled();
    expect(onLiveEventMock).toHaveBeenCalledWith(mockCallbackEventPayload);
    expect(invalidateQueriesMock).toHaveBeenCalledWith({
      queryKey: ["data", "default", "featured-posts"],
      type: "active",
      refetchType: "active",
      cancelRefetch: false,
    });
  });

  it.each([
    ["channel", { channel: "comments" }],
    ["params", { params: { id: "2", subscriptionType: "useOne" as const } }],
    ["types", { types: ["created"] as const }],
    ["meta", { meta: { dataProviderName: "other" } }],
    ["resource", { resource: "comments" }],
  ] satisfies [string, Partial<UseResourceSubscriptionProps>][])(
    "replaces the subscription when %s changes",
    (_, changes) => {
      const oldSubscription = { id: "old" };
      const newSubscription = { id: "new" };
      const subscribe = vi
        .fn()
        .mockReturnValueOnce(oldSubscription)
        .mockReturnValueOnce(newSubscription);
      const unsubscribe = vi.fn();
      const initialProps: UseResourceSubscriptionProps = {
        channel: "posts",
        resource: "posts",
        params: { id: "1", subscriptionType: "useOne" },
        types: ["updated"],
        meta: { dataProviderName: "default" },
        onLiveEvent: vi.fn(),
      };
      const { rerender, unmount } = renderHook(
        (props: UseResourceSubscriptionProps) => useResourceSubscription(props),
        {
          initialProps,
          wrapper: TestWrapper({
            liveProvider: {
              subscribe,
              unsubscribe,
            },
            refineProvider: {
              ...mockRefineProvider,
              liveMode: "auto",
            },
          }),
        },
      );

      expect(subscribe).toHaveBeenCalledTimes(1);
      rerender({ ...initialProps, ...changes });

      expect(unsubscribe).toHaveBeenCalledTimes(1);
      expect(unsubscribe).toHaveBeenCalledWith(oldSubscription);
      expect(subscribe).toHaveBeenCalledTimes(2);
      expect(unsubscribe.mock.invocationCallOrder[0]).toBeLessThan(
        subscribe.mock.invocationCallOrder[1],
      );

      unmount();
      expect(unsubscribe).toHaveBeenCalledTimes(2);
      expect(unsubscribe).toHaveBeenLastCalledWith(newSubscription);
    },
  );

  it("unsubscribes when liveMode changes to off and resubscribes when liveMode changes back to auto", () => {
    const subscription = { id: "sub-1" };
    const subscription2 = { id: "sub-2" };
    const subscribe = vi
      .fn()
      .mockReturnValueOnce(subscription)
      .mockReturnValueOnce(subscription2);
    const unsubscribe = vi.fn();
    const initialProps: UseResourceSubscriptionProps = {
      channel: "posts",
      resource: "posts",
      types: ["*"],
      liveMode: "auto",
    };
    const { rerender } = renderHook(
      (props: UseResourceSubscriptionProps) => useResourceSubscription(props),
      {
        initialProps,
        wrapper: TestWrapper({
          liveProvider: {
            subscribe,
            unsubscribe,
          },
        }),
      },
    );

    expect(subscribe).toHaveBeenCalledTimes(1);
    expect(unsubscribe).not.toHaveBeenCalled();

    rerender({ ...initialProps, liveMode: "off" });
    expect(unsubscribe).toHaveBeenCalledTimes(1);
    expect(unsubscribe).toHaveBeenCalledWith(subscription);
    expect(subscribe).toHaveBeenCalledTimes(1);

    rerender({ ...initialProps, liveMode: "auto" });
    expect(subscribe).toHaveBeenCalledTimes(2);
  });

  it("keeps the subscription when params, types, and meta are equivalent", () => {
    const subscribe = vi.fn(() => ({ id: "subscription" }));
    const unsubscribe = vi.fn();
    const { rerender } = renderHook(
      () =>
        useResourceSubscription({
          channel: "posts",
          resource: "posts",
          params: { id: "1", subscriptionType: "useOne" },
          types: ["updated"],
          meta: { dataProviderName: "default" },
          onLiveEvent: onLiveEventMock,
          liveMode: "auto",
        }),
      {
        wrapper: TestWrapper({
          liveProvider: { subscribe, unsubscribe },
        }),
      },
    );

    expect(subscribe).toHaveBeenCalledTimes(1);
    rerender();

    expect(subscribe).toHaveBeenCalledTimes(1);
    expect(unsubscribe).not.toHaveBeenCalled();
  });

  it("keeps the subscription when onLiveEvent changes but calls the latest callback", () => {
    let capturedCallback: ((event: any) => void) | undefined;
    const subscribe = vi.fn(({ callback }) => {
      capturedCallback = callback;
      return { id: "subscription" };
    });
    const unsubscribe = vi.fn();

    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const initialProps: UseResourceSubscriptionProps = {
      channel: "posts",
      resource: "posts",
      types: ["*"],
      liveMode: "auto",
      onLiveEvent: callback1,
    };

    const { rerender } = renderHook(
      (props: UseResourceSubscriptionProps) => useResourceSubscription(props),
      {
        initialProps,
        wrapper: TestWrapper({
          liveProvider: { subscribe, unsubscribe },
        }),
      },
    );

    expect(subscribe).toHaveBeenCalledTimes(1);
    expect(unsubscribe).not.toHaveBeenCalled();

    rerender({ ...initialProps, onLiveEvent: callback2 });

    expect(subscribe).toHaveBeenCalledTimes(1);
    expect(unsubscribe).not.toHaveBeenCalled();

    const mockEvent = {
      type: "updated",
      payload: { id: "1" },
      channel: "posts",
      date: new Date(),
    };
    capturedCallback?.(mockEvent);

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledWith(mockEvent);
  });
});
