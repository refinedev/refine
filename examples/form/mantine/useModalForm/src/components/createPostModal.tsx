import { BaseRecord, HttpError } from "@pankod/refine-core";
import {
    UseModalFormReturnType,
    Modal,
    TextInput,
    RichTextEditor,
    Select,
    useSelect,
    Box,
    SaveButton,
} from "@pankod/refine-mantine";

interface FormValues {
    title: string;
    content: string;
    status: string;
    category: { id: string };
}

export const CreatePostModal: React.FC<
    UseModalFormReturnType<BaseRecord, HttpError, FormValues>
> = ({ getInputProps, modal: { visible, close }, saveButtonProps }) => {
    const { selectProps } = useSelect({
        resource: "categories",
    });

    return (
        <Modal opened={visible} onClose={close}>
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
            <RichTextEditor
                mt={8}
                sx={{ height: 300 }}
                {...getInputProps("content")}
            />
            <Box mt={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <SaveButton {...saveButtonProps} />
            </Box>
        </Modal>
    );
};
