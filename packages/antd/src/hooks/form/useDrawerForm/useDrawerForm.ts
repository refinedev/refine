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
    TQueryFnData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
    TData extends BaseRecord = TQueryFnData,
    TResponse extends BaseRecord = TData,
    TResponseError extends HttpError = TError,
> = UseFormPropsCore<
    TQueryFnData,
    TError,
    TVariables,
    TData,
    TResponse,
    TResponseError
> &
    UseFormProps<
        TQueryFnData,
        TError,
        TVariables,
        TData,
        TResponse,
        TResponseError
    > &
    UseDrawerFormConfig &
    LiveModeProps &
    FormWithSyncWithLocationParams & {
        defaultVisible?: boolean;
        autoSubmitClose?: boolean;
        autoResetForm?: boolean;
    };

export type UseDrawerFormReturnType<
    TQueryFnData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
    TData extends BaseRecord = TQueryFnData,
    TResponse extends BaseRecord = TData,
    TResponseError extends HttpError = TError,
> = UseFormReturnType<
    TQueryFnData,
    TError,
    TVariables,
    TData,
    TResponse,
    TResponseError
> & {
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
    TQueryFnData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
    TData extends BaseRecord = TQueryFnData,
    TResponse extends BaseRecord = TData,
    TResponseError extends HttpError = TError,
>({
    syncWithLocation,
    defaultVisible = false,
    autoSubmitClose = true,
    autoResetForm = true,
    ...rest
}: UseDrawerFormProps<
    TQueryFnData,
    TError,
    TVariables,
    TData,
    TResponse,
    TResponseError
>): UseDrawerFormReturnType<
    TQueryFnData,
    TError,
    TVariables,
    TData,
    TResponse,
    TResponseError
> => {
    const { visible, show, close } = useModal({
        defaultVisible,
    });

    const useFormProps = useForm<
        TQueryFnData,
        TError,
        TVariables,
        TData,
        TResponse,
        TResponseError
    >({
        ...rest,
    });
    const [initiallySynced, setInitiallySynced] = React.useState(false);
    const { form, formProps, formLoading, id, setId, onFinish } = useFormProps;

    const { resource, action: actionFromParams } = useResource(rest.resource);

    const parsed = useParsed();
    const go = useGo();

    const action = rest.action ?? actionFromParams ?? "";

    const syncingId = !(
        typeof syncWithLocation === "object" &&
        syncWithLocation?.syncId === false
    );

    const syncWithLocationKey =
        typeof syncWithLocation === "object" && "key" in syncWithLocation
            ? syncWithLocation.key
            : resource && action && syncWithLocation
            ? `drawer-${resource?.identifier ?? resource?.name}-${action}`
            : undefined;

    React.useEffect(() => {
        if (initiallySynced === false && syncWithLocationKey) {
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

            setInitiallySynced(true);
        }
    }, [syncWithLocationKey, parsed, syncingId, setId, initiallySynced]);

    React.useEffect(() => {
        if (initiallySynced === true) {
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
    }, [
        id,
        visible,
        show,
        close,
        syncWithLocationKey,
        syncingId,
        initiallySynced,
    ]);

    const translate = useTranslate();

    const { warnWhen, setWarnWhen } = useWarnAboutChange();

    const saveButtonProps = {
        disabled: formLoading,
        onClick: () => {
            form.submit();
        },
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
            const needsIdToOpen = action === "edit" || action === "clone";
            const hasId =
                typeof showId !== "undefined" || typeof id !== "undefined";
            if (needsIdToOpen ? hasId : true) {
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
            onFinish: async (values) => {
                await onFinish(values);

                if (autoSubmitClose) {
                    close();
                }

                if (autoResetForm) {
                    form.resetFields();
                }
            },
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
