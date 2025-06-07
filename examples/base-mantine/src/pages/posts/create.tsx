import { Create, useForm, useSelect, useMultiSelect } from "@refinedev/mantine";
import { TextInput, Text, Select, MultiSelect } from "@mantine/core";
import MDEditor from "@uiw/react-md-editor";
import type { IPost, ITag } from "../../interfaces";
import type { HttpError } from "@refinedev/core";

type IPostVariables = {
  title: string;
  status: string;
  category: {
    id: string;
  };
  content: string;
};

export const PostCreate: React.FC = () => {
  const { saveButtonProps, getInputProps, errors } = useForm<
    IPost,
    HttpError,
    IPostVariables
  >({
    initialValues: {
      title: "",
      status: "",
      category: {
        id: "",
      },
      content: "",
    },
    validate: {
      title: (value) => (value.length < 2 ? "Too short title" : null),
      status: (value) => (value.length <= 0 ? "Status is required" : null),
      category: {
        id: (value) => (value.length <= 0 ? "Category is required" : null),
      },
      content: (value) => (value.length < 10 ? "Too short content" : null),
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
