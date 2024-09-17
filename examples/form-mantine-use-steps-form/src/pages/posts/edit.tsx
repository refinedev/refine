import { Edit, useStepsForm, SaveButton, Select } from "@refinedev/mantine";
import {
  Button,
  Code,
  Group,
  Stepper,
  TextInput,
  Text,
  Space,
} from "@mantine/core";
import MDEditor from "@uiw/react-md-editor";
import { DatePickerInput } from "@mantine/dates";
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
          createdAt: values.createdAt ? null : "CreatedAt is required",
        };
      }

      return {};
    },
  });

  return (
    <Edit
      footerButtons={
        <Group align="right" mt="xl">
          {currentStep !== 0 && (
            <Button variant="default" onClick={() => gotoStep(currentStep - 1)}>
              Back
            </Button>
          )}
          {currentStep !== 3 && (
            <Button onClick={() => gotoStep(currentStep + 1)}>Next step</Button>
          )}
          {currentStep === 2 && <SaveButton {...saveButtonProps} />}
        </Group>
      }
    >
      <Stepper active={currentStep} onStepClick={gotoStep}>
        <Stepper.Step
          label="First Step"
          description="Title and Slug"
          allowStepSelect={currentStep > 0}
        >
          <TextInput
            id="title"
            mt="md"
            label="Title"
            placeholder="Title"
            {...getInputProps("title")}
          />
          <TextInput
            id="slug"
            mt="md"
            label="Slug"
            placeholder="Slug"
            {...getInputProps("slug")}
          />
        </Stepper.Step>

        <Stepper.Step
          label="Second Step"
          description="Status and Date"
          allowStepSelect={currentStep > 1}
        >
          <Select
            id="status"
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

          <DatePickerInput
            id="createdAt"
            placeholder="CreatedAt"
            {...getInputProps("createdAt")}
            value={dayjs(values.createdAt).toDate()}
          />
        </Stepper.Step>

        <Stepper.Step
          label="Final Step"
          description="Content"
          allowStepSelect={currentStep > 2}
        >
          <Text mt={8} fw={500} size="sm" color="#212529">
            Content
          </Text>
          <MDEditor
            id="content"
            data-color-mode="light"
            {...getInputProps("content")}
          />
        </Stepper.Step>
        <Stepper.Completed>
          Completed! Form values:
          <Space />
          <Code mt="xl">{JSON.stringify(values, null, 2)}</Code>
        </Stepper.Completed>
      </Stepper>
    </Edit>
  );
};
