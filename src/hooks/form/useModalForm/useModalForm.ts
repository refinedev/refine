import {
    useModalForm as useModalFormSF,
    UseModalFormConfig as UseModalFormConfigSF,
} from "sunflower-antd";
import { useForm, useMutationMode } from "@hooks";
import { useEffect } from "react";
import { MutationMode } from "../../../interfaces";
import { useEditFormProps } from "../useEditForm";
import { useCreateFormProps } from "../useCreateForm";

type useModalFormConfig = {
    action: "show" | "edit" | "create";
    mutationMode?: MutationMode;
};
export type useModalFormProps = (useEditFormProps | useCreateFormProps) &
    UseModalFormConfigSF &
    useModalFormConfig;
export const useModalForm = ({
    mutationMode: mutationModeProp,
    ...rest
}: useModalFormProps) => {
    const {
        form,
        formProps,
        setEditId,
        editId,
        isLoading,
        isFetching,
        isLoadingMutation,
        isSuccessMutation,
        resetMutation,
    } = useForm({
        ...rest,
        mutationModeProp,
    });

    const sunflowerUseModal = useModalFormSF({
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

    useEffect(() => {
        if (visible && mutationMode === "pessimistic") {
            if (isSuccessMutation && !isLoadingMutation) {
                close();
                resetMutation?.();
            }
        }
    }, [isSuccessMutation, isLoadingMutation]);

    const saveButtonPropsSF = {
        disabled: isLoading || isFetching,
        onClick: () => {
            modalForm.submit();

            if (!(mutationMode === "pessimistic")) {
                close();
            }
        },
        loading: isLoadingMutation || isFetching,
    };

    const deleteButtonProps = {
        recordItemId: editId,
        onSuccess: sunflowerUseModal.close,
    };

    return {
        ...sunflowerUseModal,
        show: (id: string | number) => {
            setEditId && setEditId(id);
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
        },
        isLoading: isLoading,
        isFetching,
        saveButtonProps: saveButtonPropsSF,
        editId,
        deleteButtonProps,
    };
};
