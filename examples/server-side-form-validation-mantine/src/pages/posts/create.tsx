import {
  Create,
  useForm,
  useSelect,
  Select,
  useMultiSelect,
  MultiSelect,
} from "@refinedev/mantine";
import { TextInput, Text } from "@mantine/core";
import MDEditor from "@uiw/react-md-editor";
import type { ITag } from "../../interfaces";

export const PostCreate: React.FC = () => {
  const { saveButtonProps, getInputProps, errors } = useForm({
    initialValues: {
      title: "",
      status: "",
      category: {
        id: "",
      },
      content: "",
    },
  });

  const { selectProps } = useSelect({
    resource: "categories",
  });

  const { selectProps: tagSelectProps } = useMultiSelect<ITag>({
    resource: "tags",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          id="title"
          mt={8}
          label="Title"
          placeholder="Title"
          {...getInputProps("title")}
        />
        <Select
          id="status"
          mt={8}
          label="Status"
          placeholder="Pick one"
          {...getInputProps("status")}
          data={[
            { label: "Published", value: "published" },
            { label: "Draft", value: "draft" },
            { label: "Rejected", value: "rejected" },
          ]}
        />
        <Select
          id="categoryId"
          mt={8}
          label="Category"
          placeholder="Pick one"
          {...getInputProps("category.id")}
          {...selectProps}
        />
        <MultiSelect
          id="tags"
          {...getInputProps("tags")}
          {...tagSelectProps}
          mt={8}
          label="Tags"
          placeholder="Pick multiple"
          defaultValue={[]}
        />
        <Text mt={8} fw={500} size="sm" color="#212529">
          Content
        </Text>
        <MDEditor
          id="content"
          data-color-mode="light"
          {...getInputProps("content")}
        />
        {errors.content && (
          <Text mt={2} fw={500} size="xs" color="red">
            {errors.content}
          </Text>
        )}
      </form>
    </Create>
  );
};
