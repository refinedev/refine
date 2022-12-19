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

import { useForm, UseFormProps, UseFormReturnType } from "../useForm";
import { UseFormInput } from "@mantine/form/lib/types";

export type UseModalFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = Record<string, unknown>,
    TTransformed = TVariables,
> = UseFormReturnType<TData, TError, TVariables, TTransformed> & {
    modal: {
        submit: (
            values: ReturnType<
                NonNullable<
                    UseFormInput<
                        TVariables,
                        (values: TVariables) => TTransformed
                    >["transformValues"]
                >
            >,
        ) => void;
        close: () => void;
        show: (id?: BaseKey) => void;
        visible: boolean;
        title: string;
    };
};

export type UseModalFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = Record<string, unknown>,
    TTransformed = TVariables,
> = UseFormProps<TData, TError, TVariables, TTransformed> & {
    modalProps?: {
        defaultVisible?: boolean;
        autoSubmitClose?: boolean;
        autoResetForm?: boolean;
    };
};

export const useModalForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = Record<string, unknown>,
    TTransformed = TVariables,
>({
    modalProps,
    refineCoreProps,
    ...rest
}: UseModalFormProps<
    TData,
    TError,
    TVariables,
    TTransformed
> = {}): UseModalFormReturnType<TData, TError, TVariables, TTransformed> => {
    const translate = useTranslate();

    const { resource: resourceProp, action: actionProp } =
        refineCoreProps ?? {};
    const {
        defaultVisible = false,
        autoSubmitClose = true,
        autoResetForm = true,
    } = modalProps ?? {};

    const useMantineFormResult = useForm<
        TData,
        TError,
        TVariables,
        TTransformed
    >({
        refineCoreProps,
        ...rest,
    });

    const {
        reset,
        refineCore: { onFinish, setId },
        saveButtonProps,
        onSubmit,
    } = useMantineFormResult;

    const { visible, show, close } = useModal({
        defaultVisible,
    });

    const submit = async (
        values: ReturnType<
            NonNullable<
                UseFormInput<
                    TVariables,
                    (values: TVariables) => TTransformed
                >["transformValues"]
            >
        >,
    ) => {
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

    const title = translate(
        `${resourceName}.titles.${actionProp}`,
        undefined,
        `${userFriendlyResourceName(
            `${actionProp} ${resourceName}`,
            "singular",
        )}`,
    );

    return {
        modal: {
            submit,
            close: handleClose,
            show: handleShow,
            visible,
            title,
        },
        ...useMantineFormResult,
        saveButtonProps: {
            ...saveButtonProps,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error event type is not compatible with pointer event
            onClick: (e) => onSubmit(submit)(e),
        },
    };
};
