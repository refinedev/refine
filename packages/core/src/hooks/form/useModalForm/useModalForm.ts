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
import { ModalFormSF } from "../../../interfaces";
import { useEditFormProps } from "../useEditForm";
import { useCreateFormProps } from "../useCreateForm";

type useModalFormConfig = {
    action: "show" | "edit" | "create";
};

export type useModalFormProps<T> = Partial<
    useEditFormProps<T> & useCreateFormProps<T>
> &
    UseModalFormConfigSF &
    useModalFormConfig;
export const useModalForm = <RecordType>({
    mutationMode: mutationModeProp,
    ...rest
}: useModalFormProps<RecordType>) => {
    const useFormProps = useForm<RecordType>({
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

            // setCloneId && setCloneId(id);

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
