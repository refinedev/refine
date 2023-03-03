import { IconButton } from "@chakra-ui/react";
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
        <IconButton
            aria-label="Sort"
            size="xs"
            onClick={column.getToggleSortingHandler()}
        >
            {sorted ? (
                <IconChevronDown size={18} />
            ) : (
                <IconSelector size={18} />
            )}
        </IconButton>
    );
};
