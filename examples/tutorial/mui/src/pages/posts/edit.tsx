import { Controller, useForm } from "@pankod/refine-react-hook-form";
import {
    Edit,
    Box,
    TextField,
    Autocomplete,
    useAutocomplete,
} from "@pankod/refine-mui";

import { ICategory } from "interfaces";

export const PostEdit: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const { autocompleteProps } = useAutocomplete<ICategory>({
        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
        queryOptions: { enabled: !!queryResult?.data?.data.category.id },
    });

    return (
        <Edit
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
                    defaultValue={" "}
                />
                <Controller
                    control={control}
                    name="status"
                    rules={{ required: true }}
                    defaultValue=""
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
                                    label="status"
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
                    defaultValue=""
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
        </Edit>
    );
};
