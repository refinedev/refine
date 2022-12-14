import { BaseRecord, HttpError } from "@pankod/refine-core";
import {
    UseModalFormReturnType,
    Modal,
    TextInput,
    Select,
    useSelect,
    SaveButton,
    Box,
    Text,
} from "@pankod/refine-mantine";
import { RichTextEditor } from "@mantine/rte";

interface FormValues {
    title: string;
    content: string;
    status: string;
    category: { id: string };
}

export const EditPostModal: React.FC<
    UseModalFormReturnType<BaseRecord, HttpError, FormValues>
> = ({
    getInputProps,
    errors,
    modal: { visible, close, title },
    refineCore: { queryResult },
    saveButtonProps,
}) => {
    const { selectProps } = useSelect({
        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
    });

    return (
        <Modal opened={visible} onClose={close} title={title}>
            <TextInput
                mt={8}
                label="Title"
                placeholder="Title"
                {...getInputProps("title")}
            />
            <Select
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
                mt={8}
                label="Category"
                placeholder="Pick one"
                {...getInputProps("category.id")}
                {...selectProps}
            />
            <Text mt={8} weight={500} size="sm" color="#212529">
                Content
            </Text>
            <RichTextEditor {...getInputProps("content")} />
            {errors.content && (
                <Text mt={2} weight={500} size="xs" color="red">
                    {errors.content}
                </Text>
            )}
            <Box mt={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <SaveButton {...saveButtonProps} />
            </Box>
        </Modal>
    );
};
