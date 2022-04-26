import { useImport, useExport } from "@pankod/refine-core";

import {
    useDataGrid,
    DataGrid,
    GridColumns,
    ImportButton,
    List,
    GridToolbarContainer,
    ExportButton,
} from "@pankod/refine-mui";

import { IPost } from "../interfaces";

const columns: GridColumns = [
    {
        field: "id",
        headerName: "ID",
        type: "number",
    },
    { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
    { field: "status", headerName: "Status", flex: 1 },
];

export const ImportList: React.FC = () => {
    const { dataGridProps } = useDataGrid({
        columns,
    });

    const { inputProps, isLoading } = useImport();

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

    const CustomToolbar: React.FC = () => {
        return (
            <GridToolbarContainer>
                <ImportButton loading={isLoading} inputProps={inputProps} />
                <ExportButton loading={exportLoading} onClick={triggerExport} />
            </GridToolbarContainer>
        );
    };

    return (
        <List>
            <div style={{ height: 700, width: "100%" }}>
                <DataGrid
                    {...dataGridProps}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                />
            </div>
        </List>
    );
};
