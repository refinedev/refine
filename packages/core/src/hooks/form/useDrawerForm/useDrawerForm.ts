import { useEffect } from "react";
import { DrawerProps } from "antd/lib/drawer";

import {
    useForm,
    useMutationMode,
    useTranslate,
    useWarnAboutChange,
} from "@hooks";
// import { ModalFormSF } from "../../../interfaces";
import { useEditFormProps } from "../useEditForm";
import { useCreateFormProps } from "../useCreateForm";

type useModalFormConfig = {
    action: "show" | "edit" | "create";
};

export type useDrawerFormProps = Partial<
    useEditFormProps & useCreateFormProps
> &
    useModalFormConfig;

export const useDrawerForm = ({
    mutationMode: mutationModeProp,
    ...rest
}: useDrawerFormProps) => {
    const useFormProps = useForm({
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

    // const translate = useTranslate();

    // const { warnWhen, setWarnWhen } = useWarnAboutChange();
    // const sunflowerUseModal: ModalFormSF = useModalFormSF({
    //     ...rest,
    //     form: form,
    // });

    // const {
    //     visible,
    //     close,
    //     form: modalForm,
    //     formProps: modalFormProps,
    //     modalProps,
    // } = sunflowerUseModal;

    // const { mutationMode: mutationModeContext } = useMutationMode();
    // const mutationMode = mutationModeProp ?? mutationModeContext;

    // const {
    //     isLoading: isLoadingMutation,
    //     isSuccess: isSuccessMutation,
    //     reset: resetMutation,
    // } = mutationResult ?? {};

    // useEffect(() => {
    //     if (visible && mutationMode === "pessimistic") {
    //         if (isSuccessMutation && !isLoadingMutation) {
    //             close();
    //             resetMutation?.();
    //         }
    //     }
    // }, [isSuccessMutation, isLoadingMutation]);

    // const saveButtonPropsSF = {
    //     disabled: formLoading,
    //     onClick: () => {
    //         modalForm.submit();

    //         if (!(mutationMode === "pessimistic")) {
    //             close();
    //         }
    //     },
    //     loading: formLoading,
    // };

    // const deleteButtonProps = {
    //     recordItemId: editId,
    //     onSuccess: () => {
    //         setEditId?.(undefined);
    //         sunflowerUseModal.close();
    //     },
    // };

    return {
        ...useFormProps,
        show: (id?: string | number) => {
            setEditId?.(id);

            setCloneId?.(id);

            // sunflowerUseModal.show();
        },

        formProps: {
            // ...modalFormProps,
            onValuesChange: formProps?.onValuesChange,
            onKeyUp: formProps?.onKeyUp,
            onFinish: formProps?.onFinish,
        },
        drawerProps: {
            // ...modalProps,
            width: "1000px",
            bodyStyle: {
                paddingTop: "55px",
            },
        },
        // saveButtonProps: saveButtonPropsSF,
        // deleteButtonProps,
        formLoading,
    };
};
