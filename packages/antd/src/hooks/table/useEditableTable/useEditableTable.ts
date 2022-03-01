import { useTable } from "@hooks";
import { BaseRecord, HttpError, UseFormProps } from "@pankod/refine-core";

import { ButtonProps } from "../../../components/antd";
import { useTableProps, useTableReturnType } from "../useTable";
import { UseFormReturnType, useForm } from "../../form/useForm";

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
    UseFormProps<TData, TError, TVariables>;

/**
 * `useEditeableTable` allows you to implement edit feature on the table with ease,
 * on top of all the features that {@link https://refine.dev/docs/api-references/hooks/table/useTable `useTable`} provides.
 * `useEditableTable` return properties that can be used on Ant Design's {@link https://ant.design/components/table/ `<Table>`}
 * and {@link https://ant.design/components/form/ `<Form>`} components.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/hooks/table/useEditableTable} for more details.
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

    const { id: editId, setId, saveButtonProps } = edit;

    const cancelButtonProps = {
        onClick: () => {
            setId(undefined);
        },
    };

    const editButtonProps = (id: string) => {
        return {
            onClick: () => setId(id),
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
