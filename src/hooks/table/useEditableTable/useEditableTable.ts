import {useTable, useEditForm} from "@hooks"

export const useEditableTable = (props: any) => {
    const table = useTable({...props})
    const edit = useEditForm({...props})

    const {form, editId, setEditId} = edit

    const saveButtonProps = {
        onClick: () => form.submit()
    }

    const cancelButtonProps = {
        onClick: () => setEditId(undefined)
    }

    const editButtonProps = (id: string | number) => {
        return {
            onClick: () => setEditId(id)
        }
    }

    const isEditing = (id: string | number) => id === editId

    return {
        ...table,
        ...edit,
        saveButtonProps,
        cancelButtonProps,
        editButtonProps,
        isEditing,
    }
}