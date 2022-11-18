import * as React from "react";

import { chakra, HTMLChakraProps, forwardRef } from "@chakra-ui/react";
import { cx, runIfFn, __DEV__ } from "@chakra-ui/utils";
import { MaybeRenderProp } from "@chakra-ui/react-utils";

import {
    FormProvider,
    FieldValues,
    SubmitHandler,
    SubmitErrorHandler,
    WatchObserver,
} from "@saas-ui/react";

import { UseFormReturnType as UseFormReturn } from "@pankod/refine-react-hook-form";
import { BaseRecord, HttpError } from "@pankod/refine-core";

export type { UseFormReturn, FieldValues, SubmitHandler };

interface FormOptions<
    TBaseRecord extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TFieldValues extends FieldValues = FieldValues,
> {
    /**
     * Triggers when any of the field change.
     */
    onChange?: WatchObserver<TFieldValues>;
    /**
     * Triggers when there are validation errors.
     */
    onError?: SubmitErrorHandler<TFieldValues>;
    /**
     * The form children, can be a render prop or a ReactNode.
     */
    children?: MaybeRenderProp<
        UseFormReturn<TBaseRecord, TError, TFieldValues>
    >;
}

// @todo Figure out how to pass down FieldValues to all Field components, if at all possible.

export interface FormProps<
    TBaseRecord extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TFieldValues extends FieldValues = FieldValues,
> extends Omit<
            HTMLChakraProps<"form">,
            "children" | "onChange" | "onSubmit" | "onError"
        >,
        FormOptions<TFieldValues> {
    form: UseFormReturn<TBaseRecord, TError, TFieldValues>;
}

export const Form = forwardRef(
    <TFieldValues extends FieldValues = FieldValues>(
        props: FormProps<TFieldValues>,
        ref: React.ForwardedRef<HTMLFormElement>,
    ) => {
        const { onChange, onError, children, form, ...rest } = props;

        const methods = form;
        const {
            handleSubmit,
            refineCore: { onFinish },
        } = methods;

        React.useEffect(() => {
            let subscription: ReturnType<typeof form.watch>;
            if (onChange) {
                subscription = form.watch(onChange);
            }
            return () => subscription?.unsubscribe();
        }, [methods, onChange]);

        return (
            <FormProvider {...methods}>
                <chakra.form
                    ref={ref}
                    onSubmit={handleSubmit(onFinish, onError)}
                    {...rest}
                    className={cx("saas-form", props.className)}
                >
                    {runIfFn(children, methods)}
                </chakra.form>
            </FormProvider>
        );
    },
) as (<TFieldValues extends FieldValues>(
    props: FormProps<TFieldValues> & {
        ref?: React.ForwardedRef<HTMLFormElement>;
    },
) => React.ReactElement) & {
    displayName?: string;
};

if (__DEV__) {
    Form.displayName = "Form";
}
