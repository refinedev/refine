import { BaseRecord, CrudFilters, HttpError } from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    Grid,
    Box,
    MenuItem,
    TextField,
    Card,
    CardContent,
    Button,
} from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";
import { IPost } from "interfaces";

type FormFilterValues = {
    title: string;
    status: string;
};

const columns: GridColumns = [
    {
        field: "id",
        headerName: "ID",
        type: "number",
        align: "center",
        headerAlign: "center",
    },
    { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
    { field: "status", headerName: "Status", flex: 1 },
];

export const DataGridWithForm: React.FC = () => {
    const { dataGridProps, onSearch } = useDataGrid<
        IPost,
        HttpError,
        FormFilterValues
    >({
        columns,
        initialPageSize: 10,
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { title, status } = params;

            if (title) {
                filters.push({
                    field: "title",
                    operator: "contains",
                    value: title,
                });
            }

            if (status) {
                filters.push({
                    field: "status",
                    operator: "eq",
                    value: status,
                });
            }

            return filters;
        },
    });

    const { register, handleSubmit } =
        useForm<BaseRecord, HttpError, FormFilterValues>();

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Card>
                    <CardContent>
                        <Box
                            component="form"
                            sx={{ display: "flex", flexDirection: "column" }}
                            autoComplete="off"
                            onSubmit={handleSubmit(onSearch)}
                        >
                            <TextField
                                {...register("title")}
                                margin="normal"
                                fullWidth
                                label="Title"
                                name="title"
                                autoFocus
                            />
                            <TextField
                                {...register("status")}
                                select
                                margin="normal"
                                label="Status"
                            >
                                <MenuItem value="published">Published</MenuItem>
                                <MenuItem value="draft">Draft</MenuItem>
                                <MenuItem value="rejected">Rejected</MenuItem>
                            </TextField>
                            <br />
                            <Button type="submit" variant="contained">
                                Filter
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={9}>
                <Card>
                    <CardContent sx={{ height: "700px" }}>
                        <DataGrid
                            {...dataGridProps}
                            rowsPerPageOptions={[10, 20, 50, 100]}
                            autoHeight
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};
