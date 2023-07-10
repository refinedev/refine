```tsx live url=http://localhost:3000/edit/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/edit/123"]);

import React from "react";
import dataProvider from "@refinedev/simple-rest";
// visible-block-start
import React from "react";
import { HttpError, IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";

import { Form, Input } from "antd";

import { IPost, ICategory } from "../../interfaces";

const PostEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Title" name="title">
                    <Input />
                </Form.Item>
                <Form.Item label="Content" name="content">
                    <Input />
                </Form.Item>
            </Form>
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

render(<RefineAntdDemo />);
```
