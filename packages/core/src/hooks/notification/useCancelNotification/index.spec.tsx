import React from "react";
import { renderHook } from "@testing-library/react";

import { TestWrapper } from "@test";

import { useCancelNotification } from "./";

describe("useCancelNotification Hook", () => {
  it("returns context correct value", async () => {
    const dispatch = jest.fn();
    const useReducerSpy = jest.spyOn(React, "useReducer");

    const mockNotificationState = [
      {
        id: "1",
        resource: "posts",
        seconds: 5000,
        isRunning: true,
      },
    ];
    useReducerSpy.mockImplementation(() => [mockNotificationState, dispatch]);

    const { result } = renderHook(() => useCancelNotification(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
      }),
    });

    expect(result.current.notifications).toEqual(mockNotificationState);
  });

  it("returns context false value", async () => {
    const dispatch = jest.fn();
    const useReducerSpy = jest.spyOn(React, "useReducer");

    const mockNotificationState = [
      {
        id: "1",
        resource: "posts",
        seconds: 5000,
        isRunning: true,
      },
    ];
    useReducerSpy.mockImplementation(() => [[], dispatch]);

    const { result } = renderHook(() => useCancelNotification(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
      }),
    });

    expect(result.current.notifications).not.toEqual(mockNotificationState);
  });

  it("context dispatch not called", async () => {
    const dispatch = jest.fn();
    const useReducerSpy = jest.spyOn(React, "useReducer");

    useReducerSpy.mockImplementation(() => [[], dispatch]);

    renderHook(() => useCancelNotification(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
      }),
    });

    expect(dispatch).not.toBeCalled();
  });

  it("context dispatch called", async () => {
    const dispatch = jest.fn();
    const useReducerSpy = jest.spyOn(React, "useReducer");

    useReducerSpy.mockImplementation(() => [[], dispatch]);

    const { result } = renderHook(() => useCancelNotification(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
      }),
    });

    result.current.notificationDispatch({});

    expect(dispatch).toBeCalled();
  });
});
