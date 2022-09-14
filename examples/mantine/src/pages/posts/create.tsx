import {
    Create,
    Edit,
    Select,
    TextInput,
    useForm,
    useSelect,
} from "@pankod/refine-mantine";

export const PostCreate: React.FC = () => {
    const { saveButtonProps, getInputProps, values } = useForm({
        refineCoreProps: {
            action: "edit",
        },
        initialValues: {
            title: "",
            status: "rejected",
            category: {
                id: 49,
            },
        },
    });

    console.log("values", values);

    const { selectProps } = useSelect({
        resource: "categories",
        defaultValue: 1,
    });
    console.log("selectProps", selectProps);

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <form>
                <TextInput mt={4} label="Title" {...getInputProps("title")} />
                <Select
                    mt={4}
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
                    mt={4}
                    label="Categories"
                    placeholder="Pick one"
                    // {...selectProps}
                    data={[
                        { label: "Published", value: 1 },
                        { label: "Draft", value: 2 },
                        { label: "Rejected", value: 49 },
                    ]}
                    {...getInputProps("category.id")}
                />
            </form>
        </Edit>
    );
};
