import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Select,
    Edit,
} from "@pankod/refine-chakra-ui";
import { useSelect } from "@pankod/refine-core";
import { UseModalFormReturnType } from "@pankod/refine-react-hook-form";

import { ICategory } from "../../interfaces";

export const EditPostDrawer: React.FC<UseModalFormReturnType> = ({
    saveButtonProps,
    modal: { visible, close },
    register,
    formState: { errors },
}) => {
    const { options } = useSelect<ICategory>({
        resource: "categories",
        pagination: {
            pageSize: 9999,
        },
    });

    return (
        <Drawer size="md" isOpen={visible} onClose={close}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Edit Post</DrawerHeader>

                <DrawerBody>
                    <Edit
                        headerButtons={false}
                        title={false}
                        goBack={null}
                        saveButtonProps={saveButtonProps}
                    >
                        <FormControl mb="3" isInvalid={!!errors?.title}>
                            <FormLabel>Title</FormLabel>
                            <Input
                                id="title"
                                type="text"
                                {...register("title", {
                                    required: "Title is required",
                                })}
                            />
                            <FormErrorMessage>
                                {`${errors.title?.message}`}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl mb="3" isInvalid={!!errors?.status}>
                            <FormLabel>Status</FormLabel>
                            <Select
                                id="content"
                                placeholder="Select Post Status"
                                {...register("status", {
                                    required: "Status is required",
                                })}
                            >
                                <option>published</option>
                                <option>draft</option>
                                <option>rejected</option>
                            </Select>
                            <FormErrorMessage>
                                {`${errors.status?.message}`}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl mb="3" isInvalid={!!errors?.categoryId}>
                            <FormLabel>Category</FormLabel>
                            <Select
                                id="category.id"
                                placeholder="Select Category"
                                {...register("category.id", {
                                    required: "Category is required",
                                })}
                            >
                                {options?.map((option) => (
                                    <option
                                        value={option.value}
                                        key={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </Select>
                            <FormErrorMessage>
                                {`${errors.categoryId?.message}`}
                            </FormErrorMessage>
                        </FormControl>
                    </Edit>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};
