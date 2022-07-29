import {
    Edit,
    Box,
    TextField,
    Autocomplete,
    useAutocomplete,
    Button,
    SaveButton,
    Step,
    StepButton,
    Stepper,
    useMediaQuery,
    useTheme,
} from "@pankod/refine-mui";
import { Controller, useStepsForm } from "@pankod/refine-react-hook-form";

import { ICategory } from "interfaces";

const stepTitles = [
    "Edit Title",
    "Edit status and category",
    "Edit slug and content",
];

export const PostEdit: React.FC = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading, queryResult, onFinish },
        register,
        handleSubmit,
        control,
        formState: { errors },
        steps: { currentStep, gotoStep },
    } = useStepsForm();

    const theme = useTheme();
    const isSmallOrLess = useMediaQuery(theme.breakpoints.down("sm"));

    const { autocompleteProps } = useAutocomplete<ICategory>({
        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
    });

    const renderFormByStep = (step: number) => {
        switch (step) {
            case 0:
                return (
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
                );
            case 1:
                return (
                    <>
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
                                        option.id.toString() ===
                                            value.toString()
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Category"
                                            margin="normal"
                                            variant="outlined"
                                            error={!!errors.category}
                                            helperText={
                                                errors.category?.message
                                            }
                                            required
                                        />
                                    )}
                                />
                            )}
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <TextField
                            {...register("slug", {
                                required: "This field is required",
                            })}
                            error={!!errors.slug}
                            helperText={errors.slug?.message}
                            margin="normal"
                            fullWidth
                            label="Slug"
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
                    </>
                );
        }
    };

    return (
        <Edit
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            actionButtons={
                <>
                    {currentStep > 0 && (
                        <Button
                            onClick={() => {
                                gotoStep(currentStep - 1);
                            }}
                        >
                            Previous
                        </Button>
                    )}
                    {currentStep < stepTitles.length - 1 && (
                        <Button
                            onClick={() => {
                                gotoStep(currentStep + 1);
                            }}
                        >
                            Next
                        </Button>
                    )}
                    {currentStep === stepTitles.length - 1 && (
                        <SaveButton onClick={handleSubmit(onFinish)} />
                    )}
                </>
            }
        >
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <Stepper
                    nonLinear
                    activeStep={currentStep}
                    orientation={isSmallOrLess ? "vertical" : "horizontal"}
                >
                    {stepTitles.map((label, index) => (
                        <Step key={label}>
                            <StepButton onClick={() => gotoStep(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <br />
                {renderFormByStep(currentStep)}
            </Box>
        </Edit>
    );
};
