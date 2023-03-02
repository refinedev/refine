import { ActionIcon } from "@pankod/refine-mantine";
import { IconChevronDown, IconSelector } from "@tabler/icons";
import type { Column } from "@pankod/refine-react-table";

export const ColumnSorter: React.FC<{ column: Column<any, any> }> = ({
    column,
}) => {
    if (!column.getCanSort()) {
        return null;
    }

    const sorted = column.getIsSorted();

    return (
        <ActionIcon size="xs" onClick={column.getToggleSortingHandler()}>
            {sorted ? (
                <IconChevronDown size={18} />
            ) : (
                <IconSelector size={18} />
            )}
        </ActionIcon>
    );
};
