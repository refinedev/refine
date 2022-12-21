import { useCallback, useEffect } from "react";
import { FormInstance, FormProps, ModalProps } from "antd";
import {
    useModalForm as useModalFormSF,
    UseModalFormConfig as UseModalFormConfigSF,
} from "sunflower-antd";

import {
    useMutationMode,
    useTranslate,
    useWarnAboutChange,
    useResourceWithRoute,
    useRouterContext,
    HttpError,
    ResourceRouterParams,
    UseFormProps as UseFormPropsCore,
    BaseRecord,
    LiveModeProps,
    BaseKey,
    userFriendlyResourceName,
} from "@pankod/refine-core";
import { useForm, UseFormProps, UseFormReturnType } from "../useForm";

export type useModalFormFromSFReturnType<TData, TVariables> = {
    open: boolean;
    form: FormInstance<TVariables>;
    show: (id?: BaseKey) => void;
    close: () => void;
    modalProps: ModalProps;
    formProps: FormProps<TVariables>;
    formLoading: boolean;
    defaultFormValuesLoading: boolean;
    formValues: {};
    initialValues: {};
    formResult: undefined;
    submit: (values?: TVariables) => Promise<TData>;
    /** @deprecated Please use `open` instead. */
    visible: boolean;
};

type useModalFormConfig = {
    action: "show" | "edit" | "create" | "clone";
};

export type UseModalFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = Omit<
    UseFormReturnType<TData, TError, TVariables>,
    "saveButtonProps" | "deleteButtonProps"
> &
    useModalFormFromSFReturnType<TData, TVariables>;

export type UseModalFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = UseFormPropsCore<TData, TError, TVariables> &
    UseFormProps<TData, TError, TVariables> &
    UseModalFormConfigSF &
    useModalFormConfig &
    LiveModeProps;
/**
 * `useModalForm` hook allows you to manage a form within a modal. It returns Ant Design {@link https://ant.design/components/form/ Form} and {@link https://ant.design/components/modal/ Modal} components props.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/hooks/form/useModalForm} for more details.
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
}: UseModalFormProps<TData, TError, TVariables>): UseModalFormReturnType<
    TData,
    TError,
    TVariables
> => {
    const useFormProps = useForm<TData, TError, TVariables>({
        ...rest,
        mutationMode: mutationModeProp,
    });

    const { form, formProps, setId, formLoading, mutationResult } =
        useFormProps;

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
                // Prevents resetting form values before closing modal in UI
                setTimeout(() => {
                    form.resetFields();
                });
            }
        }
    }, [isSuccessMutation, isLoadingMutation]);

    const saveButtonPropsSF = {
        disabled: formLoading,
        onClick: () => {
            modalForm.submit();

            if (!(mutationMode === "pessimistic")) {
                close();
                // Prevents resetting form values before closing modal in UI
                setTimeout(() => {
                    form.resetFields();
                });
            }
        },
        loading: formLoading,
    };

    const { useParams } = useRouterContext();

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

        setId?.(undefined);
        sunflowerUseModal.close();
    }, [warnWhen]);

    const handleShow = useCallback((id?: BaseKey) => {
        setId?.(id);

        sunflowerUseModal.show();
    }, []);

    return {
        ...useFormProps,
        ...sunflowerUseModal,
        show: handleShow,
        close: handleClose,
        open: visible,
        formProps: {
            ...modalFormProps,
            ...useFormProps.formProps,
            onValuesChange: formProps?.onValuesChange,
            onKeyUp: formProps?.onKeyUp,
            onFinish: formProps.onFinish,
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
            forceRender: true,
        },
        formLoading,
    };
};
