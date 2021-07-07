import { useEffect } from "react";
import {
    useModalForm as useModalFormSF,
    UseModalFormConfig as UseModalFormConfigSF,
} from "sunflower-antd";
import { useParams } from "react-router-dom";

import {
    useForm,
    useMutationMode,
    useTranslate,
    useWarnAboutChange,
    useResourceWithRoute,
} from "../../../hooks";
import {
    BaseRecord,
    HttpError,
    ResourceRouterParams,
} from "../../../interfaces";
import { userFriendlyResourceName } from "@definitions";
import { useModalFormFromSFReturnType } from "../../../../types/sunflower";
import { useFormProps } from "../useForm";

type useModalFormConfig = {
    action: "show" | "edit" | "create";
};

export type useModalFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = useForm<TData, TError, TVariables> &
    useModalFormFromSFReturnType<TData, TVariables>;

export type useModalFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = useFormProps<TData, TError, TVariables> &
    UseModalFormConfigSF &
    useModalFormConfig;
export const useModalForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>({
    mutationMode: mutationModeProp,
    ...rest
}: useModalFormProps<TData, TError, TVariables>): useModalFormReturnType<
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
        formLoading,
        mutationResult,
        setCloneId,
    } = useFormProps;

    const translate = useTranslate();

    const { warnWhen, setWarnWhen } = useWarnAboutChange();
    const sunflowerUseModal = useModalFormSF<TData, TVariables>({
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
            form.resetFields();
        },
        loading: formLoading,
    };

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();
    const resource = resourceWithRoute(rest.resource ?? routeResourceName);

    return {
        ...useFormProps,
        ...sunflowerUseModal,
        show: (id?: string) => {
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
            okButtonProps: saveButtonPropsSF,
            destroyOnClose: true,
            title: translate(
                `${resource.name}.titles.${rest.action}`,
                `${userFriendlyResourceName(
                    `${rest.action} ${resource.name}`,
                    "singular",
                )}`,
            ),
            okText: translate("buttons.save", "Save"),
            cancelText: translate("buttons.cancel", "Cancel"),
            onCancel: () => {
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
                sunflowerUseModal.close();
            },
        },
        formLoading,
    };
};
