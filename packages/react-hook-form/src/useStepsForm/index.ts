import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { BaseRecord, HttpError } from "@pankod/refine-core";

import { useForm, UseFormProps, UseFormReturnType } from "../useForm";

export type UseStepsFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
> = UseFormReturnType<TData, TError, TVariables, TContext> & {
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
> = UseFormProps<TData, TError, TVariables, TContext> & {
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
>({
    stepsProps,
    ...rest
}: UseStepsFormProps<
    TData,
    TError,
    TVariables,
    TContext
> = {}): UseStepsFormReturnType<TData, TError, TVariables, TContext> => {
    const { defaultStep = 0, isBackValidate = true } = stepsProps ?? {};
    const [current, setCurrent] = useState(defaultStep);

    const useHookFormResult = useForm({
        ...rest,
    });
    const {
        trigger,
        getValues,
        reset,
        formState: { dirtyFields },
        refineCore: { queryResult },
    } = useHookFormResult;

    useEffect(() => {
        if (queryResult?.data) {
            const fields: any = {};
            const registeredFields = Object.keys(getValues());
            Object.entries(queryResult?.data?.data).forEach(([key, value]) => {
                if (registeredFields.includes(key)) {
                    if (dirtyFields[key]) {
                        fields[key] = getValues(key as any);
                    } else {
                        fields[key] = value;
                    }
                }
            });

            reset(fields as any, { keepDirty: true });
        }
    }, [queryResult?.data, current]);

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
