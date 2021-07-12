import { useEffect, useState } from "react";
import { UseFormConfig } from "sunflower-antd";
import { FormInstance, FormProps, DrawerProps, ButtonProps } from "antd";
import {
    useForm,
    useMutationMode,
    useTranslate,
    useWarnAboutChange,
} from "@hooks";
import { BaseRecord, HttpError } from "../../../interfaces";
import { DeleteButtonProps } from "../../../components/buttons/delete";
import { useFormProps } from "../useForm";

export interface UseDrawerFormConfig extends UseFormConfig {
    action: "show" | "edit" | "create";
}

export type UseDrawerFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = useFormProps<TData, TError, TVariables> & UseDrawerFormConfig;

export type UseDrawerFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    formProps: FormProps<TVariables> & {
        form: FormInstance<TVariables>;
    };
    setVisible: (value: React.SetStateAction<boolean>) => void;
    show: (id?: string) => void;
    drawerProps: DrawerProps;
    saveButtonProps: ButtonProps;
    deleteButtonProps: DeleteButtonProps;
    formLoading: boolean;
};

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

    const {
        form,
        formProps,
        setEditId,
        editId,
        formLoading,
        mutationResult,
        setCloneId,
    } = useFormProps;

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
        recordItemId: editId,
        onSuccess: () => {
            setEditId?.(undefined);
            setVisible(false);
        },
    };

    return {
        ...useFormProps,
        setVisible,
        show: (id?: string) => {
            setEditId?.(id);

            setCloneId?.(id);

            setVisible(true);
        },
        formProps: {
            form,
            onValuesChange: formProps?.onValuesChange,
            onKeyUp: formProps?.onKeyUp,
            onFinish: formProps?.onFinish,
        },
        drawerProps: {
            width: "500px",
            bodyStyle: {
                paddingTop: "55px",
            },
            onClose: () => {
                if (warnWhen) {
                    const warnWhenConfirm = window.confirm(
                        translate(
                            "warnWhenUnsavedChanges",
                            "Are you sure you want to leave? You have with unsaved changes.",
                        ),
                    );

                    if (warnWhenConfirm) {
                        setWarnWhen(false);
                    } else {
                        return;
                    }
                }
                setVisible(false);
                setCloneId?.(undefined);
                setEditId?.(undefined);
            },
            visible,
        },
        saveButtonProps,
        deleteButtonProps,
        formLoading,
    };
};
