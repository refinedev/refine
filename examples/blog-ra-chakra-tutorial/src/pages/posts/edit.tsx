import React from "react";
import { Edit } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Select,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import { useSelect } from "@refinedev/core";

export const PostEdit = () => {
    const {
        refineCore: { formLoading, queryResult },
        saveButtonProps,
        register,
        resetField,
        formState: { errors },
    } = useForm({
        refineCoreProps: {
            metaData: {
                populate: ["category"],
            },
        },
    });

    const postsData = queryResult?.data?.data;

    const { options: categoryOptions } = useSelect({
        resource: "categories",
        defaultValue: postsData?.category?.id,
    });

    console.log(categoryOptions);

    React.useEffect(() => {
        resetField("category.id");
    }, [categoryOptions]);

    return (
        <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <FormControl mb="3" isInvalid={!!(errors as any)?.id}>
                <FormLabel>Id</FormLabel>
                <Input
                    disabled
                    type="number"
                    {...register("id", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.id?.message as string}
                </FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!(errors as any)?.title}>
                <FormLabel>Title</FormLabel>
                <Input
                    type="text"
                    {...register("title", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.title?.message as string}
                </FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!(errors as any)?.content}>
                <FormLabel>Content</FormLabel>
                <Input
                    type="text"
                    {...register("content", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.content?.message as string}
                </FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!errors?.category}>
                <FormLabel>Category</FormLabel>
                <Select
                    placeholder="Select category"
                    {...register("category.id", {
                        required: "This field is required",
                    })}
                >
                    {categoryOptions?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>
                    {(errors as any)?.category?.id?.message as string}
                </FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!(errors as any)?.createdAt}>
                <FormLabel>Created At</FormLabel>
                <Input
                    disabled
                    {...register("createdAt", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.createdAt?.message as string}
                </FormErrorMessage>
            </FormControl>
        </Edit>
    );
};
