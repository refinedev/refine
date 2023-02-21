import { HttpError } from "@pankod/refine-core";
import {
    Box,
    TextField,
    Autocomplete,
    useAutocomplete,
    Create,
} from "@pankod/refine-mui";
import { useForm, Controller } from "@pankod/refine-react-hook-form";

import { IPost, ICategory } from "interfaces";

export const PostCreate: React.FC = () => {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        control,
        formState: { errors },
    } = useForm<IPost, HttpError, IPost & { category: ICategory }>();

    const { autocompleteProps } = useAutocomplete<ICategory>({
        resource: "categories",
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("title", { required: "Title is required" })}
                    error={!!errors?.title}
                    helperText={errors.title?.message}
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoFocus
                />

                <Controller
                    control={control}
                    name="category"
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                        <Autocomplete
                            {...autocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return item.title ? item.title : "";
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined || option.id === value.id
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Category"
                                    margin="normal"
                                    variant="outlined"
                                    error={!!errors.category}
                                    helperText={errors.category?.message}
                                    required
                                />
                            )}
                        />
                    )}
                />
            </Box>
        </Create>
    );
};
