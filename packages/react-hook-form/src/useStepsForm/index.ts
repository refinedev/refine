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
    currentStep: number;
    gotoStep: (step: number) => void;
};

export type UseStepsFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
> = UseFormProps<TData, TError, TVariables, TContext> & {
    defaultCurrent?: number;
    isBackValidate?: boolean;
};

export const useStepsForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
>({
    defaultCurrent = 0,
    isBackValidate = true,
    ...rest
}: UseStepsFormProps<
    TData,
    TError,
    TVariables,
    TContext
> = {}): UseStepsFormReturnType<TData, TError, TVariables, TContext> => {
    const [current, setCurrent] = useState(defaultCurrent);

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
        currentStep: current,
        gotoStep,
    };
};
