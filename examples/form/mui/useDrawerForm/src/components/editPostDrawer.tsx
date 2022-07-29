import {
    Autocomplete,
    Box,
    Drawer,
    Edit,
    IconButton,
    TextField,
    useAutocomplete,
} from "@pankod/refine-mui";
import {
    Controller,
    UseModalFormReturnType,
} from "@pankod/refine-react-hook-form";
import { CloseOutlined } from "@mui/icons-material";

import { ICategory } from "interfaces";

export const EditPostDrawer: React.FC<UseModalFormReturnType> = ({
    saveButtonProps,
    refineCore: { queryResult },
    modal: { visible, close },
    register,
    control,
    formState: { errors },
}) => {
    const { autocompleteProps } = useAutocomplete<ICategory>({
        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
    });

    return (
        <Drawer
            open={visible}
            onClose={close}
            anchor="right"
            PaperProps={{ sx: { width: { sm: "100%", md: 500 } } }}
        >
            <Edit
                saveButtonProps={saveButtonProps}
                cardHeaderProps={{
                    action: (
                        <IconButton
                            onClick={() => close()}
                            sx={{ width: "30px", height: "30px" }}
                        >
                            <CloseOutlined />
                        </IconButton>
                    ),
                    avatar: null,
                }}
            >
                <Box
                    component="form"
                    autoComplete="off"
                    sx={{ display: "flex", flexDirection: "column" }}
                >
                    <TextField
                        {...register("title", {
                            required: "This field is required",
                        })}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        margin="normal"
                        fullWidth
                        label="Title"
                        name="title"
                        autoFocus
                    />
                    <Controller
                        control={control}
                        name="status"
                        rules={{ required: "This field is required" }}
                        defaultValue={null as any}
                        render={({ field }) => (
                            <Autocomplete
                                options={["published", "draft", "rejected"]}
                                {...field}
                                onChange={(_, value) => {
                                    field.onChange(value);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Status"
                                        margin="normal"
                                        variant="outlined"
                                        error={!!errors.status}
                                        helperText={errors.status?.message}
                                        required
                                    />
                                )}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="category"
                        rules={{ required: "This field is required" }}
                        defaultValue={null as any}
                        render={({ field }) => (
                            <Autocomplete
                                {...autocompleteProps}
                                {...field}
                                onChange={(_, value) => {
                                    field.onChange(value);
                                }}
                                getOptionLabel={(item) => {
                                    return (
                                        autocompleteProps?.options?.find(
                                            (p) =>
                                                p?.id?.toString() ===
                                                item?.id?.toString(),
                                        )?.title ?? ""
                                    );
                                }}
                                isOptionEqualToValue={(option, value) =>
                                    value === undefined ||
                                    option.id.toString() === value.toString()
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Category"
                                        margin="normal"
                                        variant="outlined"
                                        error={!!errors.category}
                                        helperText={errors.category?.message}
                                    />
                                )}
                            />
                        )}
                    />
                    <TextField
                        {...register("content", {
                            required: "This field is required",
                        })}
                        error={!!errors.content}
                        helperText={errors.content?.message}
                        margin="normal"
                        label="Content"
                        multiline
                        rows={4}
                    />
                </Box>
            </Edit>
        </Drawer>
    );
};
