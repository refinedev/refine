import { useTable, useEditForm } from "@hooks";
import { useTableProps } from "../useTable";
import { useEditFormProps } from "../../form/useEditForm";

type useEditableTableProps = useTableProps & useEditFormProps;

export const useEditableTable = (props: useEditableTableProps) => {
    const table = useTable({ ...props });
    const edit = useEditForm({ ...props });

    const { form, editId, setEditId, formLoading } = edit;

    const saveEditButtonProps = {
        onClick: () => form.submit(),
        disabled: formLoading,
    };

    const cancelButtonProps = {
        onClick: () => setEditId(undefined),
    };

    const editButtonProps = (id: string | number) => {
        return {
            onClick: () => setEditId(id),
        };
    };

    const isEditing = (id: string | number) => id === editId;

    return {
        ...table,
        ...edit,
        saveEditButtonProps,
        cancelButtonProps,
        editButtonProps,
        isEditing,
    };
};
