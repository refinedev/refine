import { Controller, useForm } from "@pankod/refine-react-hook-form";
import {
    Edit,
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
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
                <Controller
                    control={control}
                    name="category"
                    rules={{ required: true }}
                    defaultValue={
                        autocompleteProps.options.find(
                            (p) => p.id === queryResult?.data?.data.category.id,
                        ) ?? null
                    }
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
                                    label="items"
                                    margin="normal"
                                    variant="outlined"
                                    error={!!errors.item}
                                    helperText={errors.item && "item required"}
                                    required
                                />
                            )}
                        />
                    )}
                />
                <TextField
                    {...register("content", { required: true })}
                    error={!!errors?.content}
                    helperText={errors?.content?.message}
                    margin="normal"
                    label="Content"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                />
            </Box>
        </Edit>
    );
};
