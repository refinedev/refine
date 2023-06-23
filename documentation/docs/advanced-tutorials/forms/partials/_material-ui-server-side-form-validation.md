```tsx live url=http://localhost:3000/edit/123 previewHeight=520px hideCode
setInitialRoutes(["/posts/edit/123"]);

import React from "react";
import dataProvider from "@refinedev/simple-rest";
// visible-block-start
import { Edit } from "@refinedev/mui";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "@refinedev/react-hook-form";

interface IPost {
    title: string;
    content: string;
}

const PostEdit: React.FC = () => {
    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        control,
        formState: { errors },
    } = useForm<IPost, HttpError, Nullable<IPost>>();

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    id="title"
                    {...register("title")}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    margin="normal"
                    fullWidth
                    label="Title"
                    name="title"
                    autoFocus
                />

                <TextField
                    id="content"
                    {...register("content")}
                    error={!!errors.content}
                    helperText={errors.content?.message}
                    margin="normal"
                    label="Content"
                    multiline
                    rows={4}
                />
            </Box>
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

render(<RefineMuiDemo />);
```
