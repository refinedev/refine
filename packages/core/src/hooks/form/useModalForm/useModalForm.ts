import {
    useModalForm as useModalFormSF,
    UseModalFormConfig as UseModalFormConfigSF,
} from "sunflower-antd";
import { useEffect } from "react";

import {
    useForm,
    useMutationMode,
    useTranslate,
    useWarnAboutChange,
} from "@hooks";
import { BaseRecord, HttpError, ModalFormSF } from "../../../interfaces";
import { useFormProps } from "../useForm";

type useModalFormConfig = {
    action: "show" | "edit" | "create";
};

export type useModalFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {}
> = useFormProps<TData, TError, TVariables> &
    UseModalFormConfigSF &
    useModalFormConfig;
export const useModalForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {}
>({
    mutationMode: mutationModeProp,
    ...rest
}: useModalFormProps<TData, TError, TVariables>) => {
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
    const sunflowerUseModal: ModalFormSF = useModalFormSF({
        ...rest,
        form: form,
    });

    const {
        visible,
        close,
        form: modalForm,
        formProps: modalFormProps,
        modalProps,
    } = sunflowerUseModal;

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
                close();
                resetMutation?.();
            }
        }
    }, [isSuccessMutation, isLoadingMutation]);

    const saveButtonPropsSF = {
        disabled: formLoading,
        onClick: () => {
            modalForm.submit();

            if (!(mutationMode === "pessimistic")) {
                close();
            }
        },
        loading: formLoading,
    };

    const deleteButtonProps = {
        recordItemId: editId,
        onSuccess: () => {
            setEditId?.(undefined);
            sunflowerUseModal.close();
        },
    };

    return {
        ...useFormProps,
        ...sunflowerUseModal,
        show: (id?: string | number) => {
            setEditId && setEditId(id);

            setCloneId && setCloneId(id);

            sunflowerUseModal.show();
        },

        formProps: {
            ...modalFormProps,
            onValuesChange: formProps?.onValuesChange,
            onKeyUp: formProps?.onKeyUp,
            onFinish: formProps?.onFinish,
        },
        modalProps: {
            ...modalProps,
            width: "1000px",
            bodyStyle: {
                paddingTop: "55px",
            },
            onCancel: () => {
                if (warnWhen) {
                    const warnWhenConfirm = window.confirm(
                        translate(
                            "common:warnWhenUnsavedChanges",
                            "Are you sure you want to leave? You have with unsaved changes.",
                        ),
                    );

                    if (warnWhenConfirm) {
                        setWarnWhen(false);
                    } else {
                        return;
                    }
                }
                sunflowerUseModal.close();
                // setCloneId?.(undefined);
            },
        },
        saveButtonProps: saveButtonPropsSF,
        deleteButtonProps,
        formLoading,
    };
};
