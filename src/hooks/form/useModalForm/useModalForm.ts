import { useModalForm as useModalFormSF } from "sunflower-antd";
import { useForm } from "@hooks";

type useModalFormProps = {
    action: "show" | "edit" | "create";
};
export const useModalForm = ({ action }: useModalFormProps) => {
    const {
        form,
        formProps,
        setEditId,
        editId,
        isLoading,
        isLoadingMutate,
    } = useForm({
        action,
    });

    const sunflowerUseModal = useModalFormSF({
        form: form,
        submit: (values) => {
            formProps?.onFinish(values as any);
        },
    });

    const saveButtonPropsSF = {
        disabled: isLoading,
        onClick: () => {
            form.submit();
            sunflowerUseModal.close();
        },
        loading: isLoadingMutate,
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
            ...sunflowerUseModal.formProps,
            onValuesChange: formProps?.onValuesChange,
            onKeyUp: formProps?.onKeyUp,
        },
        modalProps: {
            ...sunflowerUseModal.modalProps,
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
