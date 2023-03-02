import {
    Create,
    useForm,
    useSelect,
    TextInput,
    Textarea,
    Select,
} from "@pankod/refine-mantine";

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
