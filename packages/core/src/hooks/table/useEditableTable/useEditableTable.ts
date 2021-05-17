import { useTable } from "@hooks";
import { useTableProps } from "../useTable";
import { useFormProps } from "../../form/useForm";
import { useTableReturnType } from "../useTable/useTable";
import { useForm } from "../../form/useForm";
import { ButtonProps } from "../../../components/antd";
import { BaseRecord } from "src/interfaces";

type useEditableTableProps<T, M> = useTableProps & useFormProps<M>;

export type useEditableTableReturnType<RecordType, MutationType> =
    useTableReturnType<RecordType> &
        useForm<RecordType, MutationType> & {
            saveButtonProps: ButtonProps & {
                onClick: () => void;
            };
            cancelButtonProps: ButtonProps & {
                onClick: () => void;
            };
            editButtonProps: (id: string | number) => ButtonProps & {
                onClick: () => void;
            };
            isEditing: (id: string | number) => boolean;
        };

export const useEditableTable = <
    RecordType extends BaseRecord = BaseRecord,
    MutationType extends BaseRecord = RecordType,
>(
    props: useEditableTableProps<RecordType, MutationType> = {},
): useEditableTableReturnType<RecordType, MutationType> => {
    const table = useTable<RecordType>({ ...props });
    const edit = useForm<RecordType, MutationType>({
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
