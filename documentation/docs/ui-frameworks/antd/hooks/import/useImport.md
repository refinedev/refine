---
id: useImport
title: useImport
---

`useImport` hook allows you to handle your `CSV` import logic easily. It gives you the properties to pass to Ant Design's [`<Upload>`][Upload] and [`<Button>`][Button] components and handles the upload logic. It uses [`papaparse`][papaparse] under the hood to parse `CSV` files. 

It's return type is compatible with [`<ImportButton>`][ImportButton]. It can also be further customized by using it with Ant Design's [`<Upload>`][Upload] and [`<Button>`][Button] props.

```ts
import { useImport } from "@pankod/refine-antd";

const { uploadProps, buttonProps, mutationResult } = useImport(options);
```

## Usage

Assume we have a `CSV` file of this contents:

```csv title="dummy.csv"
"title","categoryId"
"dummy title 1","3"
"dummy title 2","44"
```

This file should be parsed as:

```ts
[
    {
        title: "dummy title 1",
        categoryId: "3",
    },
    {
        title: "dummy title 2",
        categoryId: "44",
    }
]
```

### With `<ImportButton>` (Recommended)

```tsx
import {
    List,
    Table,
    useTable,
// highlight-start
    useImport,
    ImportButton,
// highlight-end
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

// highlight-next-line
    const importProps = useImport<IPostFile>();

    return (
        <List
            pageHeaderProps={{
// highlight-next-line
                extra: <ImportButton {...importProps} />,
            }}
        >
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column dataIndex="status" title="Status" />
            </Table>
        </List>
    );
};

interface IPostFile {
    title: string;
    categoryId: string;
}

interface IPost {
    id: number;
    title: string;
    status: string;
}
```

[`<ImportButton`][ImportButton] accepts two properties: `buttonProps` and `uploadProps`. It just wraps [`<Button>`][Button] component with the [`<Upload>`][Upload] component to reduce some boilerplate code.

<br />

### With Ant Design's `<Upload>` and `<Button>` Components

```tsx
import {
    List,
    Table,
    useTable,
// highlight-start
    useImport,
    Button,
    Icons,
    Upload,
// highlight-end
} from "@pankod/refine-antd";

const { ImportOutlined } = Icons;

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

// highlight-next-line
    const { buttonProps, uploadProps } = useImport<IPostFile>();

    return (
        <List
// highlight-start
            pageHeaderProps={{
                extra: (
                    <Upload {...uploadProps}>
                        <Button icon={<ImportOutlined />} {...buttonProps}>
                            Import
                        </Button>
                    </Upload>
                ),
            }}
// highlight-end
        >
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
            </Table>
        </List>
    );
};
```

This usage is open to further customizations of Ant Design's [`<Button>`][Button] and [`<Upload>`][Upload] components.

<br />

In both examples, when user clicks the import buttons and selects a `CSV` file, `useImport` parses the content with [papaparse][papaparse], creates the resources one by one or as batches (depending on the configuration). Which endpoint to create the given resource is inferred from the current route.

