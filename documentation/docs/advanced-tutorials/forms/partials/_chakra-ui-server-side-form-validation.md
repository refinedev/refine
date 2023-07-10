```tsx live url=http://localhost:3000/edit/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/edit/123"]);

import React from "react";
import dataProvider from "@refinedev/simple-rest";
// visible-block-start
import { HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Edit } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Textarea,
} from "@chakra-ui/react";

interface IPost {
    title: string;
    content: string;
}

const PostEdit: React.FC = () => {
    const {
        refineCore: { formLoading, queryResult },
        saveButtonProps,
        register,
        formState: { errors },
        setValue,
    } = useForm<IPost, HttpError, IPost>();

    return (
        <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <FormControl mb="3" isInvalid={!!errors?.title}>
                <FormLabel>Title</FormLabel>
                <Input id="title" type="text" {...register("title")} />
                <FormErrorMessage>
                    {`${errors.title?.message}`}
                </FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!errors?.content}>
                <FormLabel>Content</FormLabel>
                <Textarea id="content" {...register("content")} />
                <FormErrorMessage>
                    {`${errors.content?.message}`}
                </FormErrorMessage>
            </FormControl>
        </Edit>
    );
};
// visible-block-end

setRefineProps({
    dataProvider: {
        ...dataProvider("https://api.fake-rest.refine.dev"),
        update: async (resource: string, params: any) => {
            return Promise.reject({
                message: "Update is not supported in this example.",
                statusCode: 400,
                errors: {
                    title: ["Title is required"],
                    content: {
                        key: "form.error.content",
                        message: "Content is required.",
                    },
                },
            });
        },
    },
    resources: [
        {
            name: "posts",
            edit: PostEdit,
        },
    ],
});

render(<RefineChakraDemo />);
```
