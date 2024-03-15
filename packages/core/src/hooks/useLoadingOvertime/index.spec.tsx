import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { defaultRefineOptions } from "@contexts/refine";
import { TestWrapper, mockRouterProvider } from "@test";

import { useLoadingOvertime } from "./";

describe("useLoadingOvertime Hook", () => {
  jest.useFakeTimers();

  it("should elapsedTime undefined when isLoading false", () => {
    const { result } = renderHook(
      () =>
        useLoadingOvertime({
          isLoading: false,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    const { elapsedTime } = result.current;

    expect(elapsedTime).toBeUndefined();
  });

  it("should elapsedTime undefined when interval not start", () => {
    const { result } = renderHook(
      () =>
        useLoadingOvertime({
          isLoading: true,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    act(() => {
      // default 1000
      jest.advanceTimersByTime(999);
    });

    const { elapsedTime } = result.current;
    // should be undefined
    expect(elapsedTime).toBeUndefined();
  });

  it("should elapsedTime 2000 when interval 3000", () => {
    const { result } = renderHook(
      () =>
        useLoadingOvertime({
          isLoading: true,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    act(() => {
      // default 1000
      jest.advanceTimersByTime(2000);
    });

    const { elapsedTime } = result.current;
    expect(elapsedTime).toBe(2000);
  });

  it("should override global interval and onInverval", () => {
    const onInterval = jest.fn();
    const onIntervalGlobal = jest.fn();
    const { result } = renderHook(
      () =>
        useLoadingOvertime({
          isLoading: true,
          interval: 1000,
          onInterval,
        }),
      {
        wrapper: TestWrapper({
          refineProvider: {
            hasDashboard: false,
            ...defaultRefineOptions,
            options: {
              ...defaultRefineOptions,
              overtime: {
                interval: 5000,
                onInterval: onIntervalGlobal,
              },
            },
          },
        }),
      },
    );

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const { elapsedTime } = result.current;
    expect(elapsedTime).toBe(2000);
    expect(onInterval).toBeCalledTimes(1);
    // should not be called global interval
    expect(onIntervalGlobal).toBeCalledTimes(0);
  });

  it("should run global interval and onInterval", () => {
    const onInterval = jest.fn();
    const { result } = renderHook(
      () =>
        useLoadingOvertime({
          isLoading: true,
        }),
      {
        wrapper: TestWrapper({
          resources: [
            {
              name: "posts",
            },
          ],
          refineProvider: {
            hasDashboard: false,
            ...defaultRefineOptions,
            options: {
              ...defaultRefineOptions,
              overtime: {
                interval: 500,
                onInterval,
              },
            },
          },
          routerProvider: mockRouterProvider({
            resource: {
              name: "posts",
            },
          }),
        }),
      },
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const { elapsedTime } = result.current;
    expect(elapsedTime).toBe(1000);
    expect(onInterval).toBeCalledTimes(1);
    expect(onInterval).toBeCalledWith(1000);
  });
});
