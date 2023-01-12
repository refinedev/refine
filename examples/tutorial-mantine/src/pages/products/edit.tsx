import {
    Edit,
    useForm,
    useSelect,
    NumberInput,
    TextInput,
    Textarea,
    Select,
} from "@pankod/refine-mantine";

export const ProductEdit = () => {
    const {
        getInputProps,
        saveButtonProps,
        setFieldValue,
        refineCore: { queryResult },
    } = useForm({
        initialValues: {
            id: "",
            name: "",
            material: "",
            description: "",
            price: "",
            category: { id: "" },
        },
    });

    const productsData = queryResult?.data?.data;

    const { selectProps: categorySelectProps } = useSelect({
        resource: "categories",
        defaultValue: productsData?.category?.id,
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <NumberInput mt="sm" disabled label="Id" {...getInputProps("id")} />
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
        </Edit>
    );
};
