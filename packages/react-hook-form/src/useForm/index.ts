import React, { useEffect } from "react";
import get from "lodash/get";
import has from "lodash/has";

import {
  useForm as useHookForm,
  type UseFormProps as UseHookFormProps,
  type UseFormReturn,
  type FieldValues,
  type UseFormHandleSubmit,
  type Path,
} from "react-hook-form";
import {
  type BaseRecord,
  type HttpError,
  useForm as useFormCore,
  useWarnAboutChange,
  type UseFormProps as UseFormCoreProps,
  type UseFormReturnType as UseFormReturnTypeCore,
  useTranslate,
  useRefineContext,
  flattenObjectKeys,
} from "@refinedev/core";

export type UseFormReturnType<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables extends FieldValues = FieldValues,
  TContext extends object = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = UseFormReturn<TVariables, TContext> & {
  refineCore: UseFormReturnTypeCore<
    TQueryFnData,
    TError,
    TVariables,
    TData,
    TResponse,
    TResponseError
  >;
  saveButtonProps: {
    disabled: boolean;
    onClick: (e: React.BaseSyntheticEvent) => void;
  };
};

export type UseFormProps<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables extends FieldValues = FieldValues,
  TContext extends object = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = {
  /**
   * Configuration object for the core of the [useForm](/docs/api-reference/core/hooks/useForm/)
   * @type [`UseFormCoreProps<TQueryFnData, TError, TVariables, TData, TResponse, TResponseError>`](/docs/api-reference/core/hooks/useForm/#properties)
   */
  refineCoreProps?: UseFormCoreProps<
    TQueryFnData,
    TError,
    TVariables,
    TData,
    TResponse,
    TResponseError
  >;
  /**
   * When you have unsaved changes and try to leave the current page, **refine** shows a confirmation modal box.
   * @default `false*`
   */
  warnWhenUnsavedChanges?: boolean;
  /**
   * Disables server-side validation
   * @default false
   * @see {@link https://refine.dev/docs/advanced-tutorials/forms/server-side-form-validation/}
   */
  disableServerSideValidation?: boolean;
} & UseHookFormProps<TVariables, TContext>;

export const useForm = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables extends FieldValues = FieldValues,
  TContext extends object = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
>({
  refineCoreProps,
  warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
  disableServerSideValidation: disableServerSideValidationProp = false,
  ...rest
}: UseFormProps<
  TQueryFnData,
  TError,
  TVariables,
  TContext,
  TData,
  TResponse,
  TResponseError
> = {}): UseFormReturnType<
  TQueryFnData,
  TError,
  TVariables,
  TContext,
  TData,
  TResponse,
  TResponseError
> => {
  const { options } = useRefineContext();
  const disableServerSideValidation =
    options?.disableServerSideValidation || disableServerSideValidationProp;

  const translate = useTranslate();

  const { warnWhenUnsavedChanges: warnWhenUnsavedChangesRefine, setWarnWhen } =
    useWarnAboutChange();
  const warnWhenUnsavedChanges =
    warnWhenUnsavedChangesProp ?? warnWhenUnsavedChangesRefine;

  const useHookFormResult = useHookForm<TVariables, TContext>({
    ...rest,
  });

  const {
    watch,
    setValue,
    getValues,
    handleSubmit: handleSubmitReactHookForm,
    setError,
  } = useHookFormResult;

  const useFormCoreResult = useFormCore<
    TQueryFnData,
    TError,
    TVariables,
    TData,
    TResponse,
    TResponseError
  >({
    ...refineCoreProps,
    onMutationError: (error, _variables, _context) => {
      if (disableServerSideValidation) {
        refineCoreProps?.onMutationError?.(error, _variables, _context);
        return;
      }

      const errors = error?.errors;

      for (const key in errors) {
        // when the key is not registered in the form, react-hook-form not working
        const isKeyInVariables = Object.keys(
          flattenObjectKeys(_variables),
        ).includes(key);

        if (!isKeyInVariables) {
          continue;
        }

        const fieldError = errors[key];

        let newError = "";

        if (Array.isArray(fieldError)) {
          newError = fieldError.join(" ");
        }

        if (typeof fieldError === "string") {
          newError = fieldError;
        }

        if (typeof fieldError === "boolean" && fieldError) {
          newError = "Field is not valid.";
        }

        if (typeof fieldError === "object" && "key" in fieldError) {
          const translatedMessage = translate(
            fieldError.key,
            fieldError.message,
          );

          newError = translatedMessage;
        }

        setError(key as Path<TVariables>, {
          message: newError,
        });
      }

      refineCoreProps?.onMutationError?.(error, _variables, _context);
    },
  });

  const { query, onFinish, formLoading, onFinishAutoSave } = useFormCoreResult;

  useEffect(() => {
    const data = query?.data?.data;
    if (!data) return;

    /**
     * get registered fields from react-hook-form
     */
    const registeredFields = Object.keys(flattenObjectKeys(getValues()));

    /**
     * set values from query result as default values
     */
    registeredFields.forEach((path) => {
      const hasValue = has(data, path);
      const dataValue = get(data, path);

      /**
       * set value if the path exists in the query result even if the value is null
       */
      if (hasValue) {
        setValue(path as Path<TVariables>, dataValue);
      }
    });
  }, [query?.data, setValue, getValues]);

  useEffect(() => {
    const subscription = watch((values: any, { type }: { type?: any }) => {
      if (type === "change") {
        onValuesChange(values);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onValuesChange = (changeValues: TVariables) => {
    if (warnWhenUnsavedChanges) {
      setWarnWhen(true);
    }

    if (refineCoreProps?.autoSave?.enabled) {
      setWarnWhen(false);

      const onFinishProps =
        refineCoreProps.autoSave?.onFinish ?? ((values: TVariables) => values);

      return onFinishAutoSave(onFinishProps(changeValues)).catch(
        (error) => error,
      );
    }

    return changeValues;
  };

  const handleSubmit: UseFormHandleSubmit<TVariables> =
    (onValid, onInvalid) => async (e) => {
      setWarnWhen(false);
      return handleSubmitReactHookForm(onValid, onInvalid)(e);
    };

  const saveButtonProps = {
    disabled: formLoading,
    onClick: (e: React.BaseSyntheticEvent) => {
      handleSubmit(
        (v) => onFinish(v).catch(() => {}),
        () => false,
      )(e);
    },
  };

  return {
    ...useHookFormResult,
    handleSubmit,
    refineCore: useFormCoreResult,
    saveButtonProps,
  };
};
