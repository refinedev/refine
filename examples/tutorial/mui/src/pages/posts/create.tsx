import {
    Box,
    TextField,
    Autocomplete,
    useAutocomplete,
    Create,
} from "@pankod/refine-mui";
import { useForm, Controller } from "@pankod/refine-react-hook-form";

import { ICategory } from "interfaces";

export const PostCreate: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const { autocompleteProps } = useAutocomplete<ICategory>({
        resource: "categories",
    });

    return (
        <Create
            isLoading={formLoading}
            saveButtonProps={{ onClick: handleSubmit(onFinish) }}
        >
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
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
                <Controller
                    control={control}
                    name="status"
                    rules={{ required: true }}
                    defaultValue=""
                    render={({ field }) => (
                        <Autocomplete
                            {...field}
                            options={["published", "draft", "rejected"]}
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
                                    helperText={
                                        errors.status && "status required"
                                    }
                                    required
                                />
                            )}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="category"
                    rules={{ required: true }}
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
                                    helperText={
                                        errors.category && "category required"
                                    }
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
