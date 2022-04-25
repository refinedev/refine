import {
    BaseRecord,
    CrudFilters,
    HttpError,
    useOne,
} from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    Grid,
    Box,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Card,
    CardContent,
    SaveButton,
    Button,
} from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";
import { IPost } from "interfaces";

type FormFilterValues = {
    title: "string";
    status: "draft" | "published" | "rejected";
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
    // {
    //     field: "category.id",
    //     headerName: "Category",
    //     align: "left",
    //     headerAlign: "left",
    //     flex: 1,
    //     type: "number",
    //     valueGetter: (params) => {
    //         const { data } = useOne({
    //             resource: "categories",
    //             id: params.row.category.id,
    //         });
    //         return data?.data.title;
    //     },
    // },
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

            filters.push(
                {
                    field: "title",
                    operator: "contains",
                    value: title,
                },

                {
                    field: "status",
                    operator: "eq",
                    value: status,
                },
            );

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
                    <CardContent>
                        <DataGrid
                            {...dataGridProps}
                            rowsPerPageOptions={[10, 20, 50, 100]}
                            autoPageSize
                            autoHeight
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};