Resources are added one by one ([`useCreate`][useCreate]) or as batches ([`useCreateMany`][useCreateMany]) if explicitly configured with [`batchSize`](#useimport-options) option. By default, `batchSize` is 1.

:::caution
If `batchSize` is more than 1, `createMany` method should be implemented in `DataProvider`.  
[Refer to DataProvider documentation for further information about importing the default css. &#8594][DataProvider]
:::

<br />

### Handling Relational Data

In some cases, you might want to change/process the data of `CSV` file after parsing. Example cases of this requirement: your data contains relational data and references to data in other places, your backend API requires your data to be sent in a specific format. You can further customize `useImport` to achieve this.

Assume this is the `CSV` file we want to create resources from:

```csv title="dummy.csv"
"title","content","status","categoryId","userId"
"dummy title 1","dummy content 1","rejected","3","8"
"dummy title 2","dummy content 2","draft","44","8"
"dummy title 3","cummy content 3","published","41","10"
```

Since `user` and `category` are relational fields, we shouldn't store them as objects. Instead, we should keep only their `id` fields in our exported files. And `CSV` format doesn't support JSON data, we stored `category.id` as `categoryId` and `user.id` as `userId`.

When creating these resources back, we should map it back to our backend API's required format. `mapData` option allows us to do this. Here is an example:

```ts
const importProps = useImport<IPostFile>({
    mapData: (item) => {
        return {
            title: item.title,
            content: item.content,
            status: item.status,
            category: {
                id: item.categoryId,
            },
            user: {
                id: item.userId,
            },
        };
    },
});

interface IPostFile {
    title: string;
    status: string;
    content: string;
    categoryId: string;
    userId: number;
}
```
Now, parsed data is mapped to conform our APIs requirements.

## API Reference

### Properties

| Key                 | Description                                                                                                                                                                                                                                          | Type                                                                                                                    | Default                                                                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| resourceName        | Default resource name this button imports to. Inferred from route by default.                                                                                                                                                                        | `string`                                                                                                                |
| mapData             | A mapping function that runs for every record. Mapped data will be included in the request payload.                                                                                                                                                  | `(value: any, index?: number, array?: any[], data?: any[][]): any;`                                                     |
| papaparseOptions    | Custom Papa Parse options.                                                                                                                                                                                                                           | [`ParseConfig`][papaparse]                                                                                              |
| batchSize           | Requests batch size. If it is 1, all records are sent one by one. By default, it is [`Number.MAX_SAFE_INTEGER`][Number.MAX_SAFE_INTEGER] to send all records in one batch. If it is more than 1, `createMany` should be implemented on DataProvider. | `number`                                                                                                                |
| onFinish            | Called with errors and successful responses when all requests are sent.                                                                                                                                                                              | `(results: { succeeded: ImportSuccessResult<TVariables, TData>[]; errored: ImportErrorResult<TVariables>[]; }) => void` |
| successNotification | Successful Mutation notification                                                                                                                                                                                                                     | [`SuccessErrorNotification`][SuccessErrorNotification]                                                                  | "Successfully created `resource`"                                                                                                          |
| errorNotification   | Unsuccessful Mutation notification                                                                                                                                                                                                                   | [`SuccessErrorNotification`][SuccessErrorNotification]                                                                  | "There was an error while creating `resource` (status code: `statusCode`)" or "Error when updating `resource` (status code: `statusCode`)" |
| metaData            | Metadata query for `dataProvider`                                                                                                                                                                                                                    | [`MetaDataQuery`](/core/interfaces.md#metadataquery)                                                        | {}                                                                                                                                         |

### Return Values

| Property       | Description                                                     | Type                                                                                                                                                                                                                                                                                             |
| -------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| uploadProps    | Props to pass to Ant Design's `<Upload>` component              | [`<Upload>`][Upload]                                                                                                                                                                                                                                                                             |
| buttonProps    | Props to pass to Ant Design's `<Button>` component              | [`<Button>`][Button]                                                                                                                                                                                                                                                                             |
| mutationResult | Result of the mutation/mutations of creating imported resources | [`UseMutationResult<`<br/>`{ data: TData },`<br/>`TError,`<br/>`  { resource: string; values: TVariables; },`<br/>` unknown>`][useMutation])  \| [`UseMutationResult<`<br/>`{ data: TData[]},`<br/>`TError,`<br/>`  { resource: string; values: TVariables[]; },`<br/>` unknown>`][useMutation]) |

### Type Parameters

| Property   | Desription                                                                 | Default                    |
| ---------- | -------------------------------------------------------------------------- | -------------------------- |
| TItem      | Interface of parsed csv data                                               | `any`                      |
| TData      | Result type of the data query type that extends [`BaseRecord`][BaseRecord] | [`BaseRecord`][BaseRecord] |
| TError     | Custom error object that extends [`HttpError`][HttpError]                  | [`HttpError`][HttpError]   |
| TVariables | Values for mutation function                                               | `any`                      |

[Button]: https://ant.design/components/button/
[Upload]: https://ant.design/components/upload/
[ImportButton]: /ui-frameworks/antd/components/buttons/import.md
[useCreate]: /core/hooks/data/useCreate.md
[useCreateMany]: /core/hooks/data/useCreateMany.md
[DataProvider]: /core/providers/data-provider.md
[BaseRecord]: /core/interfaces.md#baserecord
[HttpError]: /core/interfaces.md#httperror
[papaparse]: https://www.papaparse.com/docs
[useMutation]: https://react-query.tanstack.com/reference/useMutation
[Number.MAX_SAFE_INTEGER]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
[SuccessErrorNotification]: /core/interfaces.md#successerrornotification
