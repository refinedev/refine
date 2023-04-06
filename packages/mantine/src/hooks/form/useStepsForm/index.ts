import { useState } from "react";
import { BaseRecord, HttpError } from "@refinedev/core";

import { useForm, UseFormProps, UseFormReturnType } from "../useForm";

export type UseStepsFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = Record<string, unknown>,
    TTransformed = TVariables,
    TSelectData extends BaseRecord = TData,
> = UseFormReturnType<TData, TError, TVariables, TTransformed, TSelectData> & {
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
    TSelectData extends BaseRecord = TData,
> = UseFormProps<TData, TError, TVariables, TTransformed, TSelectData> & {
    /**
     * @description Configuration object for the steps.
     * `defaultStep`: Allows you to set the initial step.
     * 
     * `isBackValidate`: Whether to validation the current step when going back.
     * @type `{
      defaultStep?: number;
      isBackValidate?: boolean;
      }`
     * @default `defaultStep = 0` `isBackValidate = false`
     */
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
    TSelectData extends BaseRecord = TData,
>({
    stepsProps,
    ...rest
}: UseStepsFormProps<
    TData,
    TError,
    TVariables,
    TTransformed,
    TSelectData
> = {}): UseStepsFormReturnType<
    TData,
    TError,
    TVariables,
    TTransformed,
    TSelectData
> => {
    const { defaultStep = 0, isBackValidate = false } = stepsProps ?? {};
    const [current, setCurrent] = useState(defaultStep);

    const useMantineFormResult = useForm<
        TData,
        TError,
        TVariables,
        TTransformed,
        TSelectData
    >({
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
