import { useEffect, useState } from "react";
import { FieldValues, Path } from "react-hook-form";
import { BaseRecord, HttpError } from "@refinedev/core";

import { useForm, UseFormProps, UseFormReturnType } from "../useForm";

export type UseStepsFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
    TSelectData extends BaseRecord = TData,
> = UseFormReturnType<TData, TError, TVariables, TContext, TSelectData> & {
    steps: {
        currentStep: number;
        gotoStep: (step: number) => void;
    };
};

export type UseStepsFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
    TSelectData extends BaseRecord = TData,
> = UseFormProps<TData, TError, TVariables, TContext, TSelectData> & {
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
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
    TSelectData extends BaseRecord = TData,
>({
    stepsProps,
    ...rest
}: UseStepsFormProps<
    TData,
    TError,
    TVariables,
    TContext,
    TSelectData
> = {}): UseStepsFormReturnType<
    TData,
    TError,
    TVariables,
    TContext,
    TSelectData
> => {
    const { defaultStep = 0, isBackValidate = false } = stepsProps ?? {};
    const [current, setCurrent] = useState(defaultStep);

    const useHookFormResult = useForm<
        TData,
        TError,
        TVariables,
        TContext,
        TSelectData
    >({
        ...rest,
    });

    const {
        trigger,
        getValues,
        setValue,
        formState: { dirtyFields },
        refineCore: { queryResult },
    } = useHookFormResult;

    useEffect(() => {
        const data = queryResult?.data?.data;
        if (!data) return;

        const registeredFields = Object.keys(getValues());
        Object.entries(data).forEach(([key, value]) => {
            const name = key as Path<TVariables>;

            if (registeredFields.includes(name)) {
                if (!dirtyFields[name]) {
                    setValue(name, value);
                }
            }
        });
    }, [queryResult?.data, current, setValue, getValues]);

    const go = (step: number) => {
        let targetStep = step;

        if (step < 0) {
            targetStep = 0;
        }

        setCurrent(targetStep);
    };

    const gotoStep = async (step: number) => {
        if (step === current) {
            return;
        }

        if (step < current && !isBackValidate) {
            go(step);
            return;
        }

        const isValid = await trigger();
        if (isValid) {
            go(step);
        }
    };

    return {
        ...useHookFormResult,
        steps: {
            currentStep: current,
            gotoStep,
        },
    };
};
