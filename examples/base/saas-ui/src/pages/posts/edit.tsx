import { useEffect } from "react";
import { Edit, Field, FormLayout } from "@pankod/refine-saas-ui";
import { useSelect } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";

import { IPost } from "../../interfaces";

export const PostEdit = () => {
    const form = useForm<IPost>();

    const {
        refineCore: { queryResult },
        resetField,
    } = form;

    const { options } = useSelect({
        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
        queryOptions: { enabled: !!queryResult?.data?.data.category.id },
    });

    useEffect(() => {
        resetField("category.id");
    }, [options]);

    return (
        <Edit form={form}>
            <FormLayout>
                <Field
                    name="title"
                    label="Title"
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
        </Edit>
    );
};
