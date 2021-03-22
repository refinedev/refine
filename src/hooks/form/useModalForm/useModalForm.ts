import { useModalForm as useModalFormSF } from "sunflower-antd";
import { useForm, useMutationMode } from "@hooks";
import { useEffect } from "react";
import { MutationMode } from "../../../interfaces";

type useModalFormProps = {
    action: "show" | "edit" | "create";
    mutationMode?: MutationMode;
};
export const useModalForm = ({
    action,
    mutationMode: mutationModeProp,
}: useModalFormProps) => {
    const {
        form,
        formProps,
        setEditId,
        editId,
        isLoading,
        isLoadingMutation,
        isSuccessMutation,
        resetMutation,
    } = useForm({
        action,
        mutationModeProp,
    });

    const sunflowerUseModal = useModalFormSF({
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
        disabled: isLoading,
        onClick: () => {
            modalForm.submit();

            if (!(mutationMode === "pessimistic")) {
                close();
            }
        },
        loading: isLoadingMutation,
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
        saveButtonProps: saveButtonPropsSF,
        editId,
        deleteButtonProps,
    };
};
