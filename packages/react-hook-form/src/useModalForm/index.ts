import { useCallback } from "react";
import {
    BaseKey,
    BaseRecord,
    HttpError,
    useModal,
    useResource,
    userFriendlyResourceName,
    useTranslate,
    useWarnAboutChange,
} from "@pankod/refine-core";
import { FieldValues } from "react-hook-form";

import { useForm, UseFormProps, UseFormReturnType } from "../useForm";

export type UseModalFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
> = UseFormReturnType<TData, TError, TVariables, TContext> & {
    modal: {
        submitButtonProps: {
            disabled: boolean;
            onClick: (values: TVariables) => void;
            loading: boolean;
        };
        submit: (values: TVariables) => void;
        close: () => void;
        show: (id?: BaseKey) => void;
        visible: boolean;
        title: string;
    };
};

export type UseModalFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
> = UseFormProps<TData, TError, TVariables, TContext> & {
    modalOptions?: {
        defaultVisible?: boolean;
        autoSubmitClose?: boolean;
        autoResetForm?: boolean;
    };
};

export const useModalForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
>({
    modalOptions,
    refineCoreProps,
    ...rest
}: UseModalFormProps<
    TData,
    TError,
    TVariables,
    TContext
> = {}): UseModalFormReturnType<TData, TError, TVariables, TContext> => {
    const translate = useTranslate();

    const { resource: resourceProp, action: actionProp } =
        refineCoreProps ?? {};
    const {
        defaultVisible = false,
        autoSubmitClose = true,
        autoResetForm = true,
    } = modalOptions ?? {};

    const useHookFormResult = useForm({
        refineCoreProps,
        ...rest,
    });

    const {
        reset,
        refineCore: { onFinish, formLoading, setId },
    } = useHookFormResult;

    const { visible, show, close } = useModal({
        defaultVisible,
    });

    const submit = async (values: TVariables) => {
        await onFinish(values);

        if (autoSubmitClose) {
            close();
        }

        if (autoResetForm) {
            reset();
        }
    };

    const { resourceName } = useResource({
        resourceNameOrRouteName: resourceProp,
    });

    const { warnWhen, setWarnWhen } = useWarnAboutChange();
    const handleClose = useCallback(() => {
        if (warnWhen) {
            const warnWhenConfirm = window.confirm(
                translate(
                    "warnWhenUnsavedChanges",
                    "Are you sure you want to leave? You have unsaved changes.",
                ),
            );

            if (warnWhenConfirm) {
                setWarnWhen(false);
            } else {
                return;
            }
        }

        setId?.(undefined);
        close();
    }, [warnWhen]);

    const handleShow = useCallback((id?: BaseKey) => {
        setId?.(id);

        show();
    }, []);

    const submitButtonProps = {
        disabled: formLoading,
        onClick: submit,
        loading: formLoading,
    };

    const title = translate(
        `${resourceName}.titles.${actionProp}`,
        `${userFriendlyResourceName(
            `${actionProp} ${resourceName}`,
            "singular",
        )}`,
    );

    return {
        modal: {
            submitButtonProps,
            submit,
            close: handleClose,
            show: handleShow,
            visible,
            title,
        },
        ...useHookFormResult,
    };
};
