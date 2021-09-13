import { useCallback, useEffect } from "react";
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
import { useFormProps, UseFormReturnType } from "../useForm";

type useModalFormConfig = {
    action: "show" | "edit" | "create";
};

export type useModalFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = Omit<
    UseFormReturnType<TData, TError, TVariables>,
    "saveButtonProps" | "deleteButtonProps"
> &
    useModalFormFromSFReturnType<TData, TVariables>;

export type useModalFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = useFormProps<TData, TError, TVariables> &
    UseModalFormConfigSF &
    useModalFormConfig;
/**
 * `useModalForm` hook allows you to manage a form within a modal. It returns Ant Design {@link https://ant.design/components/form/ Form} and {@link https://ant.design/components/modal/ Modal} components props.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/form/useModalForm} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for params. default `{}`
 *
 *
 */
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
        },
        loading: formLoading,
    };

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();
    const resource = resourceWithRoute(rest.resource ?? routeResourceName);

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

        setEditId?.(undefined);
        setCloneId?.(undefined);
        sunflowerUseModal.close();
    }, [warnWhen]);

    const handleShow = useCallback((id?: string) => {
        setEditId?.(id);

        setCloneId?.(id);

        sunflowerUseModal.show();
    }, []);

    return {
        ...useFormProps,
        ...sunflowerUseModal,
        show: handleShow,
        close: handleClose,
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
            title: translate(
                `${resource.name}.titles.${rest.action}`,
                `${userFriendlyResourceName(
                    `${rest.action} ${resource.name}`,
                    "singular",
                )}`,
            ),
            okText: translate("buttons.save", "Save"),
            cancelText: translate("buttons.cancel", "Cancel"),
            onCancel: handleClose,
        },
        formLoading,
    };
};
