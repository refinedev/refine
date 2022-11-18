import { Create, Field, FormLayout } from "@pankod/refine-saas-ui";
import { useSelect } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";

import { IPost } from "../../interfaces";

export const PostCreate = () => {
    const form = useForm<IPost>();

    const { options } = useSelect({
        resource: "categories",
    });

    return (
        <Create form={form}>
            <FormLayout>
                <Field
                    id="title"
                    name="title"
                    label="Title"
                    type="text"
                    rules={{ required: "Title is required" }}
                />
                <Field
                    name="status"
                    label="Status"
                    type="native-select"
                    options={[
                        {
                            value: "published",
                            label: "Published",
                        },
                        {
                            value: "draft",
                            label: "Draft",
                        },
                        {
                            value: "rejected",
                            label: "Rejected",
                        },
                    ]}
                    rules={{ required: "Status is required" }}
                />
                <Field
                    name="category.id"
                    label="Category"
                    type="native-select"
                    options={options}
                    rules={{ required: "Status is required" }}
                />
            </FormLayout>
        </Create>
    );
};
