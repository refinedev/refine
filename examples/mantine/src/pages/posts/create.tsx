import { Create, Select, TextInput, useForm } from "@pankod/refine-mantine";

export const PostCreate: React.FC = () => {
    const { saveButtonProps, getInputProps } = useForm();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <form>
                <TextInput label="Title" {...getInputProps("title")} />
                <Select
                    label="Status"
                    placeholder="Pick one"
                    {...getInputProps("status")}
                    data={[
                        { label: "Published", value: "published" },
                        { label: "Draft", value: "draft" },
                        { label: "Rejected", value: "rejected" },
                    ]}
                />
            </form>
        </Create>
    );
};
