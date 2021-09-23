---
id: graphql
title: GraphQL
---

import graphqlList from '@site/static/img/guides-and-concepts/data-provider/graphql-list.png';
import graphqlEdit from '@site/static/img/guides-and-concepts/data-provider/graphql-edit.png';
import graphqlShow from '@site/static/img/guides-and-concepts/data-provider/graphql-show.png';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**refine** [graphql](https://github.com/pankod/refine/tree/master/packages/graphql) and [strapi-graphql](https://github.com/pankod/refine/tree/master/packages/strapi-graphql) data provider built with [gql-query-builder](https://github.com/atulmy/gql-query-builder) and [graphql-request](https://github.com/prisma-labs/graphql-request) is made for GraphQL implemantation. It aims to create a query dynamically with [gql-query-builder](https://github.com/atulmy/gql-query-builder) and send requests with [graphql-request](https://github.com/prisma-labs/graphql-request).

## GraphQL Query Builder

[GraphQL Query Builder](https://github.com/atulmy/gql-query-builder) allows us to build queries and mutations. The `getList`, `getMany` and `getOne` methods in our `dataProvider` generate a query to send a request. On the other hand, the `create`, `createMany`, `update`, `updateMany`, `deleteOne` and `deleteMany` methods generate a mutation to send a request.

In order to create a GraphQL query, our `dataProvider` has to take some options, such as specifying which fields will come in response, we pass these options to our `dataProvider` methods with `MetaDataQuery`.

[Refer to the `MetaDataQuery` properties for detailed usage. &#8594](https://github.com/atulmy/gql-query-builder#options)

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

## Setup

```bash
npm i @pankod/refine @pankod/refine-strapi-graphql graphql-request
```

:::info
We used [strapi-graphql](https://github.com/pankod/refine/tree/master/packages/strapi-graphql) server for this guide. You can customize your data provider for your own GraphQL server.
:::

## Usage

To activate data provider in `@pankod/refine-strapi-graphql`, we have to pass the API address with `GraphQLClient`.

```tsx twoslash title="src/App.tsx" {2-3, 9}
import { Refine } from "@pankod/refine";

import dataProvider from "@pankod/refine-strapi-graphql";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("API_URL");

const App: React.FC = () => {
    return (
        <Refine dataProvider={dataProvider(client)}>
            ...
        </Refine>
    );
};
```

:::note
With `GraphQLClient` you can do things like add headers for authentication. On the other hand, you can send a request with your query.
:::

## Create Collections

We created two collections on [Strapi](https://strapi.io/) as `posts` and `categories` and added a relation between them. For detailed information on how to create a collection, you can check [here](https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html).

You can see the fields of the collections we created as below.

```json title="post"
{
    "id": 1,
    "title": "Eius ea autem.",
    "content": "Explicabo nihil delectus. Nam aliquid sunt numquam...",
    "category": {
        "id": 24,
        "title": "Placeat fuga"
    }
}
```

## List Page

When sending the request, we must specify which fields will come, so we send `fields` in `metaData` to hooks that we will fetch data from.

<Tabs
defaultValue="usage"
values={[
{label: 'usage', value: 'usage'},
{label: 'output', value: 'output'}
]}>
<TabItem value="usage">

```tsx twoslash {8-16, 21-23}
import {
    List,
    Table,
    useTable,
    IResourceComponentsProps,
    Space,
    EditButton,
    ShowButton,
    DeleteButton,
    getDefaultSortOrder,
    FilterDropdown,
    Select,
    useSelect,
} from "@pankod/refine";

export interface ICategory {
    id: string;
    title: string;
}

export interface IPost {
    id: string;
    title: string;
    content: string;
    category: ICategory;
}
// ---cut---
export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
        metaData: {
            fields: [
                "id",
                "title",
                {
                    category: ["title"],
                },
            ],
        },
    });

    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
        metaData: {
            fields: ["id", "title"],
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    sorter={{ multiple: 2 }}
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                />
                <Table.Column
                    key="title"
                    dataIndex="title"
                    title="Title"
                    sorter={{ multiple: 1 }}
                />
                <Table.Column<IPost>
                    dataIndex="category"
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
                    render={(_, record) => record.category.title}
                />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
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

</TabItem>
<TabItem value="output">

```ts

query ($sort: String, $where: JSON, $start: Int, $limit: Int) {
    posts (sort: $sort, where: $where, start: $start, limit: $limit) {
        id,
        title,
        category {
            title
        }
    }
}
```

</TabItem>
</Tabs>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={graphqlList} alt="GraphQL list page" />
</div>

## Edit Page

On the edit page [`useForm`](api-references/hooks/form/useForm.md) sends a request with the record id to fill the form. `fields` must be sent in `metaData` to determine which fields will come in this request.

<Tabs
defaultValue="usage"
values={[
{label: 'usage', value: 'usage'},
{label: 'output', value: 'output'}
]}>
<TabItem value="usage">

```tsx {6-16, 22-24}
export const PostEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<
        IPost,
        HttpError,
        IPost
    >({
        metaData: {
            fields: [
                "id",
                "title",
                {
                    category: ["id", "title"],
                },
                "content",
            ],
        },
    });

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: postData?.category.id,
        metaData: {
            fields: ["id", "title"],
        },
    });

    const [selectedTab, setSelectedTab] =
        useState<"write" | "preview">("write");

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
                onFinish={(values) =>
                    formProps.onFinish?.({
                        ...values,
                        category: values.category.id,
                    } as any)
                }
            >
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
            </Form>
        </Edit>
    );
};
```

:::info
The create page is largely the same as the edit page, there is no need to pass `metaData` to [`useForm`](api-references/hooks/form/useForm.md) on the create page. If you want to use the created record as a response after the request, you can pass the `fields` with `metaData`.
:::

</TabItem>
<TabItem value="output">

```ts
mutation ($input: updatePostInput) {
    updatePost (input: $input) {
        post  {
            id
        }
    }
}
```

</TabItem>
</Tabs>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={graphqlEdit} alt="GraphQL edit page" />
</div>

## Show Page

Show component includes the [`<RefreshButton>`](api-references/components/buttons/refresh.md) by default. So we have to pass `metaData` to it. Also, we must pass `metaData` again so that [`useShow`](api-references/hooks/show/useShow.md) knows which fields it will fetch.

<Tabs
defaultValue="usage"
values={[
{label: 'usage', value: 'usage'},
{label: 'output', value: 'output'}
]}>
<TabItem value="usage">

```tsx {0-9, 14, 22}
const metaData = {
    fields: [
        "id",
        "title",
        {
            category: ["title"],
        },
        "content",
    ],
};

export const PostShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IPost>({
        resource: "posts",
        metaData,
    });
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show
            isLoading={isLoading}
            pageHeaderProps={{ extra: <RefreshButton metaData={metaData} /> }}
        >
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>

            <Title level={5}>Category</Title>
            <Text>{record?.category.title}</Text>

            <Title level={5}>Content</Title>
            <MarkdownField value={record?.content} />
        </Show>
    );
};
```

</TabItem>
<TabItem value="output">

```ts
mutation ($input: updatePostInput) {
    updatePost (input: $input) {
        post  {
            id
        }
    }
}
```

</TabItem>
</Tabs>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={graphqlShow} alt="GraphQL show page" />
</div>
