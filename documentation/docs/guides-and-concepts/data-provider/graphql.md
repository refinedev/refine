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
| [`useUpdate` &#8594](/core/hooks/data/useUpdate.md)         | [`useForm` &#8594](/core/hooks/useForm.md)                    | [`DeleteButton` &#8594](/ui-frameworks/antd/components/buttons/delete.md)   |
| [`useUpdateMany` &#8594](/core/hooks/data/useUpdateMany.md) | [`useModalForm` &#8594](/ui-frameworks/antd/hooks/form/useModalForm.md)          | [`RefreshButton` &#8594](/ui-frameworks/antd/components/buttons/refresh.md) |
| [`useDelete` &#8594](/core/hooks/data/useDelete.md)         | [`useDrawerForm` &#8594](/ui-frameworks/antd/hooks/form/useDrawerForm.md)        |                                                                        |
| [`useDeleteMany` &#8594](/core/hooks/data/useDeleteMany.md) | [`useStepsForm` &#8594](/ui-frameworks/antd/hooks/form/useStepsForm.md)          |                                                                        |
| [`useCreate` &#8594](/core/hooks/data/useCreate.md)         | [`useTable` &#8594](/core/hooks/useTable.md)                 |                                                                        |
| [`useCreateMany` &#8594](/core/hooks/data/useCreateMany.md) | [`useEditableTable` &#8594](/ui-frameworks/antd/hooks/table/useEditableTable.md) |                                                                        |
| [`useList` &#8594](/core/hooks/data/useList.md)             | [`useSimpleList` &#8594](/ui-frameworks/antd/hooks/list/useSimpleList.md)        |                                                                        |
| [`useOne` &#8594](/core/hooks/data/useOne.md)               | [`useShow` &#8594](/core/hooks/show/useShow.md)                    |                                                                        |
| [`useMany` &#8594](/core/hooks/data/useMany.md)             | [`useExport` &#8594](/core/hooks/import-export/useExport.md)       |                                                                        |
| [`useCustom` &#8594](/core/hooks/data/useCustom.md)         | [`useCheckboxGroup` &#8594](/ui-frameworks/antd/hooks/field/useCheckboxGroup.md) |                                                                        |
|                                                                      | [`useSelect` &#8594](/core/hooks/useSelect.md)               |                                                                        |
|                                                                      | [`useRadioGroup` &#8594](/ui-frameworks/antd/hooks/field/useRadioGroup.md)       |                                                                        |

## Setup

```bash
npm i @pankod/refine-core @pankod/refine-antd @pankod/refine-strapi-graphql graphql-request
```

:::caution
To make this example more visual, we used the [`@pankod/refine-antd`](https://github.com/pankod/refine/tree/master/packages/refine-antd) package. If you are using Refine headless, you need to provide the components, hooks or helpers imported from the [`@pankod/refine-antd`](https://github.com/pankod/refine/tree/master/packages/refine-antd) package.
:::

:::info
We used [strapi-graphql](https://github.com/pankod/refine/tree/master/packages/strapi-graphql) server for this guide. You can customize your data provider for your own GraphQL server.
:::

## Usage

To activate data provider in `@pankod/refine-strapi-graphql`, we have to pass the API address with `GraphQLClient`.

```tsx  title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import { Layout, ReadyPage, notificationProvider, ErrorComponent } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
// highlight-start
import dataProvider from "@pankod/refine-strapi-graphql";
import { GraphQLClient } from "graphql-request";
// highlight-end

const client = new GraphQLClient("API_URL");

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
// highlight-next-line
            dataProvider={dataProvider(client)}
            Layout={Layout}
            ReadyPage={ReadyPage}
            notificationProvider={notificationProvider}
            catchAll={<ErrorComponent />}
        />
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

```tsx
export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
// highlight-start
        metaData: {
            fields: [
                "id",
                "title",
                {
                    category: ["title"],
                },
            ],
        },
// highlight-end
    });

    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
// highlight-start
        metaData: {
            fields: ["id", "title"],
        },
// highlight-end
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

On the edit page [`useForm`](/core/hooks/useForm.md) sends a request with the record id to fill the form. `fields` must be sent in `metaData` to determine which fields will come in this request.

<Tabs
defaultValue="usage"
values={[
{label: 'usage', value: 'usage'},
{label: 'output', value: 'output'}
]}>
<TabItem value="usage">

```tsx
export const PostEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<
        IPost,
        HttpError,
        IPost
    >({
// highlight-start
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
// highlight-end
    });

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: postData?.category.id,
// highlight-start
        metaData: {
            fields: ["id", "title"],
        },
// highlight-end
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
The create page is largely the same as the edit page, there is no need to pass `metaData` to [`useForm`](/core/hooks/useForm.md) on the create page. If you want to use the created record as a response after the request, you can pass the `fields` with `metaData`.
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

Show component includes the [`<RefreshButton>`](/ui-frameworks/antd/components/buttons/refresh.md) by default. We can pass `refetch` method of `queryResult` to it's `onClick`. This method repeats the last request made by the query. So it refreshes the data that is shown in page.

<Tabs
defaultValue="usage"
values={[
{label: 'usage', value: 'usage'},
{label: 'output', value: 'output'}
]}>
<TabItem value="usage">

```tsx
export const PostShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IPost>({
        resource: "posts",
        // highlight-start
        metaData:{
            fields: [
                "id",
                "title",
                {
                    category: ["title"],
                },
                "content",
            ],
        },
        // highlight-end
    });
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show
            isLoading={isLoading}
            // highlight-next-line
            pageHeaderProps={{ extra: <RefreshButton onClick={() => queryResult.refetch()} /> }}
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
