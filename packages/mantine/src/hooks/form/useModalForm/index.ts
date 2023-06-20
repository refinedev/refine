import { useCallback } from "react";
import {
    BaseKey,
    BaseRecord,
    FormWithSyncWithLocationParams,
    HttpError,
    useGo,
    useModal,
    useParsed,
    useResource,
    userFriendlyResourceName,
    useTranslate,
    useWarnAboutChange,
} from "@refinedev/core";

import { useForm, UseFormProps, UseFormReturnType } from "../useForm";
import { UseFormInput } from "@mantine/form/lib/types";
import React from "react";

export type UseModalFormReturnType<
    TQueryFnData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = Record<string, unknown>,
    TTransformed = TVariables,
    TData extends BaseRecord = TQueryFnData,
    TResponse extends BaseRecord = TData,
    TResponseError extends HttpError = TError,
> = UseFormReturnType<
    TQueryFnData,
    TError,
    TVariables,
    TTransformed,
    TData,
    TResponse,
    TResponseError
> & {
    modal: {
        submit: (
            values: ReturnType<
                NonNullable<
                    UseFormInput<
                        TVariables,
                        (values: TVariables) => TTransformed
                    >["transformValues"]
                >
            >,
        ) => void;
        close: () => void;
        show: (id?: BaseKey) => void;
        visible: boolean;
        title: string;
    };
};

export type UseModalFormProps<
    TQueryFnData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = Record<string, unknown>,
    TTransformed = TVariables,
    TData extends BaseRecord = TQueryFnData,
    TResponse extends BaseRecord = TData,
    TResponseError extends HttpError = TError,
> = UseFormProps<
    TQueryFnData,
    TError,
    TVariables,
    TTransformed,
    TData,
    TResponse,
    TResponseError
> & {
    modalProps?: {
        defaultVisible?: boolean;
        autoSubmitClose?: boolean;
        autoResetForm?: boolean;
    };
} & FormWithSyncWithLocationParams;

export const useModalForm = <
    TQueryFnData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = Record<string, unknown>,
    TTransformed = TVariables,
    TData extends BaseRecord = TQueryFnData,
    TResponse extends BaseRecord = TData,
    TResponseError extends HttpError = TError,
>({
    modalProps,
    refineCoreProps,
    syncWithLocation,
    ...rest
}: UseModalFormProps<
    TQueryFnData,
    TError,
    TVariables,
    TTransformed,
    TData,
    TResponse,
    TResponseError
> = {}): UseModalFormReturnType<
    TQueryFnData,
    TError,
    TVariables,
    TTransformed,
    TData,
    TResponse,
    TResponseError
> => {
    const [initiallySynced, setInitiallySynced] = React.useState(false);

    const translate = useTranslate();

    const { resource: resourceProp, action: actionProp } =
        refineCoreProps ?? {};
    const {
        defaultVisible = false,
        autoSubmitClose = true,
        autoResetForm = true,
    } = modalProps ?? {};

    const { resource, action: actionFromParams } = useResource(resourceProp);

    const parsed = useParsed();
    const go = useGo();

    const action = actionProp ?? actionFromParams ?? "";

    const syncingId = !(
        typeof syncWithLocation === "object" &&
        syncWithLocation?.syncId === false
    );

    const syncWithLocationKey =
        typeof syncWithLocation === "object" && "key" in syncWithLocation
            ? syncWithLocation.key
            : resource && action && syncWithLocation
            ? `modal-${resource?.identifier ?? resource?.name}-${action}`
            : undefined;

    const useMantineFormResult = useForm<
        TQueryFnData,
        TError,
        TVariables,
        TTransformed,
        TData,
        TResponse,
        TResponseError
    >({
        refineCoreProps,
        ...rest,
    });

    const {
        reset,
        refineCore: { onFinish, id, setId },
        saveButtonProps,
        onSubmit,
    } = useMantineFormResult;

    const { visible, show, close } = useModal({
        defaultVisible,
    });

    React.useEffect(() => {
        if (initiallySynced === false && syncWithLocationKey) {
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

            setInitiallySynced(true);
        }
    }, [syncWithLocationKey, parsed, syncingId, setId]);

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
    }, [id, visible, show, syncWithLocationKey, syncingId]);

    const submit = async (
        values: ReturnType<
            NonNullable<
                UseFormInput<
                    TVariables,
                    (values: TVariables) => TTransformed
                >["transformValues"]
            >
        >,
    ) => {
        await onFinish(values);

        if (autoSubmitClose) {
            close();
        }

        if (autoResetForm) {
            reset();
        }
    };

    const { warnWhen, setWarnWhen } = useWarnAboutChange();
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
        close();
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

    const title = translate(
        `${resource?.name}.titles.${actionProp}`,
        undefined,
        `${userFriendlyResourceName(
            `${actionProp} ${
                resource?.meta?.label ??
                resource?.options?.label ??
                resource?.label ??
                resource?.name
            }`,
            "singular",
        )}`,
    );

    return {
        modal: {
            submit,
            close: handleClose,
            show: handleShow,
            visible,
            title,
        },
        ...useMantineFormResult,
        saveButtonProps: {
            ...saveButtonProps,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error event type is not compatible with pointer event
            onClick: (e) => onSubmit(submit)(e),
        },
    };
};
