import {
    Create,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Select,
} from "@pankod/refine-chakra-ui";
import { useForm } from "@pankod/refine-react-hook-form";
import { useSelect } from "@pankod/refine-core";

export const ProductCreate = () => {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm();

    const { options: categoryOptions } = useSelect({
        resource: "categories",
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
        </Create>
    );
};
