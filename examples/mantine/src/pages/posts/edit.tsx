import {
    Button,
    Code,
    Edit,
    Group,
    Select,
    Stepper,
    TextInput,
    useStepsForm,
} from "@pankod/refine-mantine";

export const PostEdit: React.FC = () => {
    const {
        saveButtonProps,
        getInputProps,
        values,
        steps: { currentStep, gotoStep },
    } = useStepsForm({
        initialValues: {
            title: "",
            status: "",
            slug: "",
            createdAt: "",
            publishedAt: "",
            content: "",
        },
        validate: (values) => {
            if (currentStep === 0) {
                return {
                    title: values.title ? null : "Title is required",
                    status: values.status ? null : "status is required",
                };
            }

            if (currentStep === 1) {
                return {
                    slug: values.slug ? null : "slug is required",
                    createdAt: values.createdAt
                        ? null
                        : "createdAt is required",
                };
            }

            return {};
        },
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Stepper active={currentStep} breakpoint="sm">
                <Stepper.Step label="First step" description="Profile settings">
                    <TextInput
                        label="Title"
                        placeholder="Title"
                        {...getInputProps("title")}
                    />
                    <Select
                        label="Status"
                        mt="md"
                        placeholder="Pick one"
                        {...getInputProps("status")}
                        data={[
                            { label: "Published", value: "published" },
                            { label: "Draft", value: "draft" },
                            { label: "Rejected", value: "rejected" },
                        ]}
                    />
                </Stepper.Step>

                <Stepper.Step
                    label="Second step"
                    description="Personal information"
                >
                    <TextInput
                        label="slug"
                        placeholder="slug"
                        {...getInputProps("slug")}
                    />
                    <TextInput
                        mt="md"
                        label="createdAt"
                        placeholder="createdAt"
                        {...getInputProps("createdAt")}
                    />
                </Stepper.Step>

                <Stepper.Step label="Final step" description="Social media">
                    <TextInput
                        label="publishedAt"
                        placeholder="publishedAt"
                        {...getInputProps("publishedAt")}
                    />
                    <TextInput
                        mt="md"
                        label="content"
                        placeholder="content"
                        {...getInputProps("content")}
                    />
                </Stepper.Step>
                <Stepper.Completed>
                    Completed! Form values:
                    <Code block mt="xl">
                        {JSON.stringify(values, null, 2)}
                    </Code>
                </Stepper.Completed>
            </Stepper>

            <Group position="right" mt="xl">
                {currentStep !== 0 && (
                    <Button
                        variant="default"
                        onClick={() => gotoStep(currentStep - 1)}
                    >
                        Back
                    </Button>
                )}
                {currentStep !== 3 && (
                    <Button onClick={() => gotoStep(currentStep + 1)}>
                        Next step
                    </Button>
                )}
            </Group>
        </Edit>
    );
};
