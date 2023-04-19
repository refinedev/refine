---
id: strapi-v4
title: Strapi-v4
sidebar_label: Strapi-v4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**refine** supports the features that come with [Strapi-v4](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html).

A few of the Strapi-v4 API features are as follows:

-   Fields Selection
-   Relations Population
-   Publication State
-   Locale

`meta` allows us to use the above features in hooks. Thus, we can fetch the data according to the parameters we want.

Hooks and components that support `meta`:

| Supported data hooks                                                         | Supported other hooks                                                              | Supported components                                                                 |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [`useUpdate` &#8594](/docs/api-reference/core/hooks/data/useUpdate/)         | [`useForm` &#8594](/docs/api-reference/core/hooks/useForm)                         | [`DeleteButton` &#8594](/docs/api-reference/antd/components/buttons/delete-button)   |
| [`useUpdateMany` &#8594](/docs/api-reference/core/hooks/data/useUpdateMany/) | [`useModalForm` &#8594](/docs/api-reference/antd/hooks/form/useModalForm)          | [`RefreshButton` &#8594](/docs/api-reference/antd/components/buttons/refresh-button) |
| [`useDelete` &#8594](/docs/api-reference/core/hooks/data/useDelete/)         | [`useDrawerForm` &#8594](/docs/api-reference/antd/hooks/form/useDrawerForm)        |                                                                                      |
| [`useDeleteMany` &#8594](/docs/api-reference/core/hooks/data/useDeleteMany/) | [`useStepsForm` &#8594](/docs/api-reference/antd/hooks/form/useStepsForm)          |                                                                                      |
| [`useCreate` &#8594](/docs/api-reference/core/hooks/data/useCreate/)         | [`useTable` &#8594](/docs/api-reference/core/hooks/useTable)                       |                                                                                      |
| [`useCreateMany` &#8594](/docs/api-reference/core/hooks/data/useCreateMany/) | [`useEditableTable` &#8594](/docs/api-reference/antd/hooks/table/useEditableTable) |                                                                                      |
| [`useList` &#8594](/docs/api-reference/core/hooks/data/useList/)             | [`useSimpleList` &#8594](/docs/api-reference/antd/hooks/list/useSimpleList)        |                                                                                      |
| [`useOne` &#8594](/docs/api-reference/core/hooks/data/useOne/)               | [`useShow` &#8594](/docs/api-reference/core/hooks/show/useShow)                    |                                                                                      |
| [`useMany` &#8594](/docs/api-reference/core/hooks/data/useMany/)             | [`useExport` &#8594](/docs/api-reference/core/hooks/import-export/useExport)       |                                                                                      |
| [`useCustom` &#8594](/docs/api-reference/core/hooks/data/useCustom/)         | [`useCheckboxGroup` &#8594](/docs/api-reference/antd/hooks/field/useCheckboxGroup) |                                                                                      |
|                                                                              | [`useSelect` &#8594](/docs/api-reference/core/hooks/useSelect/)                    |                                                                                      |
|                                                                              | [`useRadioGroup` &#8594](/docs/api-reference/antd/hooks/field/useRadioGroup)       |                                                                                      |

:::note
There is no need to use `meta` for sorting, pagination, and, filters. Sorting, pagination, and, filters will be handled automatically by the strapi-v4 dataProvider.
:::

:::info
Normally, strapi-v4 backend returns data in the following format:

```json
{
    "id": 1,
    "attributes": {
        "title": "My title",
        "content": "Long content...",
}
```

However, we can use [normalizeData](https://github.com/refinedev/refine/blob/27a55320ada61a0624ed2f5b29331946334f7727/packages/strapi-v4/src/dataProvider.ts#L80) to customize the data returned by the backend. So, our data will look like:

```json
{
    "id": 1,
    "title": "My title",
    "content": "Long content..."
}
```

:::

## Setup

```bash
npm i @refinedev/strapi-v4
```

:::caution
To make this example more visual, we used the [`@refinedev/antd`](https://github.com/refinedev/refine/tree/master/packages/refine-antd) package. If you are using Refine headless, you need to provide the components, hooks, or helpers imported from the [`@refinedev/antd`](https://github.com/refinedev/refine/tree/master/packages/refine-antd) package.
:::

## Usage

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
//highlight-next-line
import { DataProvider } from "@refinedev/strapi-v4";

const App: React.FC = () => {
    return (
        <Refine
            //highlight-next-line
            dataProvider={DataProvider("API_URL")}
            /* ... */
        >
            {/* ... */}
        </Refine>
    );
};
```

## API Parameters

Let's examine how API parameters that come with Strapi-v4 are used with `meta`. Then, let's see how it is used in the application.

### Create Collections

We created two collections on [Strapi](https://strapi.io/) as `posts` and `categories` and added a relation between them. For detailed information on how to create a collection, you can check [here](https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html).

<Tabs
defaultValue="posts"
values={[
{label: 'posts', value: 'posts'},
{label: 'categories', value: 'categories'}
]}>
<TabItem value="posts">

**posts** has the following fields:

-   `id`
-   `title`
-   `content`
-   `category`
-   `createdAt`
-   `locale`

</TabItem>
<TabItem value="categories">

**categories** has the following fields:

-   `id`
-   `title`

</TabItem>
</Tabs>

### Fields Selection

To select only some fields, we must specify these fields with `meta``.

[Refer to the Fields Selection documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#fields-selection)

```tsx title="Get only id and title of all posts"
const { tableProps } = useTable<IPost>({
    meta: {
        fields: ["id", "title"],
    },
});
```

```tsx title="Get all fields of all posts(id, title, category, content ...)"
const { tableProps } = useTable<IPost>({
    meta: {
        fields: "*",
    },
});
```

When sending the request, we can specify which fields will come, so we send `fields` in `meta` to hooks that we will fetch data from. In this way, you can perform the queries of only the fields you want.

```tsx title="PostList.tsx"
import { useState } from "react";
import {
    List,
    useTable,
    getDefaultSortOrder,
    FilterDropdown,
    useSelect,
    EditButton,
    DeleteButton,
} from "@refinedev/antd";
import { Table, Select, Space } from "antd";

import { IPost } from "interfaces";

import { API_URL } from "../../constants";

export const PostList: React.FC = () => {
    const { tableProps, sorter } = useTable<IPost>({
        meta: {
            // highlight-start
            fields: ["id", "title"],
            // highlight-end
        },
    });

    return (
        <List>
            <Table
                {...tableProps}
                rowKey="id"
                pagination={{
                    ...tableProps.pagination,
                    showSizeChanger: true,
                }}
            >
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    sorter={{ multiple: 3 }}
                />
                <Table.Column
                    dataIndex="title"
                    title="Title"
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                    sorter={{ multiple: 2 }}
                />

                <Table.Column<{ id: string }>
                    title="Actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/strapi-v4/selection.png" alt="Fields Selection Metadata" />
</div>

### Relations Population

By default, relations are not populated when fetching entries.

The `populate` parameter is used to define which fields will be populated.

[Refer to the Relations Population documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/populating-fields.html#population)

```tsx title="Get all the posts and populate the selected relations"
const { tableProps } = useTable<IPost>({
    meta: {
        populate: ["category", "cover"],
    },
});
```

```tsx title="Get all posts and populate all their first-level relations"
const { tableProps } = useTable<IPost>({
    meta: {
        populate: "*",
    },
});
```

It should be noted that Strapi-V4 allows populating relations more than 1 level.

```tsx title="Get all posts and populate one second-level relation and first-level relation"
const { tableProps } = useTable<IPost>({
    meta: {
        populate: {
            category: {
                populate: ["cover"],
            },
            cover: {
                populate: [""],
            },
        },
    },
});
```

In order to pull the `categories` related to the posts, we can now show the categories in our list by defining the `meta` `populate` parameter.

```tsx title="PostList.tsx"
import {
    List,
    useTable,
    getDefaultSortOrder,
    FilterDropdown,
    useSelect,
    EditButton,
    DeleteButton,
} from "@refinedev/antd";
import { Table, Select, Space } from "antd";

import { IPost } from "interfaces";

import { API_URL } from "../../constants";

export const PostList: React.FC = () => {
    const { tableProps, sorter } = useTable<IPost>({
        meta: {
            fields: ["id", "title"],
            // highlight-start
            populate: ["category"],
            // highlight-end
        },
    });

    // highlight-start
    const { selectProps } = useSelect({
        resource: "categories",
        optionLabel: "title",
        optionValue: "id",
    });
    // highlight-end

    return (
        <List>
            <Table
                {...tableProps}
                rowKey="id"
                pagination={{
                    ...tableProps.pagination,
                    showSizeChanger: true,
                }}
            >
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    sorter={{ multiple: 3 }}
                />
                <Table.Column
                    dataIndex="title"
                    title="Title"
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                    sorter={{ multiple: 2 }}
                />
                //highlight-start
                <Table.Column
                    dataIndex={["category", "title"]}
                    title="Category"
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...selectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                //highlight-end
                <Table.Column<{ id: string }>
                    title="Actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/strapi-v4/category.png" alt="category" />
</div>

##### Relations Population for `/me` request

If you need to the population for the `/me` request you can use it like this in your `authProvider`.

```tsx
const strapiAuthHelper = AuthHelper(API_URL + "/api");

strapiAuthHelper.me("token", {
    meta: {
        populate: ["role"],
    },
});
```

### Publication State

:::note
The Draft & Publish feature should be enabled on Strapi.
:::

[Refer to the Publication State documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#publication-state)

`live`: returns only published entries

`preview`: returns draft and published entries

```tsx
const { tableProps } = useTable<IPost>({
    meta: {
        publicationState: "preview",
    },
});
```

We can list the posts separately according to the `published` or `draft` information.

```tsx title="PostList"
// highlight-next-line
import { useState } from "react";

import {
    List,
    useTable,
    getDefaultSortOrder,
    FilterDropdown,
    useSelect,
    DateField,
    EditButton,
    DeleteButton,
} from "@refinedev/antd";
import {
    Table,
    Select,
    Space,
    // highlight-start
    Form,
    Radio,
    Tag,
    // highlight-end
} from "antd";

import { IPost } from "interfaces";

import { API_URL } from "../../constants";

export const PostList: React.FC = () => {
    // highlight-start
    const [publicationState, setPublicationState] = useState("live");
    // highlight-end

    const { tableProps, sorter } = useTable<IPost>({
        meta: {
            fields: ["id", "title"],
            populate: ["category"],
            // highlight-start
            publicationState,
            // highlight-end
        },
    });

    const { selectProps } = useSelect({
        resource: "categories",
        optionLabel: "title",
        optionValue: "id",
    });

    return (
        <List>
            //highlight-start
            <Form
                layout="inline"
                initialValues={{
                    publicationState,
                }}
            >
                <Form.Item label="Publication State" name="publicationState">
                    <Radio.Group
                        onChange={(e) => setPublicationState(e.target.value)}
                    >
                        <Radio.Button value="live">Published</Radio.Button>
                        <Radio.Button value="preview">
                            Draft and Published
                        </Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Form>
            //highlight-end
            <br />
            <Table
                {...tableProps}
                rowKey="id"
                pagination={{
                    ...tableProps.pagination,
                    showSizeChanger: true,
                }}
            >
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    sorter={{ multiple: 3 }}
                />
                <Table.Column
                    dataIndex="title"
                    title="Title"
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                    sorter={{ multiple: 2 }}
                />
                <Table.Column
                    dataIndex={["category", "title"]}
                    title="Category"
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...selectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                //highlight-start
                <Table.Column
                    dataIndex="publishedAt"
                    title="Status"
                    render={(value) => {
                        return (
                            <Tag color={value ? "green" : "blue"}>
                                {value ? "Published" : "Draft"}
                            </Tag>
                        );
                    }}
                />
                //highlight-end
                <Table.Column<{ id: string }>
                    title="Actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/strapi-v4/publication.gif" alt="publication" />
</div>

<br/>

### Locale

:::tip
To fetch content for a locale, make sure it has been already [added to Strapi in the admin panel](https://docs.strapi.io/user-docs/latest/settings/managing-global-settings.html#configuring-internationalization-locales)
:::

[Refer to the Locale documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#locale)

```tsx
const { tableProps } = useTable<IPost>({
    meta: {
        locale: "de",
    },
});
```

With the local parameter feature, we can fetch posts and categories created according to different languages.

```tsx
import { useState } from "react";

import {
    List,
    useTable,
    getDefaultSortOrder,
    FilterDropdown,
    useSelect,
    EditButton,
    DeleteButton,
} from "@refinedev/antd";
import { Table, Select, Space, Form, Radio, Tag } from "antd";

import { IPost } from "interfaces";

import { API_URL } from "../../constants";

export const PostList: React.FC = () => {
    //highlight-start
    const [locale, setLocale] = useState("en");
    //highlight-end
    const [publicationState, setPublicationState] = useState("live");

    const { tableProps, sorter } = useTable<IPost>({
        meta: {
            populate: ["category", "cover"],
            //highlight-start
            locale,
            //highlight-end
            publicationState,
        },
    });

    const { selectProps } = useSelect({
        resource: "categories",
        optionLabel: "title",
        optionValue: "id",
        //highlight-start
        meta: { locale },
        //highlight-end
    });

    return (
        <List>
            <Form
                layout="inline"
                //highlight-start
                initialValues={{
                    locale,
                    publicationState,
                }}
                //highlight-end
            >
                //highlight-start
                <Form.Item label="Locale" name="locale">
                    <Radio.Group onChange={(e) => setLocale(e.target.value)}>
                        <Radio.Button value="en">English</Radio.Button>
                        <Radio.Button value="de">Deutsch</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                //highlight-end
                <Form.Item label="Publication State" name="publicationState">
                    <Radio.Group
                        onChange={(e) => setPublicationState(e.target.value)}
                    >
                        <Radio.Button value="live">Published</Radio.Button>
                        <Radio.Button value="preview">
                            Draft and Published
                        </Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Form>
            <br />
            <Table
                {...tableProps}
                rowKey="id"
                pagination={{
                    ...tableProps.pagination,
                    showSizeChanger: true,
                }}
            >
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    sorter={{ multiple: 3 }}
                />
                <Table.Column
                    dataIndex="title"
                    title="Title"
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                    sorter={{ multiple: 2 }}
                />
                <Table.Column
                    dataIndex={["category", "title"]}
                    title="Category"
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...selectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    dataIndex="publishedAt"
                    title="Status"
                    render={(value) => {
                        return (
                            <Tag color={value ? "green" : "blue"}>
                                {value ? "Published" : "Draft"}
                            </Tag>
                        );
                    }}
                />
                <Table.Column<{ id: string }>
                    title="Actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/strapi-v4/locale.gif" alt="locale" />
</div>
<br/>

## `meta` Usages

When creating and editing posts you can use these API parameters in `meta`:

```tsx
const { formProps, saveButtonProps, queryResult } = useForm<IPost>({
    meta: { publicationState: "preview" },
});
```

```tsx title="EditList.tsx"
const { formProps, saveButtonProps, queryResult } = useForm<IPost>({
    meta: { populate: ["category", "cover"] },
});
```

```tsx title="CreateList.tsx"
const { selectProps } = useSelect({
    meta: { locale: "en" },
});
```

## File Upload

Strapi supports file upload. Below are examples of how to upload files to Strapi.

[Refer to the Strapi documentation for more information &#8594](https://docs.strapi.io/dev-docs/plugins/upload#upload-files)

<Tabs
defaultValue="antd"
values={[
{label: 'Ant Design Form', value: 'antd'},
{label: 'React Hook Form', value: 'react-hook-form'},
{label: 'Mantine Form', value: 'mantine'}
]}>
<TabItem value="antd">

`getValueProps` and `mediaUploadMapper` are helper functions for Ant Design Form.

```tsx
import { Edit, useForm } from "@refinedev/antd";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { Form, Upload } from "antd";

import { TOKEN_KEY, API_URL } from "../../constants";
import { IPost } from "../interfaces";

export const PostEdit: React.FC = () => {
    const { formProps, saveButtonProps } = useForm<IPost>({
        metaData: { populate: ["cover"] },
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
                onFinish={(values) => {
                    formProps.onFinish?.(mediaUploadMapper(values));
                }}
            >
                <Form.Item label="Cover">
                    <Form.Item
                        name="cover"
                        valuePropName="fileList"
                        getValueProps={(data) => getValueProps(data, API_URL)}
                        noStyle
                    >
                        <Upload.Dragger
                            name="files"
                            action={`${API_URL}/api/upload`}
                            headers={{
                                Authorization: `Bearer ${localStorage.getItem(
                                    TOKEN_KEY,
                                )}`,
                            }}
                            listType="picture"
                            multiple
                        >
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Edit>
    );
};
```

</TabItem>

<TabItem value="react-hook-form">

```tsx
import { useState } from "react";
import axios from "axios";
import { Edit } from "@refinedev/mui";
import { Box, Input, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import { ICategory, IPost } from "interfaces";

import { TOKEN_KEY, API_URL } from "../../constants";

export const PostEdit: React.FC = () => {
    const [isUploadLoading, setIsUploadLoading] = useState(false);
    const [imageURL, setImageURL] = useState("");

    const {
        saveButtonProps,
        register,
        formState: { errors },
        setValue,
        setError,
    } = useForm<
        IPost,
        HttpError,
        IPost & { category: ICategory; cover: any }
    >();

    const onChangeHandler = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        try {
            setIsUploadLoading(true);

            const formData = new FormData();

            const target = event.target;
            const file: File = (target.files as FileList)[0];

            formData.append("files", file);

            const res = await axios.post(`${API_URL}/api/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                },
            });

            setImageURL(`${API_URL}${res.data[0].url}`);
            setValue("cover", res.data[0].id, { shouldValidate: true });

            setIsUploadLoading(false);
        } catch (error) {
            setError("cover", { message: "Upload failed. Please try again." });
            setIsUploadLoading(false);
        }
    };

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <Stack
                    direction="row"
                    gap={4}
                    flexWrap="wrap"
                    sx={{ marginTop: "16px" }}
                >
                    <label htmlFor="images-input">
                        <Input
                            id="images-input"
                            type="file"
                            sx={{ display: "none" }}
                            onChange={onChangeHandler}
                        />
                        <input
                            id="file"
                            {...register("cover", {
                                required: "This field is required",
                            })}
                            type="hidden"
                        />
                        <LoadingButton
                            loading={isUploadLoading}
                            loadingPosition="end"
                            endIcon={<FileUploadIcon />}
                            variant="contained"
                            component="span"
                        >
                            Upload
                        </LoadingButton>
                        <br />
                        {errors.cover && (
                            <Typography variant="caption" color="#fa541c">
                                {errors.cover?.message?.toString()}
                            </Typography>
                        )}
                    </label>
                    {imageURL && (
                        <Box
                            component="img"
                            sx={{
                                maxWidth: 250,
                                maxHeight: 250,
                            }}
                            src={imageURL}
                            alt="Post image"
                        />
                    )}
                </Stack>
            </Box>
        </Edit>
    );
};
```

</TabItem>

<TabItem value="mantine">

```tsx
import { useState } from "react";
import axios from "axios";
import { Edit, useForm } from "@refinedev/mantine";
import { Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";

const API_URL = "http://localhost:1337";
const TOKEN_KEY = "strapi-jwt-token";

export const PostEdit: React.FC = () => {
    const [isUploadLoading, setIsUploadLoading] = useState(false);

    const { saveButtonProps, setFieldValue } = useForm<any>({
        initialValues: {
            title: "",
            cover: "",
        },
    });

    const handleOnDrop = async (files: FileWithPath[]) => {
        try {
            setIsUploadLoading(true);

            const formData = new FormData();

            const file = files[0];

            formData.append("files", file);

            const res = await axios.post(`${API_URL}/api/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                },
            });

            setFieldValue("cover", res.data[0].id);

            setIsUploadLoading(false);
        } catch (error) {
            setIsUploadLoading(false);
        }
    };

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <form>
                <Text mt={8} weight={500} size="sm" color="#212529">
                    Cover
                </Text>
                <Dropzone
                    accept={IMAGE_MIME_TYPE}
                    onDrop={handleOnDrop}
                    loading={isUploadLoading}
                >
                    <Text align="center">Drop images here</Text>
                </Dropzone>
            </form>
        </Edit>
    );
};
```

</TabItem>
</Tabs>

## Example

:::note Demo Credentials
Username: demo@refine.dev

Password: demodemo
:::

<CodeSandboxExample path="data-provider-strapi-v4" />
