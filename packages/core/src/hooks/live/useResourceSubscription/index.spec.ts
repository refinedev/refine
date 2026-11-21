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

  it.each([
    ["channel", { channel: "comments" }],
    ["params", { params: { subscriptionType: "useOne" as const, id: "2" } }],
    ["types", { types: ["created"] as UseResourceSubscriptionProps["types"] }],
    ["meta", { meta: { dataProviderName: "other" } }],
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
        channel: "resources/posts",
        params: { subscriptionType: "useOne", id: "1" },
        types: ["updated"],
        meta: { dataProviderName: "default" },
        onLiveEvent: vi.fn(),
        resource: "posts",
        liveMode: "auto",
      };
      const { rerender, unmount } = renderHook(useResourceSubscription, {
        initialProps,
        wrapper: TestWrapper({
          liveProvider: { subscribe, unsubscribe, publish: vi.fn() },
          refineProvider: { ...mockRefineProvider, liveMode: "auto" },
        }),
      });

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

  it("keeps the subscription when params, types and meta are equivalent objects", () => {
    const subscribe = vi.fn(() => ({ id: "subscription" }));
    const unsubscribe = vi.fn();
    const { rerender } = renderHook(
      () =>
        useResourceSubscription({
          channel: "resources/posts",
          params: { subscriptionType: "useOne", id: "1" },
          types: ["updated"],
          meta: { dataProviderName: "default" },
          onLiveEvent: onLiveEventMock,
          resource: "posts",
          liveMode: "auto",
        }),
      {
        wrapper: TestWrapper({
          liveProvider: { subscribe, unsubscribe, publish: vi.fn() },
          refineProvider: { ...mockRefineProvider, liveMode: "auto" },
        }),
      },
    );

    rerender();

    expect(subscribe).toHaveBeenCalledTimes(1);
    expect(unsubscribe).not.toHaveBeenCalled();
  });

  it("unsubscribes immediately when liveMode changes to 'off'", () => {
    const oldSubscription = { id: "sub" };
    const subscribe = vi.fn().mockReturnValue(oldSubscription);
    const unsubscribe = vi.fn();
    const initialProps: UseResourceSubscriptionProps = {
      channel: "resources/posts",
      params: { subscriptionType: "useOne", id: "1" },
      types: ["*"],
      onLiveEvent: onLiveEventMock,
      resource: "posts",
      liveMode: "auto",
    };
    const { rerender } = renderHook(useResourceSubscription, {
      initialProps,
      wrapper: TestWrapper({
        liveProvider: { subscribe, unsubscribe, publish: vi.fn() },
        refineProvider: { ...mockRefineProvider, liveMode: "auto" },
      }),
    });

    expect(subscribe).toHaveBeenCalledTimes(1);

    rerender({ ...initialProps, liveMode: "off" });

    expect(unsubscribe).toHaveBeenCalledWith(oldSubscription);
    expect(subscribe).toHaveBeenCalledTimes(1);
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
});
