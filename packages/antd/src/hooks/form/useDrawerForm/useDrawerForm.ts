import React, { useCallback } from "react";
import { UseFormConfig } from "sunflower-antd";
import { FormInstance, FormProps, DrawerProps, ButtonProps } from "antd";
import {
    useTranslate,
    useWarnAboutChange,
    UseFormProps as UseFormPropsCore,
    HttpError,
    LiveModeProps,
    BaseRecord,
    FormWithSyncWithLocationParams,
    BaseKey,
    useResource,
    useParsed,
    useGo,
    useModal,
} from "@refinedev/core";

import { useForm, UseFormProps, UseFormReturnType } from "../useForm";
import { DeleteButtonProps } from "../../../components";

export interface UseDrawerFormConfig extends UseFormConfig {
    action: "show" | "edit" | "create" | "clone";
}

export type UseDrawerFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = UseFormPropsCore<TData, TError, TVariables> &
    UseFormProps<TData, TError, TVariables> &
    UseDrawerFormConfig &
    LiveModeProps &
    FormWithSyncWithLocationParams & {
        defaultVisible?: boolean;
        autoSubmitClose?: boolean;
        autoResetForm?: boolean;
    };

export type UseDrawerFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = UseFormReturnType<TData, TError, TVariables> & {
    formProps: FormProps<TVariables> & {
        form: FormInstance<TVariables>;
    };
    show: (id?: BaseKey) => void;
    close: () => void;
    drawerProps: DrawerProps;
    saveButtonProps: ButtonProps;
    deleteButtonProps: DeleteButtonProps;
    formLoading: boolean;
};

/**
 * `useDrawerForm` hook allows you to manage a form within a drawer. It returns Ant Design {@link https://ant.design/components/form/ Form} and {@link https://ant.design/components/drawer/ Drawer} components props.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/hooks/form/useDrawerForm} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for params. default `{}`
 *
 *
 */

export const useDrawerForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>({
    syncWithLocation,
    defaultVisible = false,
    autoSubmitClose = true,
    autoResetForm = true,
    ...rest
}: UseDrawerFormProps<TData, TError, TVariables>): UseDrawerFormReturnType<
    TData,
    TError,
    TVariables
> => {
    const initiallySynced = React.useRef(false);

    const { visible, show, close } = useModal({
        defaultVisible,
    });

    const useFormProps = useForm<TData, TError, TVariables>({
        ...rest,
    });

    const { form, formProps, formLoading, id, setId, onFinish } = useFormProps;

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
            ? `drawer-${resource?.identifier ?? resource?.name}-${action}`
            : undefined;

    React.useEffect(() => {
        if (initiallySynced.current === false && syncWithLocationKey) {
            const openStatus = parsed?.params?.[syncWithLocationKey]?.open;
            if (typeof openStatus === "boolean") {
                openStatus ? show() : close();
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
    }, [id, visible, show, close, syncWithLocationKey, syncingId]);

    const translate = useTranslate();

    const { warnWhen, setWarnWhen } = useWarnAboutChange();

    const submit = async () => {
        await onFinish(form.getFieldsValue());

        if (autoSubmitClose) {
            close();
        }

        if (autoResetForm) {
            form.resetFields();
        }
    };

    const saveButtonProps = {
        disabled: formLoading,
        onClick: submit,
        loading: formLoading,
    };

    const deleteButtonProps = {
        recordItemId: id,
        onSuccess: () => {
            setId?.(undefined);
            close();
        },
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

        close();
        setId?.(undefined);
    }, [warnWhen]);

    const handleShow = useCallback(
        (showId?: BaseKey) => {
            if (typeof showId !== "undefined") {
                setId?.(showId);
            }
            if (typeof showId !== "undefined" || typeof id !== "undefined") {
                show();
            }
        },
        [id],
    );

    return {
        ...useFormProps,
        show: handleShow,
        close: handleClose,
        formProps: {
            form,
            ...useFormProps.formProps,
            onValuesChange: formProps?.onValuesChange,
            onKeyUp: formProps?.onKeyUp,
            onFinish: formProps.onFinish,
        },
        drawerProps: {
            width: "500px",
            onClose: handleClose,
            open: visible,
            forceRender: true,
        },
        saveButtonProps,
        deleteButtonProps,
        formLoading,
    };
};
