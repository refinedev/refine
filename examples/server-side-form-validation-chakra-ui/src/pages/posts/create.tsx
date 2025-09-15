import { Create } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { type HttpError, useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import type { IPost } from "../../interfaces";

export const PostCreate = () => {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<IPost, HttpError, IPost>();

  const { options } = useSelect({
    resource: "categories",

    pagination: {
      mode: "server",
    },
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!errors?.title}>
        <FormLabel>Title</FormLabel>
        <Input id="title" type="text" {...register("title")} />
        <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.status}>
        <FormLabel>Status</FormLabel>
        <Select
          id="status"
          placeholder="Select Post Status"
          {...register("status")}
        >
          <option>published</option>
          <option>draft</option>
          <option>rejected</option>
        </Select>
        <FormErrorMessage>{`${errors.status?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.category?.id}>
        <FormLabel>Category</FormLabel>
        <Select
          id="categoryId"
          placeholder="Select Category"
          {...register("category.id")}
        >
          {options?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{`${errors.category?.id?.message}`}</FormErrorMessage>
      </FormControl>

      <FormControl mb="3" isInvalid={!!errors?.content}>
        <FormLabel>Content</FormLabel>
        <Textarea id="content" {...register("content")} />
        <FormErrorMessage>{`${errors.content?.message}`}</FormErrorMessage>
      </FormControl>
    </Create>
  );
};
