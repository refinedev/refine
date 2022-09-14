import {
    Create,
    Select,
    TextInput,
    useForm,
    useSelect,
    RichTextEditor,
} from "@pankod/refine-mantine";

export const PostCreate: React.FC = () => {
    const { saveButtonProps, getInputProps } = useForm({
        refineCoreProps: {
            action: "edit",
        },
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
        defaultValue: 1,
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
                <RichTextEditor
                    mt={8}
                    placeholder="Pick one"
                    {...getInputProps("content")}
                />
            </form>
        </Create>
    );
};
