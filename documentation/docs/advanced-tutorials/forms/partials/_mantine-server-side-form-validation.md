```tsx live url=http://localhost:3000/edit/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/edit/123"]);

import React from "react";
import dataProvider from "@refinedev/simple-rest";
// visible-block-start
import { Edit as MantineEdit, useForm } from "@refinedev/mantine";
import {
    Input as MantineInput,
    TextInput as MantineTextInput,
    Textarea as MantineTextarea,
} from "@mantine/core";

interface IPost {
    title: string;
    content: string;
}

const PostEdit: React.FC = () => {
    const { saveButtonProps, getInputProps, errors } = useForm<
        IPost,
        HttpError,
        IPost
    >({
        initialValues: {
            title: "",
            content: "",
        },
    });

    return (
        <MantineEdit saveButtonProps={saveButtonProps}>
            <form>
                <MantineTextInput
                    mt={8}
                    label="Title"
                    placeholder="Title"
                    {...getInputProps("title")}
                />

                <MantineTextarea
                    label="Content"
                    placeholder="Content"
                    minRows={4}
                    maxRows={4}
                    {...getInputProps("content")}
                />
            </form>
        </MantineEdit>
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

render(<RefineMantineDemo />);
```
