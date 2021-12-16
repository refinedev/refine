---
id: strapi-v4
title: Strapi-v4
---

import selection from '@site/static/img/guides-and-concepts/data-provider/strapi-v4/selection.png';
import category from '@site/static/img/guides-and-concepts/data-provider/strapi-v4/category.png';
import publication from '@site/static/img/guides-and-concepts/data-provider/strapi-v4/publication.gif';
import locale from '@site/static/img/guides-and-concepts/data-provider/strapi-v4/locale.gif';

**refine** supports the features that come with [Strapi-v4](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html).

A few of the Strapi-v4 API features are as follows:

-   Fields Selection
-   Releations Population
-   Publication State
-   Locale

You can use these API features with **refine**. Thanks to `MetaDataQuery`, you can simply send queries using these API parameters.

Hooks and components that support `MetaDataQuery`:

| Supported data hooks                                                 | Supported other hooks                                                       | Supported components                                                   |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [`useUpdate` &#8594](api-references/hooks/data/useUpdate.md)         | [`useForm` &#8594](api-references/hooks/form/useForm.md)                    | [`DeleteButton` &#8594](api-references/components/buttons/delete.md)   |
| [`useUpdateMany` &#8594](api-references/hooks/data/useUpdateMany.md) | [`useModalForm` &#8594](api-references/hooks/form/useModalForm.md)          | [`RefreshButton` &#8594](api-references/components/buttons/refresh.md) |
| [`useDelete` &#8594](api-references/hooks/data/useDelete.md)         | [`useDrawerForm` &#8594](api-references/hooks/form/useDrawerForm.md)        |                                                                        |
| [`useDeleteMany` &#8594](api-references/hooks/data/useDeleteMany.md) | [`useStepsForm` &#8594](api-references/hooks/form/useStepsForm.md)          |                                                                        |
| [`useCreate` &#8594](api-references/hooks/data/useCreate.md)         | [`useTable` &#8594](api-references/hooks/table/useTable.md)                 |                                                                        |
| [`useCreateMany` &#8594](api-references/hooks/data/useCreateMany.md) | [`useEditableTable` &#8594](api-references/hooks/table/useEditableTable.md) |                                                                        |
| [`useList` &#8594](api-references/hooks/data/useList.md)             | [`useSimpleList` &#8594](api-references/hooks/show/useSimpleList.md)        |                                                                        |
| [`useOne` &#8594](api-references/hooks/data/useOne.md)               | [`useShow` &#8594](api-references/hooks/show/useShow.md)                    |                                                                        |
| [`useMany` &#8594](api-references/hooks/data/useMany.md)             | [`useExport` &#8594](api-references/hooks/import-export/useExport.md)       |                                                                        |
| [`useCustom` &#8594](api-references/hooks/data/useCustom.md)         | [`useCheckboxGroup` &#8594](api-references/hooks/field/useCheckboxGroup.md) |                                                                        |
|                                                                      | [`useSelect` &#8594](api-references/hooks/field/useSelect.md)               |                                                                        |
|                                                                      | [`useRadioGroup` &#8594](api-references/hooks/field/useRadioGroup.md)       |                                                                        |


:::note
You can handle features such as Sorting, Pagination and Filters with Dataprovider. There is no need to use MetaDataQuery.
:::

## Setup 
```bash
npm i @pankod/refine-strapi-v4
```

## Usage
```tsx title="App.tsx"
import { Refine, AuthProvider } from "@pankod/refine";
//highlight-start
import { DataProvider } from "@pankod/refine-strapi-v4";
//highlight-end
import routerProvider from "@pankod/refine-react-router";

const App: React.FC = () => {
    return (
        <Refine
            authProvider={authProvider}
            //highlight-start
            dataProvider={DataProvider("API_URL")}
            //highlight-end
            routerProvider={routerProvider}
        />
    );
};
```

## API Parameters
Let's examine how API parameters that come with Strapi-v4 are used with **refine** metadata. Then, let's see how it is used in the application.



### Create Collections
We created two collections on [Strapi](https://strapi.io/) as `posts` and `categories` and added a relation between them. For detailed information on how to create a collection, you can check [here](https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html).


```tsx title="posts"
{
    id: 3,
    attributes: {
        title: "Incidunt tempora ut voluptas est",
        content: "Soluta voluptatibus rem assumenda id autem possimus dicta molestiae qui. Tenetur corporis sed aliquam et voluptatibus expedita in sunt.",
        createdAt: "2021-12-15T14:22:52.919Z",
        updatedAt: "2021-12-15T14:23:07.542Z",
        publishedAt: "2021-12-15T14:22:54.126Z",
        locale: "en"
    }
}
```

### Fields Selection
To select only some fields, we must specify this fields with metadata.

[Refer to the Fields Selection documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#fields-selection)

```tsx title="Get only id and title of all posts"
const { tableProps } = useTable<IPost>({
    metaData: {
        fields: ["id", "title"]
    },
}); 
```

```tsx title="Get all fields of all posts(id, title, category, content ...)"
const { tableProps } = useTable<IPost>({
    metaData: {
        fields: "*"
    },
});    
```

When sending the request, we can specify which fields will come, so we send `fields` in `metaData` to hooks that we will fetch data from. In this way, you can perform the queries of only the fields you want.

```tsx title="PostList.tsx"
import { useState } from "react";
import {
    List,
    Table,
    useTable,
    IResourceComponentsProps,
    getDefaultSortOrder,
    FilterDropdown,
    Select,
    useSelect,
    Space,
    EditButton,
    DeleteButton,
} from "@pankod/refine";

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
                    key="id"
                    title="ID"
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    sorter={{ multiple: 3 }}
                />
                <Table.Column
                    dataIndex="title"
                    key="title"
                    title="Title"
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                    sorter={{ multiple: 2 }}
                />

                <Table.Column<{ id: string }>
                    title="Actions"
                    dataIndex="actions"
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


### Releations Population
By default, relations are not populated when fetching entries.

The `populate` parameter is used to define which fields will be populated.

[Refer to the Releations Population documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#relations-population)

```tsx title="Get all the posts and populate the selected relations"
const { tableProps } = useTable<IPost>({
    metaData: {
        populate: ["category", "cover"]
    },
}); 
```

```tsx title="Get all posts and populate all their first-level relations"
const { tableProps } = useTable<IPost>({
    metaData: {
        populate: "*"
    },
});  
```

In order to pull the `categories` related to the posts, we can now show the categories in our list by defining the `metadata` `populate` parameter.

```tsx title="PostList.tsx"
import { useState } from "react";
import {
    List,
    Table,
    useTable,
    IResourceComponentsProps,
    getDefaultSortOrder,
    FilterDropdown,
    Select,
    useSelect,
    DateField,
    Space,
    EditButton,
    DeleteButton,
    ImageField,
    Form,
    Radio,
    Tag,
} from "@pankod/refine";

import { IPost } from "interfaces";

import { API_URL } from "../../constants";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const [locale, setLocale] = useState("en");
    const [publicationState, setPublicationState] = useState("live");

    const { tableProps, sorter } = useTable<IPost>({
        metaData: {
            fields: ["id", "title"],
            // highlight-start
            populate: ["category"],
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
                    key="id"
                    title="ID"
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    sorter={{ multiple: 3 }}
                />
                <Table.Column
                    dataIndex="title"
                    key="title"
                    title="Title"
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                    sorter={{ multiple: 2 }}
                />
                //highlight-start
                <Table.Column
                    key="[category][id]"
                    dataIndex={["category", "data", "attributes", "title"]}
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
                    dataIndex="actions"
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
        publicationState: "preview"
    },
});
```

We can list the posts separately according to the `published` or `draft` information.

```tsx title="PostList"
import { useState } from "react";
import {
    List,
    Table,
    useTable,
    IResourceComponentsProps,
    getDefaultSortOrder,
    FilterDropdown,
    Select,
    useSelect,
    DateField,
    Space,
    EditButton,
    DeleteButton,
    ImageField,
    Form,
    Radio,
    Tag,
} from "@pankod/refine";

import { IPost } from "interfaces";

import { API_URL } from "../../constants";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    // highlight-start
    const [publicationState, setPublicationState] = useState("live");
    //highlight-end

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
            <Form
                layout="inline"
                //highlight-start
                initialValues={{
                    publicationState,
                }}
                //highlight-end
            >
               //highlight-start
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
                //highlight-end
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
                    key="id"
                    title="ID"
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    sorter={{ multiple: 3 }}
                />
                <Table.Column
                    dataIndex="title"
                    key="title"
                    title="Title"
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                    sorter={{ multiple: 2 }}
                />
                <Table.Column
                    key="[category][id]"
                    dataIndex={["category", "data", "attributes", "title"]}
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
                    dataIndex="actions"
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
        locale: "de"
    },
});
```

With the local parameter feature, we can fetch posts and categories created according to different languages.

```tsx
import { useState } from "react";
import {
    List,
    Table,
    useTable,
    IResourceComponentsProps,
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
} from "@pankod/refine";

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
                    key="id"
                    title="ID"
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    sorter={{ multiple: 3 }}
                />
                <Table.Column
                    dataIndex="title"
                    key="title"
                    title="Title"
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                    sorter={{ multiple: 2 }}
                />
                <Table.Column
                    key="[category][id]"
                    dataIndex={["category", "data", "attributes", "title"]}
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
                    dataIndex="actions"
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

:::tip
When creating and editing posts you can use these API parameters in `metaData`. You can look how it is used in EditList and CreateList from Codesandbox.

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
:::

## Live Codesandbox Example
Username: demo@refine.dev

Password: demodemo

<iframe src="https://codesandbox.io/embed/refine-strapi-v4-example-n1uy2?autoresize=1&fontsize=14&module=%2Fsrc%2FApp.tsx&theme=dark&view=preview"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="refine-strapi-v4-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>