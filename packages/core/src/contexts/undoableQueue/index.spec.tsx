import * as React from "react";
import { vi } from "vitest";

import { renderHook } from "@testing-library/react";

import { act } from "@test";

import { undoableQueueReducer } from ".";

describe("Notification Reducer", () => {
  const notificationDispatch = vi.fn();

  const providerProps = {
    notifications: [
      {
        id: "1",
        resource: "posts",
        seconds: 5000,
        isRunning: true,
      },
    ],
    notificationDispatch: notificationDispatch,
  };

  it("should render notification item with ADD action", () => {
    const { result } = renderHook(() =>
      React.useReducer(undoableQueueReducer, []),
    );

    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: "ADD", payload: providerProps.notifications[0] });
    });

    const [state] = result.current;

    expect(state).toEqual([
      {
        id: "1",
        resource: "posts",
        seconds: 5000,
        isRunning: true,
      },
    ]);
  });

  it("remove notification item with DELETE action", async () => {
    const { result } = renderHook(() =>
      React.useReducer(undoableQueueReducer, providerProps.notifications),
    );
    const [, dispatch] = result.current;

    act(() => {
      dispatch({
        type: "REMOVE",
        payload: providerProps.notifications[0],
      });
    });

    const [state] = result.current;

    expect(state).toEqual([]);
  });

  it("decrease notification item by 1 second with DECREASE_NOTIFICATION_SECOND action", async () => {
    const { result } = renderHook(() =>
      React.useReducer(undoableQueueReducer, providerProps.notifications),
    );
    const [, dispatch] = result.current;

    act(() => {
      dispatch({
        type: "DECREASE_NOTIFICATION_SECOND",
        payload: {
          id: providerProps.notifications[0].id,
          seconds: providerProps.notifications[0].seconds,
          resource: providerProps.notifications[0].resource,
        },
      });
    });

    const [state] = result.current;

    expect(state[0].seconds).toEqual(
      providerProps.notifications[0].seconds - 1000,
    );
  });

  it("should trigger doMutation for existing notification item when ADD is called for the same id and resource", () => {
    const doMutation = vi.fn();
    const initialNotification = {
      id: "1",
      resource: "posts",
      seconds: 5000,
      isRunning: true,
      doMutation,
    };

    const { result } = renderHook(() =>
      React.useReducer(undoableQueueReducer, [initialNotification as any]),
    );
    const [, dispatch] = result.current;

    const newDoMutation = vi.fn();
    act(() => {
      dispatch({
        type: "ADD",
        payload: {
          id: "1",
          resource: "posts",
          seconds: 5000,
          doMutation: newDoMutation,
        },
      });
    });

    expect(doMutation).toHaveBeenCalledTimes(1);
    expect(newDoMutation).not.toHaveBeenCalled();

    const [state] = result.current;
    expect(state).toHaveLength(1);
    expect(state[0].doMutation).toBe(newDoMutation);
  });
});
