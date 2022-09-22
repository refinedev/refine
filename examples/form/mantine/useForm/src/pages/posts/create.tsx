import {
    Create,
    Select,
    TextInput,
    useForm,
    useSelect,
    RichTextEditor,
    Text,
} from "@pankod/refine-mantine";

export const PostCreate: React.FC = () => {
    const { saveButtonProps, getInputProps } = useForm({
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

    return (
        <Create saveButtonProps={saveButtonProps}>
            <form>
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
            </form>
        </Create>
    );
};
