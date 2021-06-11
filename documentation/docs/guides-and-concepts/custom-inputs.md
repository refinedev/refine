---
id: custom-inputs
title: Custom Inputs
---

import markdownInput from '@site/static/img/guides-and-concepts/custom-inputs/markdown-input.png';


You can use custom components in table columns and form fields for working with custom data. For some data types, displaying and editing as plain text may cause user experience problems. Examples where custom component usage may be useful include: markdown (with markdown editor), json based rich text (draft, quill like editors), html (a wysiwyg html editor).

refine uses Ant Design's [`<Form>`](https://ant.design/components/form/) components to control and work with form data. Ant Design supports custom form items inside [`<Form.Item>`](https://ant.design/components/form/#Form.Item) components. These items should be controllable via their `value` prop and should implement `onChange` (or a custom callback name specified by `<Form.Item>`s [`trigger` prop](https://ant.design/components/form/#Form.Item)).

[Refer to Ant Design docs for more detailed information about `<Form>`. &#8594](https://ant.design/components/form/)

## Example

In this example we'll demonstrate how to use custom input fields for markdown data by adding a markdown editor to edit and create forms.

```tsx
import React, { useState } from "react";
import {
    Edit,
    Form,
    Input,
    IResourceComponentsProps,
    Select,
    useForm,
    useSelect,
} from "@pankod/refine";

//highlight-start
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
//highlight-end

//highlight-next-line
import "react-mde/lib/styles/css/react-mde-all.css";


import { IPost, ICategory } from "interfaces";

export const PostEdit: React.FC<IResourceComponentsProps> = (props) => {
    const { formProps, saveButtonProps, queryResult } = useForm<IPost>();

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: postData?.category.id,
    });

    //highlight-start
    const [selectedTab, setSelectedTab] = useState<"write" | "preview">(
        "write",
    );
    //highlight-end

    return (
        <Edit {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name={["category", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...categorySelectProps} />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        options={[
                            {
                                label: "Published",
                                value: "published",
                            },
                            {
                                label: "Draft",
                                value: "draft",
                            },
                            {
                                label: "Rejected",
                                value: "rejected",
                            },
                        ]}
                    />
                </Form.Item>
                //highlight-start
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <ReactMde
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                        generateMarkdownPreview={(markdown) =>
                            Promise.resolve(
                                <ReactMarkdown>{markdown}</ReactMarkdown>,
                            )
                        }
                    />
                </Form.Item>
                //highlight-end
            </Form>
        </Edit>
    );
};
```

<div style={{textAlign: "center"}}>
    <img src={markdownInput} />
</div>
<br/>