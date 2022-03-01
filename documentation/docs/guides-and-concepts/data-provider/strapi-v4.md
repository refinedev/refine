---
id: strapi-v4
title: Strapi-v4
---

import selection from '@site/static/img/guides-and-concepts/data-provider/strapi-v4/selection.png';
import category from '@site/static/img/guides-and-concepts/data-provider/strapi-v4/category.png';
import publication from '@site/static/img/guides-and-concepts/data-provider/strapi-v4/publication.gif';
import locale from '@site/static/img/guides-and-concepts/data-provider/strapi-v4/locale.gif';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**refine** supports the features that come with [Strapi-v4](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html).

A few of the Strapi-v4 API features are as follows:

-   Fields Selection
-   Relations Population
-   Publication State
-   Locale

`metaData` allows us to use the above features in hooks. Thus, we can fetch the data according to the parameters we want.

Hooks and components that support `metaData`:

| Supported data hooks                                        | Supported other hooks                                                            | Supported components                                                        |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [`useUpdate` &#8594](/core/hooks/data/useUpdate.md)         | [`useForm` &#8594](/core/hooks/useForm.md)                                       | [`DeleteButton` &#8594](/ui-frameworks/antd/components/buttons/delete.md)   |
| [`useUpdateMany` &#8594](/core/hooks/data/useUpdateMany.md) | [`useModalForm` &#8594](/ui-frameworks/antd/hooks/form/useModalForm.md)          | [`RefreshButton` &#8594](/ui-frameworks/antd/components/buttons/refresh.md) |
| [`useDelete` &#8594](/core/hooks/data/useDelete.md)         | [`useDrawerForm` &#8594](/ui-frameworks/antd/hooks/form/useDrawerForm.md)        |                                                                             |
| [`useDeleteMany` &#8594](/core/hooks/data/useDeleteMany.md) | [`useStepsForm` &#8594](/ui-frameworks/antd/hooks/form/useStepsForm.md)          |                                                                             |
| [`useCreate` &#8594](/core/hooks/data/useCreate.md)         | [`useTable` &#8594](/core/hooks/useTable.md)                                     |                                                                             |
| [`useCreateMany` &#8594](/core/hooks/data/useCreateMany.md) | [`useEditableTable` &#8594](/ui-frameworks/antd/hooks/table/useEditableTable.md) |                                                                             |
| [`useList` &#8594](/core/hooks/data/useList.md)             | [`useSimpleList` &#8594](/ui-frameworks/antd/hooks/list/useSimpleList.md)        |                                                                             |
| [`useOne` &#8594](/core/hooks/data/useOne.md)               | [`useShow` &#8594](/core/hooks/show/useShow.md)                                  |                                                                             |
| [`useMany` &#8594](/core/hooks/data/useMany.md)             | [`useExport` &#8594](/core/hooks/import-export/useExport.md)                     |                                                                             |
| [`useCustom` &#8594](/core/hooks/data/useCustom.md)         | [`useCheckboxGroup` &#8594](/ui-frameworks/antd/hooks/field/useCheckboxGroup.md) |                                                                             |
|                                                             | [`useSelect` &#8594](/core/hooks/useSelect.md)                                   |                                                                             |
|                                                             | [`useRadioGroup` &#8594](/ui-frameworks/antd/hooks/field/useRadioGroup.md)       |                                                                             |

:::note
There is no need to use `metaData` for sorting, pagination and filters. Sorting, pagination and filters will be handled automatically by the strapi-v4 dataProvider.
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

However, we can use [normalizeData](https://github.com/pankod/refine/blob/27a55320ada61a0624ed2f5b29331946334f7727/packages/strapi-v4/src/dataProvider.ts#L80) to customize the data returned by the backend. So, our data will look like:

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
npm i @pankod/refine-strapi-v4
```

:::caution
To make this example more visual, we used the [`@pankod/refine-antd`](https://github.com/pankod/refine/tree/master/packages/refine-antd) package. If you are using Refine headless, you need to provide the components, hooks or helpers imported from the [`@pankod/refine-antd`](https://github.com/pankod/refine/tree/master/packages/refine-antd) package.
:::

## Usage

```tsx title="App.tsx"
import { Refine, AuthProvider } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router";
//highlight-next-line
import { DataProvider } from "@pankod/refine-strapi-v4";
import routerProvider from "@pankod/refine-react-router";

const App: React.FC = () => {
    return (
        <Refine
            authProvider={authProvider}
            //highlight-next-line
            dataProvider={DataProvider("API_URL")}
            routerProvider={routerProvider}
            Layout={Layout}
            ReadyPage={ReadyPage}
            notificationProvider={notificationProvider}
            catchAll={<ErrorComponent />}
        />
    );
};
```

## API Parameters

Let's examine how API parameters that come with Strapi-v4 are used with `metaData`. Then, let's see how it is used in the application.

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

To select only some fields, we must specify this fields with `metaData`.

[Refer to the Fields Selection documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#fields-selection)

```tsx title="Get only id and title of all posts"
const { tableProps } = useTable<IPost>({
    metaData: {
        fields: ["id", "title"],
    },
});
```

```tsx title="Get all fields of all posts(id, title, category, content ...)"
const { tableProps } = useTable<IPost>({
    metaData: {
        fields: "*",
    },
});
```

When sending the request, we can specify which fields will come, so we send `fields` in `metaData` to hooks that we will fetch data from. In this way, you can perform the queries of only the fields you want.

```tsx title="PostList.tsx"
import { useState } from "react";
import { IResourceComponentsProps } from "@pankod/core";
import {
    List,
    Table,
    useTable,
    getDefaultSortOrder,
    FilterDropdown,
    Select,
    useSelect,
    Space,
    EditButton,
    DeleteButton,
} from "@pankod/refine-antd";

import { IPost } from "interfaces";

import { API_URL } from "../../constants";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<IPost>({
        metaData: {
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
    <img src={selection} alt="Fields Selection Metadata" />
</div>

### Relations Population

By default, relations are not populated when fetching entries.

The `populate` parameter is used to define which fields will be populated.

[Refer to the Relations Population documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#relations-population)

```tsx title="Get all the posts and populate the selected relations"
const { tableProps } = useTable<IPost>({
    metaData: {
        populate: ["category", "cover"],
    },
});
```

```tsx title="Get all posts and populate all their first-level relations"
const { tableProps } = useTable<IPost>({
    metaData: {
        populate: "*",
    },
});
```

In order to pull the `categories` related to the posts, we can now show the categories in our list by defining the `metaData` `populate` parameter.

```tsx title="PostList.tsx"
import { IResourceComponentsProps } from "@pankod/refine-core";
import {
    List,
    Table,
    useTable,
    getDefaultSortOrder,
    FilterDropdown,
    Select,
    useSelect,
    Space,
    EditButton,
    DeleteButton,
} from "@pankod/refine-antd";

import { IPost } from "interfaces";

import { API_URL } from "../../constants";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<IPost>({
        metaData: {
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
    <img src={category} alt="category" />
</div>

### Publication State

:::note
The Draft & Publish feature should be enabled on Strapi.
:::

[Refer to the Publication State documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#publication-state)

`live`: returns only published entries

`preview`: returns draft and published entries

```tsx
const { tableProps } = useTable<IPost>({
    metaData: {
        publicationState: "preview",
    },
});
```

We can list the posts separately according to the `published` or `draft` information.

```tsx title="PostList"
// highlight-next-line
import { useState } from "react";

import { IResourceComponentsProps } from "@pankod/refine-core";
import {
    List,
    Table,
    useTable,
    getDefaultSortOrder,
    FilterDropdown,
    Select,
    useSelect,
    DateField,
    Space,
    EditButton,
    DeleteButton,
    // highlight-start
    Form,
    Radio,
    Tag,
    // highlight-end
} from "@pankod/refine-antd";

import { IPost } from "interfaces";

import { API_URL } from "../../constants";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    // highlight-start
    const [publicationState, setPublicationState] = useState("live");
    // highlight-end

    const { tableProps, sorter } = useTable<IPost>({
        metaData: {
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
    <img src={publication} alt="publication" />
</div>

<br/>

### Locale

:::tip
To fetch content for a locale, make sure it has been already [added to Strapi in the admin panel](https://docs.strapi.io/user-docs/latest/settings/managing-global-settings.html#configuring-internationalization-locales)
:::

[Refer to the Locale documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#locale)

```tsx
const { tableProps } = useTable<IPost>({
    metaData: {
        locale: "de",
    },
});
```

With the local parameter feature, we can fetch posts and categories created according to different languages.

```tsx
import { useState } from "react";

import { IResourceComponentsProps } from "@pankod/refine-core";
import {
    List,
    Table,
    useTable,
    getDefaultSortOrder,
    FilterDropdown,
    Select,
    useSelect,
    Space,
    EditButton,
    DeleteButton,
    Form,
    Radio,
    Tag,
} from "@pankod/refine-antd";

import { IPost } from "interfaces";

import { API_URL } from "../../constants";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    //highlight-start
    const [locale, setLocale] = useState("en");
    //highlight-end
    const [publicationState, setPublicationState] = useState("live");

    const { tableProps, sorter } = useTable<IPost>({
        metaData: {
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
        metaData: { locale },
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
    <img src={locale} alt="locale" />
</div>
<br/>

## `metaData` Usages

When creating and editing posts you can use these API parameters in `metaData`:

```tsx
const { formProps, saveButtonProps, queryResult } = useForm<IPost>({
    metaData: { publicationState: "preview" },
});
```

```tsx title="EditList.tsx"
const { formProps, saveButtonProps, queryResult } = useForm<IPost>({
    metaData: { populate: ["category", "cover"] },
});
```

```tsx title="CreateList.tsx"
const { selectProps } = useSelect({
    metaData: { locale: "en" },
});
```

## Live Codesandbox Example

Username: demo@refine.dev

Password: demodemo

<iframe src="https://codesandbox.io/embed/refine-strapi-v4-example-dt5gz?autoresize=1&fontsize=14&module=%2Fsrc%2FApp.tsx&theme=dark&view=preview"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="refine-strapi-v4-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
