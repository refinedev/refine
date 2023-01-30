import React from "react";
import {
    Edit,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Select,
} from "@pankod/refine-chakra-ui";
import { useForm } from "@pankod/refine-react-hook-form";
import { useSelect } from "@pankod/refine-core";

export const ProductEdit = () => {
    const {
        refineCore: { formLoading, queryResult },
        saveButtonProps,
        register,
        resetField,
        formState: { errors },
    } = useForm();

    const productsData = queryResult?.data?.data;

    const { options: categoryOptions } = useSelect({
        resource: "categories",
        defaultValue: productsData?.category?.id,
    });

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
            <FormControl mb="3" isInvalid={!!(errors as any)?.name}>
                <FormLabel>Name</FormLabel>
                <Input
                    type="text"
                    {...register("name", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.name?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!(errors as any)?.material}>
                <FormLabel>Material</FormLabel>
                <Input
                    type="text"
                    {...register("material", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.material?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!(errors as any)?.description}>
                <FormLabel>Description</FormLabel>
                <Input
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.description?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!(errors as any)?.price}>
                <FormLabel>Price</FormLabel>
                <Input
                    type="text"
                    {...register("price", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.price?.message as string}
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
        </Edit>
    );
};
