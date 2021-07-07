---
id: useExport
title: useExport
---

`useExport` hook allows you to make your resources exportable.

This hook accepts [`export-to-csv`][export-to-csv]'s options to create `csv` files.

```ts
const { triggerExport, loading } = useExport(options);
```

## Usage

Suppose we have this endpoint:

```json title="https://api.fake-rest.refine.dev/posts"
[
    {
        "id": 1,
        "title": "Tempora nesciunt sunt temporibus.",
        "slug": "quisquam-in-dolore",
        "content": "Id qui nostrum hic nostrum voluptatem...",
        "status": "rejected",
    },
    {
        "id": 2,
        "title": "Omnis est quis reiciendis blanditiis.",
        "slug": "deleniti-voluptas-tempore",
        "content": "Laudantium eos ut consequuntur dignissimos...",
        "status": "published",
    },
    ...
]
```

To enable export functionality for this endpoint, we can use `useExport` hook to create an export button.

```tsx title="src/pages/posts/list.tsx"
import {
    List,
    Table,
    useTable,
    //highlight-start
    useExport,
    ExportButton,
    //highlight-end
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    //highlight-next-line
    const { triggerExport, loading } = useExport<IPost>();

    return (
        <List
            pageHeaderProps={{
                extra: (
                    //highlight-next-line
                    <ExportButton onClick={triggerExport} loading={loading} />
                ),
            }}
        >
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column key="title" dataIndex="title" title="Title" />
            </Table>
        </List>
    );
};
```

```ts title="interfaces.d.ts"
export interface IPost {
    id: string;
    title: string;
    content: string;
    slug: string;
    status: "published" | "draft" | "rejected";
}
```

:::info
In examples, instead of [`<Button>`][Button], [`<ExportButton>`][ExportButton] is used. [`<ExportButton>`][ExportButton] is nothing more than a default Ant Design [`<Button>`][Button] with an icon and a default text.  

[Refer to ExportButton docs for more detailed information. &#8594][ExportButton]
:::
<br />
When the user clicks the button, `triggerExport` fetches all the data in the resource and downloads it as a `csv` file with these contents:

```csv title="Posts-2021-06-29-14-40-14.csv"
id,title,slug,content,status,categoryId,userId
1,"Tempora nesciunt sunt temporibus.","quisquam-in-dolore","Id qui nostrum hic nostrum voluptatem...","rejected",2,1
2,"Omnis est quis reiciendis blanditiis.","deleniti-voluptas-tempore","Laudantium eos ut consequuntur dignissimos...","published",24,39
...
```

### Handling Relational Data

You can run a mapping function for all entries before they are saved. This is useful in cases of requirement of referencing relational data, saving files in a specific way to process them in different applications etc. This mapping function is similar to the mapping function of [`useImport`][useImport#handling-relational-data].

Assume we have this endpoint with some relational data:

```json
[
 {
    "id": 2,
    "title": "Et architecto et aut ex.",
    "slug": "dolorum-et-quia",
    "content": "Reprehenderit qui voluptatem in cum qui odio et.",
    "category": {
      "id": 35
    },
    "user": {
      "id": 10
    },
    "status": "published",
  },
  {
    "id": 3,
    "title": "Quam maiores officia suscipit quia vel asperiores nisi non excepturi.",
    "slug": "delectus-laborum-provident",
    "content": "Placeat eos esse.",
    "category": {
      "id": 4
    },
    "user": {
      "id": 50
    },
    "status": "published",
  },
  ...
]
```

We have `category` and `user` fields as possible relational data keys. Their data is out of responsibility of this export operation. We want to save their id's without any other related data. It may be required to export and backup those entities separately.

We can save `category.id` as `categoryId` and `user.id` as `userId`. Thus using a mapping function that looks like this:

```ts
const { triggerExport, loading } = useExport<IPost>({
    mapData: (item) => {
        return {
            id: item.id,
            title: item.title,
            slug: item.slug,
            content: item.content,
            status: item.status,
            categoryId: item.category.id,
            userId: item.user?.id,
        };
    },
});
```

Such an `IPost` may should work fine:

```ts
export interface ICategory {
    id: string;
    title: string;
}

export interface IUser {
    id: string;
}

export interface IPost {
    id: string;
    title: string;
    content: string;
    slug: string;
    status: "published" | "draft" | "rejected";
    category: ICategory;
    user: IUser;
}
```

This is all you need to handle mapping.

:::tip
You can pass more options to further customize exporting process.  
[Refer to export-to-csv docs for more detailed information. &#8594][export-to-csv]
:::

## API Reference

### `useExport` Options

| Key           | Description                                                                                                                | Type                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| resourceName  | Default resource name this button imports to. Inferred from route by default                                               | `string`                                                                         |
| mapData       | A mapping function that runs for every record. Mapped data will be included in the file contents                           | `<TItem, TVariables>(item: TItem, index?: number, items?: TItem[]): TVariables;` |
| pageSize      | Requests to fetch data are made as batches by page size. By default, it is 20. Used for `getList` method of `DataProvider` | `number`                                                                         |
| sorter        | Sort records                                                                                                               | [`CrudSorting`][CrudSorting] \| `undefined`                                      |  |
| filter        | Filter records                                                                                                             | [`CrudFilters`][CrudFilters] \| `undefined`                                      |  |
| exportOptions | Exporting options                                                                                                          | [`Options`][export-to-csv#api] \| `undefined`                                      |  |

### `useExport` Return Values

| Key           | Description                                                                                                                | Type                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| loading  | Default resource name this button imports to. Inferred from route by default                                               | `boolean`                                                                         | `false`
| triggerExport       | When invoked, starts the exporting process                           | `async () => void` |

[Button]: https://ant.design/components/button/
[ExportButton]: api-references/components/buttons/export.md
[useImport]: api-references/hooks/import-export/useImport.md
[useImport#handling-relational-data]: api-references/hooks/import-export/useImport.md#handling-relational-data
[export-to-csv]: https://github.com/alexcaza/export-to-csv
[export-to-csv#api]: https://github.com/alexcaza/export-to-csv#api
[CrudSorting]: /api-references/interfaces.md#crudsorting
[CrudFilters]: /api-references/interfaces.md#crudfilters
