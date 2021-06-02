import { useTable } from "@hooks";
import { useTableProps } from "../useTable";
import { BaseRecord, HttpError } from "../../../interfaces";
import { useFormProps } from "../../form/useForm";
import { useTableReturnType } from "../useTable/useTable";
import { useForm } from "../../form/useForm";
import { ButtonProps } from "../../../components/antd";

export type useEditableTableReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {}
> = useTableReturnType<TData> &
    useForm<TData, TError, TVariables> & {
        saveButtonProps: ButtonProps & {
            onClick: () => void;
        };
        cancelButtonProps: ButtonProps & {
            onClick: () => void;
        };
        editButtonProps: (
            id: string,
        ) => ButtonProps & {
            onClick: () => void;
        };
        isEditing: (id: string) => boolean;
    };

type useEditableTableProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {}
> = useTableProps & useFormProps<TData, TError, TVariables>;

export const useEditableTable = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {}
>(
    props: useEditableTableProps<TData, TError, TVariables> = {},
): useEditableTableReturnType<TData, TError, TVariables> => {
    const table = useTable<TData>({ ...props });
    const edit = useForm<TData, TError, TVariables>({
        ...props,
        action: "edit",
    });

    const { form, editId, setEditId, formLoading } = edit;

    const saveButtonProps = {
        onClick: () => form.submit(),
        disabled: formLoading,
    };

    const cancelButtonProps = {
        onClick: () => setEditId && setEditId(undefined),
    };

    const editButtonProps = (id: string) => {
        return {
            onClick: () => setEditId && setEditId(id),
        };
    };

    const isEditing = (id: string) => id === editId;

    return {
        ...table,
        ...edit,
        saveButtonProps,
        cancelButtonProps,
        editButtonProps,
        isEditing,
    };
};
