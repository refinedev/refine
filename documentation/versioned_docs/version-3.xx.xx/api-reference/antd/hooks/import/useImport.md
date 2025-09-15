---
id: useImport
title: useImport
---

`useImport` hook allows you to import data from a `CSV` file. For each row in the file, it calls the `create` or `createMany` method of your data provider according to your configuration.

Internally, it uses [Papa Parse][papaparse] to parse the file contents.

It will return properties that are compatible with Ant Design [`<Upload>`](https://ant.design/components/upload/) and [`<Button>`](https://ant.design/components/button/) components.

:::info
`useImport` hook is extended from [`useImport`][use-import-core] hook from the [`@pankod/refine-core`](https://github.com/refinedev/refine/tree/v3/packages/core) package. This means that you can use all the features of [`useImport`][use-import-core] hook.
:::

## Basic Usage

Here is a basic usage example of `useImport` hook:

```tsx
import { useImport, ImportButton } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
  const importProps = useImport();

  return <ImportButton {...importProps}>Import</ImportButton>;
};
```

[Refer to the `<ImportButton>` interface for more information &#8594](/docs/3.xx.xx/api-reference/antd/components/buttons/import-button/)

Also, you can use the `inputProps` and `uploadProps` properties without the `<ImportButton>` component for more customization:

```tsx
import { useImport, Upload, Button } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
  const { buttonProps, uploadProps } = useImport();

  return (
    <Upload {...uploadProps}>
      <Button {...buttonProps}>Import</Button>
    </Upload>
  );
};
```

## Properties

### `resourceName`

> Default: It reads the `resource` value from the current URL.

Determines which resource is passed to the `create` or `createMany` method of your data provider.

```ts
useImport({
  resourceName: "posts",
});
```

### `mapData`

If you want to map the data before sending it to a data provider method, you can use the `mapData` property.

```ts
useImport({
  mapData: (data) => ({
    ...data,
    category: {
      id: data.categoryId,
    },
  }),
});
```

### `paparseOptions`

You can pass any Papa Parse [options](https://www.papaparse.com/docs#config) to the `paparseOptions` property.

```ts
useImport({
  paparseOptions: {
    header: true,
  },
});
```

### `batchSize`

> Default: [`Number.MAX_SAFE_INTEGER`][number.max_safe_integer]

If you want to send the data in batches, you can use the `batchSize` property. When the `batchSize` is 1, it calls the `create` method of your data provider for each row in the file. When the `batchSize` is greater than 1, it calls the `createMany` method of your data provider for each batch.

```ts
useImport({
  batchSize: 1,
});
```

### `onFinish`

If you want to do something after the import is finished, you can use the `onFinish` property. It returns an object with two properties: `succeeded` and `errored` which contain the responses of the successful and failed requests.

```ts
useImport({
  onFinish: (result) => {
    // success requests response
    result.succeeded.forEach((item) => {
      console.log(item);
    });

    // failed requests response
    result.errored.forEach((item) => {
      console.log(item);
    });
  },
});
```

### `metaData`

If you want to send additional data to the `create` or `createMany` method of your data provider, you can use the `metaData` property.

```ts
useImport({
  metaData: {
    foo: "bar",
  },
});
```

### `onProgress`

A callback function that is called when the import progress changes. It returns an object with two properties: `totalAmount` and `processedAmount` which contain the total amount of rows and the processed amount of rows.

```ts
useImport({
  onProgress: ({ totalAmount, processedAmount }) => {
    // progress percentage
    console.log((processedAmount / totalAmount) * 100);
  },
});
```

By default, it shows a notification with the progress percentage. You can override this behavior by passing a custom `onProgress` function.

### `dataProviderName`

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have a different data provider for different resources.

```tsx
useImport({
  dataProviderName: "second-data-provider",
});
```

## Return Values

### `buttonProps`

Button properties that are compatible with Ant Design [`<Button>`](https://ant.design/components/button/) component.

```tsx
import { useImport, Button } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
  const { buttonProps } = useImport();

  return <Button {...buttonProps}>Import</Button>;
};
```

#### `type`

It is set to `default` by default.

#### `loading`

If the import is in progress, it sets the loading state of the button.

### `uploadProps`

Upload properties that are compatible with Ant Design [`<Upload>`](https://ant.design/components/upload/) component.

```tsx
import { useImport, Upload } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
  const { uploadProps } = useImport();

  return <Upload {...uploadProps}>Import</Upload>;
};
```

#### `onChange`

Handles the file upload.

#### `beforeUpload`

By default, `() => false` is set to prevent the file from being uploaded automatically.

#### `showUploadList`

By default, `false` is set to hide the upload list.

#### `accept`

By default, `".csv"` is set to accept only CSV files.

### `isLoading`

It is a boolean value that indicates whether the import is in progress.

### `mutationResult`

Result of the [`useCreate`](/docs/3.xx.xx/api-reference/core/hooks/data/useCreate/) or [`useCreateMany`](/docs/3.xx.xx/api-reference/core/hooks/data/useCreateMany/) method of your data provider.

## FAQ

### Handling Relational Data

Sometimes you need to process your parsed `CSV` data for certain cases, such as when your data includes relational data and references to other data, or when your backend API requires a specific data format. To handle this, you can use the `mapData` option in `useImport` to customize the process.

For example, the `CSV` file is as follows:

```csv title="dummy.csv"
"title","content","status","categoryId","userId"
"dummy title 1","dummy content 1","rejected","3","8"
"dummy title 2","dummy content 2","draft","44","8"
"dummy title 3","cummy content 3","published","41","10"
```

Since the user and category are relational fields, we store only their id fields in the exported file as userId and categoryId respectively. To create resources from this file, we need to map the data back to the required format of the backend API. To do this, we use the mapData option in useImport. Here's an example:

When creating these resources back, we should map it back to our backend API's required format. `mapData` option allows us to do this. Here is an example:

```ts
useImport<IPostFile>({
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
  userId: string;
}
```

With this code, the parsed data will be mapped to conform to the API requirements.

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/useImport"/>

### Return Values

| Property       | Description                                                            | Type                                                                                                                                                                                                                                                                                          |
| -------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| buttonProps    | Properties that are compatible with Ant Design `<Button>` component    | [`ButtonProps`](#buttonprops)                                                                                                                                                                                                                                                                 |
| uploadProps    | Properties that are compatible with Ant Design `<Upload>` component    | [`UploadProps`](#uploadprops)                                                                                                                                                                                                                                                                 |
| isLoading      | It can be used to handle the `loading` status for the Import operation | `boolean`                                                                                                                                                                                                                                                                                     |
| mutationResult | Result of the mutation/mutations of creating imported resources        | [`UseMutationResult<`<br/>`{ data: TData },`<br/>`TError,`<br/>` { resource: string; values: TVariables; },`<br/>` unknown>`][usemutation]) \| [`UseMutationResult<`<br/>`{ data: TData[]},`<br/>`TError,`<br/>` { resource: string; values: TVariables[]; },`<br/>` unknown>`][usemutation]) |

### Type Parameters

| Property   | Desription                                                                 | Default                    |
| ---------- | -------------------------------------------------------------------------- | -------------------------- |
| TItem      | Interface of parsed csv data                                               | `any`                      |
| TData      | Result type of the data query type that extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError     | Custom error object that extends [`HttpError`][httperror]                  | [`HttpError`][httperror]   |
| TVariables | Values for mutation function                                               | `any`                      |

[button]: https://ant.design/components/button/
[upload]: https://ant.design/components/upload/
[importbutton]: /api-reference/antd/components/buttons/import.md
[usecreate]: /docs/3.xx.xx/api-reference/core/hooks/data/useCreate/
[usecreatemany]: /docs/3.xx.xx/api-reference/core/hooks/data/useCreateMany/
[dataprovider]: /api-reference/core/providers/data-provider.md
[baserecord]: /api-reference/core/interfaces.md#baserecord
[httperror]: /api-reference/core/interfaces.md#httperror
[papaparse]: https://www.papaparse.com/docs
[usemutation]: https://tanstack.com/query/v4/docs/framework/react/reference/useMutation
[number.max_safe_integer]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
[successerrornotification]: /api-reference/core/interfaces.md#successerrornotification
[use-import-core]: /docs/3.xx.xx/api-reference/core/hooks/import-export/useImport/
