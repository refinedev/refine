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

export type UseModalFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = Record<string, unknown>,
> = UseFormReturnType<TData, TError, TVariables> & {
    modal: {
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
    TVariables = Record<string, unknown>,
> = UseFormProps<TData, TError, TVariables> & {
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
>({
    modalProps,
    refineCoreProps,
    ...rest
}: UseModalFormProps<TData, TError, TVariables> = {}): UseModalFormReturnType<
    TData,
    TError,
    TVariables
> => {
    const translate = useTranslate();

    const { resource: resourceProp, action: actionProp } =
        refineCoreProps ?? {};
    const {
        defaultVisible = false,
        autoSubmitClose = true,
        autoResetForm = true,
    } = modalProps ?? {};

    const useMantineFormResult = useForm<TData, TError, TVariables>({
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
            onClick: (e) => onSubmit(submit)(e),
        },
    };
};
