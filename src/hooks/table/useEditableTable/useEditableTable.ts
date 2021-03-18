import { useTable, useEditForm } from "@hooks";
import { useTableProps } from "../useTable";
import { useEditFormProps } from "../../form/useEditForm";
import { useEffect } from "react";

type useEditableTableProps = useTableProps & useEditFormProps;

export const useEditableTable = (props: useEditableTableProps) => {
    const table = useTable({ ...props });
    const edit = useEditForm({ ...props });

    const { form, editId, setEditId, isLoading } = edit;

    const saveEditButtonProps = {
        onClick: () => form.submit(),
        disabled: isLoading,
    };

    const cancelButtonProps = {
        onClick: () => setEditId(undefined),
    };

    const editButtonProps = (id: string | number) => {
        return {
            onClick: () => setEditId(id),
        };
    };

    useEffect(() => {
        return () => {
            form.resetFields();
        };
    }, [editId]);

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
