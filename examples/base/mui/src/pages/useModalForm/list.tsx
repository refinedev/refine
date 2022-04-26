import React from "react";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    GridToolbar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    List,
    EditButton,
} from "@pankod/refine-mui";
import { useModalForm } from "@pankod/refine-react-hook-form";

import { IPost } from "interfaces";

export const UseModalFormList: React.FC = () => {
    const {
        modal: { visible, close, show, title, saveButtonProps },
        register,
        formState: { errors },
    } = useModalForm<IPost>({
        refineCoreProps: { action: "create" },
    });

    const {
        modal: {
            visible: visibleEdit,
            close: closeEdit,
            show: showEdit,
            title: titleEdit,
            saveButtonProps: saveButtonPropsEdit,
        },
        register: registerEdit,
        formState: { errors: errorsEdit },
    } = useModalForm<IPost>({
        refineCoreProps: {
            action: "edit",
            mutationMode: "pessimistic",
        },
    });

    const columns: GridColumns = React.useMemo(
        () => [
            {
                field: "id",
                headerName: "ID",
                type: "number",
            },
            { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
            { field: "status", headerName: "Status", flex: 1 },
            {
                field: "actions",
                headerName: "Actions",
                width: 150,
                // eslint-disable-next-line react/display-name
                renderCell: (params) => (
                    <EditButton onClick={() => showEdit(params.id)} />
                ),
            },
        ],
        [],
    );

    const { dataGridProps } = useDataGrid({
        columns,
    });

    return (
        <List canCreate createButtonProps={{ onClick: () => show() }}>
            <Box sx={{ height: 700, width: "100%" }}>
                <DataGrid
                    {...dataGridProps}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </Box>
            <Dialog open={visible} onClose={close}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <TextField
                        {...register("title", { required: true })}
                        error={!!errors?.title}
                        helperText={errors?.title?.message}
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoFocus
                    />
                    <FormControl
                        margin="normal"
                        required
                        fullWidth
                        error={!!errors?.status}
                    >
                        <InputLabel id="status">Age</InputLabel>
                        <Select
                            {...register("status")}
                            labelId="status"
                            label="Status"
                            defaultValue="published"
                        >
                            <MenuItem value="published">Published</MenuItem>
                            <MenuItem value="draft">Draft</MenuItem>
                            <MenuItem value="rejected">Rejected</MenuItem>
                        </Select>
                        {errors?.status && (
                            <FormHelperText>
                                {errors?.status?.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <TextField
                        {...register("content", { required: true })}
                        error={!!errors?.content}
                        helperText={errors?.content?.message}
                        margin="normal"
                        label="Content"
                        required
                        multiline
                        rows={4}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={close}>Cancel</Button>
                    <Button {...saveButtonProps}>Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={visibleEdit} onClose={closeEdit}>
                <DialogTitle>{titleEdit}</DialogTitle>
                <DialogContent>
                    <TextField
                        {...registerEdit("title", { required: true })}
                        error={!!errorsEdit?.title}
                        helperText={errorsEdit?.title?.message}
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoFocus
                    />
                    <FormControl
                        margin="normal"
                        required
                        fullWidth
                        error={!!errorsEdit?.status}
                    >
                        <InputLabel id="status">Age</InputLabel>
                        <Select
                            {...registerEdit("status")}
                            labelId="status"
                            label="Status"
                            defaultValue="published"
                        >
                            <MenuItem value="published">Published</MenuItem>
                            <MenuItem value="draft">Draft</MenuItem>
                            <MenuItem value="rejected">Rejected</MenuItem>
                        </Select>
                        {errorsEdit?.status && (
                            <FormHelperText>
                                {errorsEdit?.status?.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <TextField
                        {...registerEdit("content", { required: true })}
                        error={!!errorsEdit?.content}
                        helperText={errorsEdit?.content?.message}
                        margin="normal"
                        label="Content"
                        required
                        multiline
                        rows={4}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeEdit}>Cancel</Button>
                    <Button {...saveButtonPropsEdit}>Save</Button>
                </DialogActions>
            </Dialog>
        </List>
    );
};
