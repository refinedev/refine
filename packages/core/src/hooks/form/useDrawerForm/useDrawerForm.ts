import { useEffect, useState } from "react";

import {
    useForm,
    useMutationMode,
    useTranslate,
    useWarnAboutChange,
} from "@hooks";
import { useEditFormProps } from "../useEditForm";
import { useCreateFormProps } from "../useCreateForm";
import { UseFormConfig } from "sunflower-antd";

export interface UseDrawerFormConfig extends UseFormConfig {
    action: "show" | "edit" | "create";
}

export type UseDrawerFormProps = Partial<
    useEditFormProps & useCreateFormProps
> &
    UseDrawerFormConfig;

export const useDrawerForm = ({
    mutationMode: mutationModeProp,
    ...rest
}: UseDrawerFormProps) => {
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
        show: (id?: string | number) => {
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
