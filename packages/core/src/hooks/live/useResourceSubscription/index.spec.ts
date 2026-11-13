import { renderHook } from "@testing-library/react";
import { vi } from "vitest";

import { TestWrapper } from "@test";

import { defaultRefineOptions } from "@contexts/refine";
import type { IRefineContextProvider } from "../../../contexts/refine/types";
import { useResourceSubscription } from "./";

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

  describe("dependency changes", () => {
    const resources = [{ name: "posts" }, { name: "comments" }];

    const createLiveProvider = () => {
      let subscriptionCounter = 0;
      const subscribe = vi.fn(() => `subscription-${++subscriptionCounter}`);
      const unsubscribe = vi.fn();
      return {
        subscribe,
        unsubscribe,
        publish: vi.fn(),
      };
    };

    it("resubscribes when params.id changes", async () => {
      const liveProvider = createLiveProvider();

      const { rerender } = renderHook(
        ({ id }: { id: string }) =>
          useResourceSubscription({
            channel: "resources/posts",
            resource: "posts",
            types: ["*"],
            liveMode: "auto",
            params: { id, subscriptionType: "useOne" },
          }),
        {
          initialProps: { id: "1" },
          wrapper: TestWrapper({ liveProvider, resources }),
        },
      );

      expect(liveProvider.subscribe).toHaveBeenCalledTimes(1);
      expect(liveProvider.subscribe).toHaveBeenLastCalledWith(
        expect.objectContaining({
          params: expect.objectContaining({ id: "1" }),
        }),
      );

      rerender({ id: "2" });

      expect(liveProvider.unsubscribe).toHaveBeenCalledTimes(1);
      expect(liveProvider.unsubscribe).toHaveBeenCalledWith("subscription-1");
      expect(liveProvider.subscribe).toHaveBeenCalledTimes(2);
      expect(liveProvider.subscribe).toHaveBeenLastCalledWith(
        expect.objectContaining({
          params: expect.objectContaining({ id: "2" }),
        }),
      );
    });

    it("does not resubscribe when rerendered with equal values and new references", async () => {
      const liveProvider = createLiveProvider();

      const { rerender } = renderHook(
        ({ id }: { id: string }) =>
          useResourceSubscription({
            channel: "resources/posts",
            resource: "posts",
            types: ["created", "updated"],
            liveMode: "auto",
            params: { id, subscriptionType: "useOne" },
            meta: { fields: ["title"] },
            onLiveEvent: () => undefined,
          }),
        {
          initialProps: { id: "1" },
          wrapper: TestWrapper({ liveProvider, resources }),
        },
      );

      rerender({ id: "1" });
      rerender({ id: "1" });

      expect(liveProvider.subscribe).toHaveBeenCalledTimes(1);
      expect(liveProvider.unsubscribe).not.toHaveBeenCalled();
    });

    it("resubscribes with the new channel when channel and resource change", async () => {
      const liveProvider = createLiveProvider();

      const { rerender } = renderHook(
        ({ resource }: { resource: string }) =>
          useResourceSubscription({
            channel: `resources/${resource}`,
            resource,
            types: ["*"],
            liveMode: "auto",
            params: { subscriptionType: "useList" },
          }),
        {
          initialProps: { resource: "posts" },
          wrapper: TestWrapper({ liveProvider, resources }),
        },
      );

      expect(liveProvider.subscribe).toHaveBeenLastCalledWith(
        expect.objectContaining({
          channel: "resources/posts",
          params: expect.objectContaining({ resource: "posts" }),
        }),
      );

      rerender({ resource: "comments" });

      expect(liveProvider.unsubscribe).toHaveBeenCalledTimes(1);
      expect(liveProvider.unsubscribe).toHaveBeenCalledWith("subscription-1");
      expect(liveProvider.subscribe).toHaveBeenCalledTimes(2);
      expect(liveProvider.subscribe).toHaveBeenLastCalledWith(
        expect.objectContaining({
          channel: "resources/comments",
          params: expect.objectContaining({ resource: "comments" }),
        }),
      );
    });

    it("calls the latest onLiveEvent after a rerender without resubscribing", async () => {
      const liveProvider = createLiveProvider();
      const firstOnLiveEvent = vi.fn();
      const secondOnLiveEvent = vi.fn();

      const { rerender } = renderHook(
        ({ onLiveEvent }: { onLiveEvent: (event: any) => void }) =>
          useResourceSubscription({
            channel: "resources/posts",
            resource: "posts",
            types: ["*"],
            liveMode: "manual",
            params: { subscriptionType: "useList" },
            onLiveEvent,
          }),
        {
          initialProps: { onLiveEvent: firstOnLiveEvent },
          wrapper: TestWrapper({ liveProvider, resources }),
        },
      );

      rerender({ onLiveEvent: secondOnLiveEvent });

      expect(liveProvider.subscribe).toHaveBeenCalledTimes(1);
      expect(liveProvider.unsubscribe).not.toHaveBeenCalled();

      const { callback } = (liveProvider.subscribe.mock.calls[0] as any[])[0];
      const event = {
        channel: "resources/posts",
        type: "created",
        payload: {},
        date: new Date(),
      };
      callback(event);

      expect(firstOnLiveEvent).not.toHaveBeenCalled();
      expect(secondOnLiveEvent).toHaveBeenCalledWith(event);
      expect(invalidateQueriesMock).not.toHaveBeenCalled();
    });

    it("unsubscribes when liveMode switches from auto to off", async () => {
      const liveProvider = createLiveProvider();

      const { rerender } = renderHook(
        ({ liveMode }: { liveMode: "auto" | "off" }) =>
          useResourceSubscription({
            channel: "resources/posts",
            resource: "posts",
            types: ["*"],
            liveMode,
            params: { subscriptionType: "useList" },
          }),
        {
          initialProps: { liveMode: "auto" as "auto" | "off" },
          wrapper: TestWrapper({ liveProvider, resources }),
        },
      );

      expect(liveProvider.subscribe).toHaveBeenCalledTimes(1);

      rerender({ liveMode: "off" });

      expect(liveProvider.unsubscribe).toHaveBeenCalledTimes(1);
      expect(liveProvider.unsubscribe).toHaveBeenCalledWith("subscription-1");
      expect(liveProvider.subscribe).toHaveBeenCalledTimes(1);
    });
  });
});
