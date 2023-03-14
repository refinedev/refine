import { useImport, useExport, useNotification, useOne } from "@refinedev/core";

import { useDataGrid, ImportButton, List, ExportButton } from "@refinedev/mui";

import { Stack } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";

import { ICategory, IPost } from "../interfaces";

const columns: GridColumns = [
    {
        field: "id",
        headerName: "ID",
        type: "number",
    },
    { field: "title", headerName: "Title", flex: 1.5, minWidth: 350 },
    {
        field: "category.id",
        headerName: "Category",
        flex: 1,
        valueGetter: ({ row }) => {
            const { data } = useOne<ICategory>({
                resource: "categories",
                id: row.category.id,
            });
            return data?.data.title;
        },
    },
    { field: "status", headerName: "Status", flex: 1 },
];

export const ImportList: React.FC = () => {
    const { dataGridProps } = useDataGrid();

    const { open } = useNotification();

    const { inputProps, isLoading } = useImport({
        onFinish: () => {
            open?.({
                message: "Import successfully completed",
                type: "success",
            });
        },
    });

    const { triggerExport, isLoading: exportLoading } = useExport<IPost>({
        mapData: (item) => {
            return {
                title: item.title,
                content: item.content,
                status: item.status,
                categoryId: item.category.id,
            };
        },
        maxItemCount: 50,
    });

    return (
        <List
            headerProps={{
                action: (
                    <Stack direction="row">
                        <ImportButton
                            loading={isLoading}
                            inputProps={inputProps}
                        />
                        <ExportButton
                            loading={exportLoading}
                            onClick={triggerExport}
                        />
                    </Stack>
                ),
            }}
        >
            <div style={{ height: 700, width: "100%" }}>
                <DataGrid {...dataGridProps} columns={columns} />
            </div>
        </List>
    );
};
