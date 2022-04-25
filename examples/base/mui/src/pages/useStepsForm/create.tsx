import {
    Create,
    Box,
    TextField,
    MenuItem,
    Step,
    Stepper,
    Button,
    SaveButton,
    StepButton,
} from "@pankod/refine-mui";
import { useStepsForm } from "@pankod/refine-react-hook-form";

const stepTitles = [
    "Create an post title",
    "Select an post status",
    "Create an content",
];

export const UseStepsFormCreate: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        formState: { errors },
        steps: { currentStep, gotoStep },
    } = useStepsForm({
        stepsProps: {
            isBackValidate: false,
        },
    });

    const required = {
        value: true,
        message: "This field is required",
    };

    const renderStep = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <TextField
                        {...register("title", { required })}
                        error={!!errors?.title}
                        helperText={errors?.title?.message}
                        margin="normal"
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                    />
                );
            case 1:
                return (
                    <TextField
                        select
                        label="Select"
                        {...register("status", { required })}
                        helperText={errors?.status?.message}
                        defaultValue="draft"
                    >
                        <MenuItem value="published">Published</MenuItem>
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                    </TextField>
                );
            case 2:
                return (
                    <>
                        <TextField
                            {...register("slug", { required })}
                            error={!!errors?.slug}
                            helperText={errors?.slug?.message}
                            margin="normal"
                            fullWidth
                            id="slug"
                            label="slug"
                            name="slug"
                        />
                        <TextField
                            {...register("content", { required })}
                            error={!!errors?.content}
                            helperText={errors?.content?.message}
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
        <Create
            isLoading={formLoading}
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
                <Stepper nonLinear activeStep={currentStep}>
                    {stepTitles.map((label, index) => (
                        <Step key={label}>
                            <StepButton onClick={() => gotoStep(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <br />
                {renderStep(currentStep)}
            </Box>
        </Create>
    );
};
