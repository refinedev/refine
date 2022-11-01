import { useEffect } from "react";
import {
    Edit,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
} from "@pankod/refine-saas-ui";
import { useSelect } from "@pankod/refine-core";
import { Controller, useForm } from "@pankod/refine-react-hook-form";

import { IPost } from "../../interfaces";

export const PostEdit = () => {
    const {
        refineCore: { formLoading, queryResult },
        saveButtonProps,
        register,
        control,
        formState: { errors },
        resetField,
    } = useForm<IPost>();

    const { options } = useSelect({
        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
        queryOptions: { enabled: !!queryResult?.data?.data.category.id },
    });

    useEffect(() => {
        resetField("category.id");
    }, [options]);

    return (
        <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <FormControl mb="3" isInvalid={!!errors?.title}>
                <FormLabel>Title</FormLabel>
                <Input
                    id="title"
                    type="text"
                    {...register("title", { required: "Title is required" })}
                />
                <FormErrorMessage>
                    {`${errors.title?.message}`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.status}>
                <FormLabel>Status</FormLabel>
                <Controller
                    name="status"
                    rules={{ required: "Status is required" }}
                    control={control}
                    render={(field) => (
                        <Select
                            placeholder="Select Post Status"
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
                            {...field}
                        />
                    )}
                />
                <FormErrorMessage>
                    {`${errors.status?.message}`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.categoryId}>
                <FormLabel>Category</FormLabel>
                <Controller
                    name="category.id"
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                        <Select
                            placeholder="Select Category"
                            options={options}
                            {...field}
                        />
                    )}
                />

                <FormErrorMessage>
                    {`${errors.categoryId?.message}`}
                </FormErrorMessage>
            </FormControl>
        </Edit>
    );
};
