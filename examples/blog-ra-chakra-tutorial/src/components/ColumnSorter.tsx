import { IconButton } from "@chakra-ui/react";
import { IconChevronDown, IconSelector, IconChevronUp } from "@tabler/icons";
import { Column } from "@tanstack/react-table";

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
            {!sorted && <IconSelector size={18} />}
            {sorted === "asc" && <IconChevronDown size={18} />}
            {sorted === "desc" && <IconChevronUp size={18} />}
        </IconButton>
    );
};
