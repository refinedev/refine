import { useCallback, useEffect, useState } from "react";
import { UseFormConfig } from "sunflower-antd";
import { FormInstance, FormProps, DrawerProps, ButtonProps } from "antd";
import {
    useMutationMode,
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
} from "@refinedev/core";

import { useForm, UseFormProps, UseFormReturnType } from "../useForm";
import { DeleteButtonProps } from "../../../components";
import React from "react";

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
    FormWithSyncWithLocationParams;

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
    mutationMode: mutationModeProp,
    syncWithLocation,
    ...rest
}: UseDrawerFormProps<TData, TError, TVariables>): UseDrawerFormReturnType<
    TData,
    TError,
    TVariables
> => {
    const initiallySynced = React.useRef(false);

    const useFormProps = useForm<TData, TError, TVariables>({
        ...rest,
        mutationMode: mutationModeProp,
    });

    const { form, formProps, formLoading, mutationResult, id, setId } =
        useFormProps;

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

    const [open, setOpen] = useState(false);

    React.useEffect(() => {
        if (initiallySynced.current === false && syncWithLocationKey) {
            const openStatus = parsed?.params?.[syncWithLocationKey]?.open;
            if (typeof openStatus === "boolean") {
                setOpen(openStatus);
            } else if (typeof openStatus === "string") {
                setOpen(openStatus === "true");
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
            if (open && syncWithLocationKey) {
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
            } else if (syncWithLocationKey && !open) {
                go({
                    query: {
                        [syncWithLocationKey]: undefined,
                    },
                    options: { keepQuery: true },
                    type: "replace",
                });
            }
        }
    }, [id, open, syncWithLocationKey, syncingId]);

    const translate = useTranslate();

    const { warnWhen, setWarnWhen } = useWarnAboutChange();

    const { mutationMode: mutationModeContext } = useMutationMode();
    const mutationMode = mutationModeProp ?? mutationModeContext;

    const {
        isLoading: isLoadingMutation,
        isSuccess: isSuccessMutation,
        reset: resetMutation,
    } = mutationResult ?? {};

    useEffect(() => {
        if (open && mutationMode === "pessimistic") {
            if (isSuccessMutation && !isLoadingMutation) {
                setOpen(false);
                resetMutation?.();
            }
        }
    }, [isSuccessMutation, isLoadingMutation]);

    const saveButtonProps = {
        disabled: formLoading,
        onClick: () => {
            form?.submit();
            if (!(mutationMode === "pessimistic")) {
                setOpen(false);
            }
        },
        loading: formLoading,
    };

    const deleteButtonProps = {
        recordItemId: id,
        onSuccess: () => {
            setId?.(undefined);
            setOpen(false);
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

        setOpen(false);
        setId?.(undefined);
    }, [warnWhen]);

    const handleShow = useCallback((id?: BaseKey) => {
        setId?.(id);

        setOpen(true);
    }, []);

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
            open,
            forceRender: true,
        },
        saveButtonProps,
        deleteButtonProps,
        formLoading,
    };
};
