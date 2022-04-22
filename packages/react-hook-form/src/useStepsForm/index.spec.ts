import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";

import { TestWrapper } from "../../test";

import { useStepsForm } from "./";

describe("useStepsForm Hook", () => {
    it("'defaultCurrent' props should set the initial value of 'currentStep'", async () => {
        const { result } = renderHook(
            () =>
                useStepsForm({
                    defaultCurrent: 4,
                }),
            {
                wrapper: TestWrapper({}),
            },
        );

        expect(result.current.currentStep).toBe(4);
    });

    it("'goToStep' should update the current step state", async () => {
        const { result } = renderHook(() => useStepsForm({}), {
            wrapper: TestWrapper({}),
        });

        await act(async () => {
            result.current.gotoStep(1);
        });

        expect(result.current.currentStep).toBe(1);
    });

    it("'currentStep' should be 0 when the 'goToSteps' params less than zero", async () => {
        const { result } = renderHook(() => useStepsForm({}), {
            wrapper: TestWrapper({}),
        });

        await act(async () => {
            result.current.gotoStep(-7);
        });

        expect(result.current.currentStep).toBe(0);
    });

    it("'currentStep' should be 0 when the 'goToSteps' params less than zero", async () => {
        const { result } = renderHook(() => useStepsForm({}), {
            wrapper: TestWrapper({}),
        });

        await act(async () => {
            result.current.gotoStep(-7);
        });

        expect(result.current.currentStep).toBe(0);
    });

    it("'currentStep' should not update when the 'goToSteps' params equal to the 'currentStep'", async () => {
        const { result } = renderHook(
            () =>
                useStepsForm({
                    defaultCurrent: 2,
                }),
            {
                wrapper: TestWrapper({}),
            },
        );

        await act(async () => {
            result.current.gotoStep(2);
        });

        expect(result.current.currentStep).toBe(2);
    });
});
