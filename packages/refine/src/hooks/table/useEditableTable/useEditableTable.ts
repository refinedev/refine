import { useTable } from "@hooks";
import { useTableProps } from "../useTable";
import { BaseRecord, HttpError } from "../../../interfaces";
import { useFormProps, UseFormReturnType } from "../../form/useForm";
import { useTableReturnType } from "../useTable/useTable";
import { useForm } from "../../form/useForm";
import { ButtonProps } from "../../../components/antd";

export type useEditableTableReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
    TSearchVariables = unknown,
> = useTableReturnType<TData, TSearchVariables> &
    UseFormReturnType<TData, TError, TVariables> & {
        saveButtonProps: ButtonProps & {
            onClick: () => void;
        };
        cancelButtonProps: ButtonProps & {
            onClick: () => void;
        };
        editButtonProps: (id: string) => ButtonProps & {
            onClick: () => void;
        };
        isEditing: (id: string) => boolean;
    };

type useEditableTableProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
    TSearchVariables = unknown,
> = useTableProps<TData, TError, TSearchVariables> &
    useFormProps<TData, TError, TVariables>;

/**
 * `useEditeableTable` allows you to implement edit feature on the table with ease,
 * on top of all the features that {@link https://refine.dev/docs/api-references/hooks/table/useTable `useTable`} provides.
 * `useEditableTable` return properties that can be used on Ant Design's {@link https://ant.design/components/table/ `<Table>`}
 * and {@link https://ant.design/components/form/ `<Form>`} components.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/table/useEditableTable} for more details.
 */
export const useEditableTable = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
    TSearchVariables = unknown,
>(
    props: useEditableTableProps<
        TData,
        TError,
        TVariables,
        TSearchVariables
    > = {},
): useEditableTableReturnType<TData, TError, TVariables, TSearchVariables> => {
    const table = useTable<TData, TError, TSearchVariables>({ ...props });
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
