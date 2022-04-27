import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
    useAutocomplete,
    FormHelperText,
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
                    required
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                />
            </Box>
        </Create>
    );
};
