import { act } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react";

import { TestWrapper } from "@test";
import { defaultRefineOptions } from "@contexts/refine";
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
            // default 2000
            jest.advanceTimersByTime(1000);
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
            // default 2000
            jest.advanceTimersByTime(3000);
        });

        const { elapsedTime } = result.current;
        expect(elapsedTime).toBe(2000);
    });

    it("should override global interval", () => {
        const { result } = renderHook(
            () =>
                useLoadingOvertime({
                    isLoading: true,
                    interval: 1000,
                }),
            {
                wrapper: TestWrapper({}),
            },
        );

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        const { elapsedTime } = result.current;
        expect(elapsedTime).toBe(2000);
    });

    it("should run onInterval callback", () => {
        const onInterval = jest.fn();
        const { result } = renderHook(
            () =>
                useLoadingOvertime({
                    isLoading: true,
                    interval: 1000,
                    onInterval,
                }),
            {
                wrapper: TestWrapper({}),
            },
        );

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        const { elapsedTime } = result.current;
        expect(elapsedTime).toBe(1000);
        expect(onInterval).toBeCalledTimes(1);
    });

    it("should run global onInterval callback", () => {
        const onInterval = jest.fn();
        const { result } = renderHook(
            () =>
                useLoadingOvertime({
                    isLoading: true,
                    interval: 1000,
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
                }),
            },
        );

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        const { elapsedTime } = result.current;
        expect(elapsedTime).toBe(1000);
        expect(onInterval).toBeCalledTimes(1);
        expect(onInterval).toBeCalledWith(1000, {
            action: undefined,
            id: undefined,
            resource: undefined,
            resourceName: undefined,
            resources: [
                {
                    canCreate: false,
                    canDelete: undefined,
                    canEdit: false,
                    canShow: false,
                    label: undefined,
                    name: "posts",
                    options: { route: undefined },
                    route: "/posts",
                },
            ],
        });
    });
});
