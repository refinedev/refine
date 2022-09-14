import { useState } from "react";
import { BaseRecord, HttpError } from "@pankod/refine-core";

import { useForm, UseFormProps, UseFormReturnType } from "../useForm";

export type UseStepsFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = Record<string, unknown>,
> = UseFormReturnType<TData, TError, TVariables> & {
    steps: {
        currentStep: number;
        gotoStep: (step: number) => void;
    };
};

export type UseStepsFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = Record<string, unknown>,
> = UseFormProps<TData, TError, TVariables> & {
    stepsProps?: {
        defaultStep?: number;
        isBackValidate?: boolean;
    };
};

export const useStepsForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = Record<string, unknown>,
>({
    stepsProps,
    ...rest
}: UseStepsFormProps<TData, TError, TVariables> = {}): UseStepsFormReturnType<
    TData,
    TError,
    TVariables
> => {
    const { defaultStep = 0, isBackValidate = false } = stepsProps ?? {};
    const [current, setCurrent] = useState(defaultStep);

    const useMantineFormResult = useForm({
        ...rest,
    });

    const { validate } = useMantineFormResult;

    const go = (step: number) => {
        let targetStep = step;

        if (step < 0) {
            targetStep = 0;
        }

        setCurrent(targetStep);
    };

    const gotoStep = (step: number) => {
        if (step === current) {
            return;
        }

        if (step < current && !isBackValidate) {
            go(step);
            return;
        }

        const isValid = !validate().hasErrors;
        if (isValid) {
            go(step);
        }
    };

    return {
        ...useMantineFormResult,
        steps: {
            currentStep: current,
            gotoStep,
        },
    };
};
