import {
    type BaseKey,
    type BaseRecord,
    type HttpError,
} from "@refinedev/core";
import { useTable, type UseTableReturnType } from "@refinedev/react-table";
import { useForm, type UseFormReturnType } from "@refinedev/react-hook-form";
import type { FieldValues } from "react-hook-form";

export type UseEditableTableReturnType<
    TQueryFnData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
    TData extends BaseRecord = TQueryFnData,
    TResponse extends BaseRecord = TData,
    TResponseError extends HttpError = TError,
> = UseTableReturnType<TData, TError> & {
    form: UseFormReturnType<
        TQueryFnData,
        TError,
        TVariables,
        TContext,
        TData,
        TResponse,
        TResponseError
    >;
    isEditing: (id: BaseKey) => boolean;
    edit: (id: BaseKey, record?: TData) => void;
    save: () => Promise<void>;
    cancel: () => void;
};

export type UseEditableTableProps<
    TQueryFnData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
    TData extends BaseRecord = TQueryFnData,
    TResponse extends BaseRecord = TData,
    TResponseError extends HttpError = TError,
> = {
    tableProps?: Parameters<typeof useTable<TQueryFnData, TError, TData>>[0];
    formProps?: Parameters<
        typeof useForm<
            TQueryFnData,
            TError,
            TVariables,
            TContext,
            TData,
            TResponse,
            TResponseError
        >
    >[0];
    autoSubmitClose?: boolean;
};

export const useEditableTable = <
    TQueryFnData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
    TData extends BaseRecord = TQueryFnData,
    TResponse extends BaseRecord = TData,
    TResponseError extends HttpError = TError,
>({
    tableProps,
    formProps,
    autoSubmitClose = true,
}: UseEditableTableProps<
    TQueryFnData,
    TError,
    TVariables,
    TContext,
    TData,
    TResponse,
    TResponseError
> = {}): UseEditableTableReturnType<
    TQueryFnData,
    TError,
    TVariables,
    TContext,
    TData,
    TResponse,
    TResponseError
> => {
    const table = useTable<TQueryFnData, TError, TData>(tableProps);

    const form = useForm<
        TQueryFnData,
        TError,
        TVariables,
        TContext,
        TData,
        TResponse,
        TResponseError
    >({
        ...formProps,
        refineCoreProps: {
            ...formProps?.refineCoreProps,
            action: "edit",
            redirect: false,
        },
    });

    const { id: editId, setId, onFinish } = form.refineCore;

    const isEditing = (id: BaseKey) => editId === id;

    const edit = (id: BaseKey, record?: TData) => {
        setId(id);
        if (record) {
            form.reset(record as TVariables);
        }
    };

    const save = form.handleSubmit(async (values) => {
        await onFinish(values);

        if (autoSubmitClose) {
            setId(undefined);
        }
    });

    const cancel = () => {
        setId(undefined);
        form.reset();
    };

    return {
        table,
        form,
        isEditing,
        edit,
        save,
        cancel,
    };
};
