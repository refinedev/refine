import React from "react";
import { useDataGrid, List } from "@refinedev/mui";

import { FormControlLabel, Checkbox } from "@mui/material";
import { DataGrid, GridColumns, GridToolbar } from "@mui/x-data-grid";

const EmployeeList: React.FC = () => {
    const { dataGridProps, setFilters } = useDataGrid();

    const columns = React.useMemo<GridColumns>(
        () => [
            { field: "id", headerName: "ID", Width: 30 },
            {
                field: "full_name",
                headerName: "Full Name",
                minWidth: 150,
                flex: 1,
                valueGetter: (params) =>
                    `${params.row.first_name || ""} ${
                        params.row.last_name || ""
                    }`,
            },
            {
                field: "email",
                headerName: "Email",
                minWidth: 250,
            },
            {
                field: "department",
                headerName: "Department",
                minWidth: 150,
            },
            {
                field: "role",
                headerName: "Role",
                minWidth: 150,
            },
            {
                field: "level",
                headerName: "Level",
                Width: 30,
            },
        ],
        [],
    );
    const {
        filterMode,
        filterModel,
        onFilterModelChange,
        ...restDataGridProps
    } = dataGridProps;

    const handleFilter = (
        e: React.ChangeEvent<HTMLInputElement>,
        checked: boolean,
    ) => {
        setFilters([
            {
                field: "role",
                value: checked ? "Recruiter" : undefined,
                operator: "eq",
            },
        ]);
    };

    return (
        <List>
            <FormControlLabel
                label="Filter Employees with Recruiter Role"
                control={<Checkbox onChange={handleFilter} />}
            />
            <DataGrid
                {...restDataGridProps}
                filterMode={filterMode}
                filterModel={filterModel}
                onFilterModelChange={onFilterModelChange}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                autoHeight
            />
        </List>
    );
};

export default EmployeeList;
