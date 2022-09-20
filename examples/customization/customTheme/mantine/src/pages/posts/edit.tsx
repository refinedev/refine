import {
    Edit,
    Select,
    TextInput,
    useForm,
    useSelect,
    RichTextEditor,
} from "@pankod/refine-mantine";

import { ICategory } from "../../interfaces";

export const PostEdit: React.FC = () => {
    const {
        saveButtonProps,
        getInputProps,
        refineCore: { queryResult },
    } = useForm({
        initialValues: {
            title: "",
            status: "",
            category: {
                id: "",
            },
            content: "",
        },
    });

    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
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
                <RichTextEditor mt={8} {...getInputProps("content")} />
            </form>
        </Edit>
    );
};
