import { useState } from "react";
import { BaseRecord, HttpError } from "@pankod/refine-core";

import { useForm, UseFormProps, UseFormReturnType } from "../useForm";

export type UseStepsFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = Record<string, unknown>,
    TTransformed = TVariables,
> = UseFormReturnType<TData, TError, TVariables, TTransformed> & {
    steps: {
        currentStep: number;
        gotoStep: (step: number) => void;
    };
};

export type UseStepsFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = Record<string, unknown>,
    TTransformed = TVariables,
> = UseFormProps<TData, TError, TVariables, TTransformed> & {
    stepsProps?: {
        defaultStep?: number;
        isBackValidate?: boolean;
    };
};

export const useStepsForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = Record<string, unknown>,
    TTransformed = TVariables,
>({
    stepsProps,
    ...rest
}: UseStepsFormProps<
    TData,
    TError,
    TVariables,
    TTransformed
> = {}): UseStepsFormReturnType<TData, TError, TVariables, TTransformed> => {
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
