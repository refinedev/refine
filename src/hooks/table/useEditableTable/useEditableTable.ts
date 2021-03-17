import {useTable, useEditForm} from "@hooks"

export const useEditableTable = (props: any) => {
    const table = useTable({...props})
    const edit = useEditForm({...props})

    return {
        ...table,
        ...edit
    }
}