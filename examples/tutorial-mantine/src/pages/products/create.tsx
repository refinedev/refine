import { Create, useForm, useSelect } from "@refinedev/mantine";
import { TextInput, Textarea, Select } from "@mantine/core";

export const ProductCreate = () => {
    const {
        getInputProps,
        saveButtonProps,
        setFieldValue,
        refineCore: { formLoading },
    } = useForm({
        initialValues: {
            name: "",
            material: "",
            description: "",
            price: "",
            category: { id: "" },
        },
    });

    const { selectProps: categorySelectProps } = useSelect({
        resource: "categories",

        pagination: {
            mode: "server",
        },
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <TextInput mt="sm" label="Name" {...getInputProps("name")} />
            <TextInput
                mt="sm"
                label="Material"
                {...getInputProps("material")}
            />
            <Textarea
                mt="sm"
                label="Description"
                autosize
                {...getInputProps("description")}
            />
            <TextInput mt="sm" label="Price" {...getInputProps("price")} />
            <Select
                mt="sm"
                label="Category"
                {...getInputProps("category.id")}
                {...categorySelectProps}
            />
        </Create>
    );
};
