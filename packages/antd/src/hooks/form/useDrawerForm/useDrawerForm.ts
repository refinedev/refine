import { useCallback, useEffect, useState } from "react";
import { UseFormConfig } from "sunflower-antd";
import { FormInstance, FormProps, DrawerProps, ButtonProps } from "antd";
import {
    useMutationMode,
    useTranslate,
    useWarnAboutChange,
    UseFormProps as UseFormPropsCore,
    HttpError,
    LiveModeProps,
    BaseRecord,
    BaseKey,
} from "@pankod/refine-core";

import { useForm, UseFormProps, UseFormReturnType } from "../useForm";
import { DeleteButtonProps } from "../../../components";

export interface UseDrawerFormConfig extends UseFormConfig {
    action: "show" | "edit" | "create" | "clone";
}

export type UseDrawerFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = UseFormPropsCore<TData, TError, TVariables> &
    UseFormProps<TData, TError, TVariables> &
    UseDrawerFormConfig &
    LiveModeProps;

export type UseDrawerFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = UseFormReturnType<TData, TError, TVariables> & {
    formProps: FormProps<TVariables> & {
        form: FormInstance<TVariables>;
    };
    show: (id?: BaseKey) => void;
    close: () => void;
    drawerProps: DrawerProps;
    saveButtonProps: ButtonProps;
    deleteButtonProps: DeleteButtonProps;
    formLoading: boolean;
};

/**
 * `useDrawerForm` hook allows you to manage a form within a drawer. It returns Ant Design {@link https://ant.design/components/form/ Form} and {@link https://ant.design/components/drawer/ Drawer} components props.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/hooks/form/useDrawerForm} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for params. default `{}`
 *
 *
 */

export const useDrawerForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>({
    mutationMode: mutationModeProp,
    ...rest
}: UseDrawerFormProps<TData, TError, TVariables>): UseDrawerFormReturnType<
    TData,
    TError,
    TVariables
> => {
    const useFormProps = useForm<TData, TError, TVariables>({
        ...rest,
        mutationMode: mutationModeProp,
    });

    const { form, formProps, formLoading, mutationResult, id, setId } =
        useFormProps;

    const translate = useTranslate();

    const { warnWhen, setWarnWhen } = useWarnAboutChange();

    const [visible, setVisible] = useState(false);

    const { mutationMode: mutationModeContext } = useMutationMode();
    const mutationMode = mutationModeProp ?? mutationModeContext;

    const {
        isLoading: isLoadingMutation,
        isSuccess: isSuccessMutation,
        reset: resetMutation,
    } = mutationResult ?? {};

    useEffect(() => {
        if (visible && mutationMode === "pessimistic") {
            if (isSuccessMutation && !isLoadingMutation) {
                setVisible(false);
                resetMutation?.();
            }
        }
    }, [isSuccessMutation, isLoadingMutation]);

    const saveButtonProps = {
        disabled: formLoading,
        onClick: () => {
            form?.submit();
            if (!(mutationMode === "pessimistic")) {
                setVisible(false);
            }
        },
        loading: formLoading,
    };

    const deleteButtonProps = {
        recordItemId: id,
        onSuccess: () => {
            setId?.(undefined);
            setVisible(false);
        },
    };

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

        setVisible(false);
        setId?.(undefined);
    }, [warnWhen]);

    const handleShow = useCallback((id?: BaseKey) => {
        setId?.(id);

        setVisible(true);
    }, []);

    return {
        ...useFormProps,
        show: handleShow,
        close: handleClose,
        formProps: {
            form,
            ...useFormProps.formProps,
            onValuesChange: formProps?.onValuesChange,
            onKeyUp: formProps?.onKeyUp,
            onFinish: formProps?.onFinish,
        },
        drawerProps: {
            width: "500px",
            onClose: handleClose,
            visible,
            getContainer: false,
            forceRender: true,
        },
        saveButtonProps,
        deleteButtonProps,
        formLoading,
    };
};
