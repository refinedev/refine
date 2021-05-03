import { useTable, useForm } from "@hooks";
import { useTableProps } from "../useTable";
import { useEditFormProps } from "../../form/useEditForm";
import { BaseRecord } from "../../../interfaces";

type useEditableTableProps<T> = useTableProps & useEditFormProps<T>;

export const useEditableTable = <RecordType extends BaseRecord = BaseRecord>(
    props: useEditableTableProps<RecordType> = {},
) => {
    const table = useTable<RecordType>({ ...props });
    const edit = useForm<RecordType>({ ...props, action: "edit" });

    const { form, editId, setEditId, formLoading } = edit;

    const saveButtonProps = {
        onClick: () => form.submit(),
        disabled: formLoading,
    };

    const cancelButtonProps = {
        onClick: () => setEditId && setEditId(undefined),
    };

    const editButtonProps = (id: string | number) => {
        return {
            onClick: () => setEditId && setEditId(id),
        };
    };

    const isEditing = (id: string | number) => id === editId;

    return {
        ...table,
        ...edit,
        saveButtonProps,
        cancelButtonProps,
        editButtonProps,
        isEditing,
    };
};
