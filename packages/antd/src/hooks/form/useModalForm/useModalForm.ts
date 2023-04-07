import React, { useCallback } from "react";
import { FormInstance, FormProps, ModalProps } from "antd";
import {
    useModalForm as useModalFormSF,
    UseModalFormConfig as UseModalFormConfigSF,
} from "sunflower-antd";

import {
    useTranslate,
    useWarnAboutChange,
    HttpError,
    UseFormProps as UseFormPropsCore,
    BaseRecord,
    LiveModeProps,
    BaseKey,
    userFriendlyResourceName,
    useResource,
    FormWithSyncWithLocationParams,
    useParsed,
    useGo,
} from "@refinedev/core";
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
    TSelectData extends BaseRecord = TData,
> = Omit<
    UseFormReturnType<TData, TError, TVariables, TSelectData>,
    "saveButtonProps" | "deleteButtonProps"
> &
    useModalFormFromSFReturnType<TSelectData, TVariables>;

export type UseModalFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
    TSelectData extends BaseRecord = TData,
> = UseFormPropsCore<TData, TError, TVariables, TSelectData> &
    UseFormProps<TData, TError, TVariables, TSelectData> &
    UseModalFormConfigSF &
    useModalFormConfig &
    LiveModeProps &
    FormWithSyncWithLocationParams;
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
    TSelectData extends BaseRecord = TData,
>({
    syncWithLocation,
    ...rest
}: UseModalFormProps<
    TData,
    TError,
    TVariables,
    TSelectData
>): UseModalFormReturnType<TData, TError, TVariables, TSelectData> => {
    const initiallySynced = React.useRef(false);

    const useFormProps = useForm<TData, TError, TVariables, TSelectData>({
        ...rest,
    });

    const { form, formProps, id, setId, formLoading, onFinish } = useFormProps;

    const { resource, action: actionFromParams } = useResource(rest.resource);

    const parsed = useParsed();
    const go = useGo();

    const action = rest.action ?? actionFromParams ?? "";

    const syncingId =
        typeof syncWithLocation === "object" && syncWithLocation.syncId;

    const syncWithLocationKey =
        typeof syncWithLocation === "object" && "key" in syncWithLocation
            ? syncWithLocation.key
            : resource && action && syncWithLocation
            ? `modal-${resource?.identifier ?? resource?.name}-${action}`
            : undefined;

    const translate = useTranslate();

    const { warnWhen, setWarnWhen } = useWarnAboutChange();

    const sunflowerUseModal = useModalFormSF<TSelectData, TVariables>({
        ...rest,
        form: form,
        submit: onFinish as any,
    });

    const {
        visible,
        show,
        formProps: modalFormProps,
        modalProps,
    } = sunflowerUseModal;

    React.useEffect(() => {
        if (initiallySynced.current === false && syncWithLocationKey) {
            const openStatus = parsed?.params?.[syncWithLocationKey]?.open;
            if (typeof openStatus === "boolean") {
                if (openStatus) {
                    show();
                }
            } else if (typeof openStatus === "string") {
                if (openStatus === "true") {
                    show();
                }
            }

            if (syncingId) {
                const idFromParams = parsed?.params?.[syncWithLocationKey]?.id;
                if (idFromParams) {
                    setId?.(idFromParams);
                }
            }

            initiallySynced.current = true;
        }
    }, [syncWithLocationKey, parsed, syncingId, setId]);

    React.useEffect(() => {
        if (initiallySynced.current === true) {
            if (visible && syncWithLocationKey) {
                go({
                    query: {
                        [syncWithLocationKey]: {
                            ...parsed?.params?.[syncWithLocationKey],
                            open: true,
                            ...(syncingId && id && { id }),
                        },
                    },
                    options: { keepQuery: true },
                    type: "replace",
                });
            } else if (syncWithLocationKey && !visible) {
                go({
                    query: {
                        [syncWithLocationKey]: undefined,
                    },
                    options: { keepQuery: true },
                    type: "replace",
                });
            }
        }
    }, [id, visible, show, syncWithLocationKey, syncingId]);

    const saveButtonPropsSF = {
        disabled: formLoading,
        loading: formLoading,
    };

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

    const handleShow = useCallback(
        (showId?: BaseKey) => {
            if (typeof showId !== "undefined") {
                setId?.(showId);
            }
            if (typeof showId !== "undefined" || typeof id !== "undefined") {
                sunflowerUseModal.show();
            }
        },
        [id],
    );

    const { visible: _visible, ...otherModalProps } = modalProps;
    const newModalProps = { open: _visible, ...otherModalProps };

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
            ...newModalProps,
            width: "1000px",
            okButtonProps: saveButtonPropsSF,
            title: translate(
                `${resource?.name}.titles.${rest.action}`,
                `${userFriendlyResourceName(
                    `${rest.action} ${
                        resource?.meta?.label ??
                        resource?.options?.label ??
                        resource?.label ??
                        resource?.name
                    }`,
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
