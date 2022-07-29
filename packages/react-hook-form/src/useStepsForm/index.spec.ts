import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { TestWrapper } from "../../test";

import { useStepsForm } from "./";

describe("useStepsForm Hook", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    it("'defaultStep' props should set the initial value of 'currentStep'", async () => {
        const { result } = renderHook(
            () =>
                useStepsForm({
                    stepsProps: {
                        defaultStep: 4,
                    },
                }),
            {
                wrapper: TestWrapper({}),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(result.current.steps.currentStep).toBe(4);
    });

    it("'goToStep' should update the current step state", async () => {
        const { result } = renderHook(() => useStepsForm({}), {
            wrapper: TestWrapper({}),
        });

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await act(async () => {
            result.current.steps.gotoStep(1);
        });

        expect(result.current.steps.currentStep).toBe(1);
    });

    it("'currentStep' should be 0 when the 'goToSteps' params less than zero", async () => {
        const { result } = renderHook(() => useStepsForm({}), {
            wrapper: TestWrapper({}),
        });

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await act(async () => {
            result.current.steps.gotoStep(-7);
        });

        expect(result.current.steps.currentStep).toBe(0);
    });

    it("'currentStep' should be 0 when the 'goToSteps' params less than zero", async () => {
        const { result } = renderHook(() => useStepsForm({}), {
            wrapper: TestWrapper({}),
        });

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await act(async () => {
            result.current.steps.gotoStep(-7);
        });

        expect(result.current.steps.currentStep).toBe(0);
    });

    it("'currentStep' should not update when the 'goToSteps' params equal to the 'currentStep'", async () => {
        const { result } = renderHook(
            () =>
                useStepsForm({
                    stepsProps: {
                        defaultStep: 2,
                    },
                }),
            {
                wrapper: TestWrapper({}),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await act(async () => {
            result.current.steps.gotoStep(2);
        });

        expect(result.current.steps.currentStep).toBe(2);
    });
});
