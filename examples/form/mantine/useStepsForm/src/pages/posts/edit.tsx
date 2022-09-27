import {
    Button,
    Code,
    Edit,
    Group,
    Select,
    Stepper,
    TextInput,
    useStepsForm,
    DatePicker,
    RichTextEditor,
    SaveButton,
    Text,
} from "@pankod/refine-mantine";
import dayjs from "dayjs";

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
            createdAt: new Date(),
            content: "",
        },
        validate: (values) => {
            if (currentStep === 0) {
                return {
                    title: values.title ? null : "Title is required",
                    status: values.status ? null : "Status is required",
                };
            }

            if (currentStep === 1) {
                return {
                    slug: values.slug ? null : "Slug is required",
                    createdAt: values.createdAt
                        ? null
                        : "CreatedAt is required",
                };
            }

            return {};
        },
    });

    return (
        <Edit
            footerButtons={
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
                    {currentStep === 2 && <SaveButton {...saveButtonProps} />}
                </Group>
            }
        >
            <Stepper active={currentStep} breakpoint="sm">
                <Stepper.Step label="First Step">
                    <TextInput
                        mt="md"
                        label="Title"
                        placeholder="Title"
                        {...getInputProps("title")}
                    />
                    <TextInput
                        mt="md"
                        label="Slug"
                        placeholder="Slug"
                        {...getInputProps("slug")}
                    />
                </Stepper.Step>

                <Stepper.Step label="Second Step">
                    <Select
                        mt="md"
                        label="Status"
                        placeholder="Pick one"
                        {...getInputProps("status")}
                        data={[
                            { label: "Published", value: "published" },
                            { label: "Draft", value: "draft" },
                            { label: "Rejected", value: "rejected" },
                        ]}
                    />

                    <DatePicker
                        mt="md"
                        label="CreatedAt"
                        placeholder="CreatedAt"
                        {...getInputProps("createdAt")}
                        value={dayjs(values.createdAt).toDate()}
                    />
                </Stepper.Step>

                <Stepper.Step label="Final Step">
                    <Text mt={8} weight={500} size="sm" color="#212529">
                        Content
                    </Text>
                    <RichTextEditor {...getInputProps("content")} />
                </Stepper.Step>
                <Stepper.Completed>
                    Completed! Form values:
                    <Code block mt="xl">
                        {JSON.stringify(values, null, 2)}
                    </Code>
                </Stepper.Completed>
            </Stepper>
        </Edit>
    );
};
