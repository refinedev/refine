import type { BaseRecord, HttpError } from "@refinedev/core";
import {
  type UseModalFormReturnType as UseDrawerFormReturnType,
  useSelect,
  SaveButton,
  Select,
} from "@refinedev/mantine";
import { Drawer, TextInput, Box, Text } from "@mantine/core";
import MDEditor from "@uiw/react-md-editor";
import type { IPost, PostFormValues } from "../interfaces";

export const CreatePostDrawer: React.FC<{
  form: UseDrawerFormReturnType<IPost, HttpError, PostFormValues>;
}> = ({
  form: {
    getInputProps,
    errors,
    modal: { visible, close, title },
    saveButtonProps,
  },
}) => {
  const { selectProps } = useSelect({
    resource: "categories",
  });

  return (
    <Drawer
      opened={visible}
      onClose={close}
      title={title}
      padding="xl"
      size="xl"
      position="right"
    >
      <TextInput
        mt={8}
        id="title"
        label="Title"
        placeholder="Title"
        {...getInputProps("title")}
      />
      <Select
        mt={8}
        id="status"
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
        mt={8}
        id="categoryId"
        label="Category"
        placeholder="Pick one"
        {...getInputProps("category.id")}
        {...selectProps}
      />
      <Text mt={8} fw={500} size="sm" c="#212529">
        Content
      </Text>
      <MDEditor
        id="content"
        data-color-mode="light"
        {...getInputProps("content")}
      />
      {errors.content && (
        <Text mt={2} fw={500} size="xs" c="red">
          {errors.content}
        </Text>
      )}
      <Box mt={8} style={{ display: "flex", justifyContent: "flex-end" }}>
        <SaveButton {...saveButtonProps} />
      </Box>
    </Drawer>
  );
};
