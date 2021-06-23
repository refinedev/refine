---
id: csv-export
title: CSV Export
---

With refine, you can easily add a customizable csv export button for any resource.

You can add an `<ExportButton>` on a list page, optionally with a mapping function to transform the data into csv file data.

Let's look at an example of adding a custom `<ExportButton>`.

## Example

Add an `extra` area on `<List>` component to show `<ExportButton>`:

```tsx title="pages/posts/list.tsx"
import {
    //highlight-next-lne
    ExportButton,
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
    ...

    //highlight-start
    const Actions = () => (
        <Space direction="horizontal">
            <ExportButton />
        </Space>
    );
    //highlight-end

    return (
        //highlight-start
        <List pageHeaderProps={{
            extra: <Actions />,
        }}>
        //highlight-end
    ...
```

Now you can export its data. If you click and download it, in our example, this is how the `csv` file contents might look like:

```csv
"id","title","slug","content","category","user","status","createdAt","image","tags","language"
"1000","dummy title 1","mollitia-non-vero","...","[object Object]","[object Object]","published","2020-03-08T18:28:39.044Z","","3","3"
"999","dummy title 2","optio-a-et","...","[object Object]","[object Object]","rejected","2020-08-02T02:15:42.083Z","","2","1"
"998","dummy title 3","fugit-quisquam-qui","...","[object Object]","[object Object]","published","2021-03-22T05:21:56.906Z","","1,6,4","1"
...
```

Notice the values of `category` and `user`: `[object Object]`. Since the values of `category` and `user` are objects, they are serialized into this value. They are also relational values and we might not want to include all of their data - except their id values. There may also be values that we don't want to include in our exported files at all.

To solve such problems, we have `mapData` prop. Before save, we can map and shape the data as we want:

```tsx
<ExportButton
    mapData={(item: IPost) => {
        return {
            id: item.id,
            title: item.title,
            slug: item.slug,
            content: item.content,
            status: item.status,
            categoryId: item.category.id,
            userId: item.user?.id,
        };
    }}
/>
```

This button would export a `csv` file like this:

```csv
"id","title","slug","content","status","categoryId","userId"
"1001","dummy title 1","","...","published","50",""
"1000","dummy title 2","sed-dicta-est","...","rejected","11","38"
"999","dummy title 3","dolores-magni-atque","...","published","7","4"
...
```

In this mapping function, we didn't include `image` field in the file. We also exchanged `category` and `user` objects with their ids (`categoryId` and `userId`). In the future, if we wanted to import them back again, we'll be able to use these id values to build relationships.

## `<ExportButton>` props

| Key          | Description                                                                                         | Type                                                                                                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| resourceName | Default resource name this button exports from. Inferred from route by default.                     | `string`                                                                                                                                                                             |
| sorter       | Sorter configuration for exported data.                                                             | [`CrudSorting`](../../api-references/interfaces.md#crudsorting)                                                                                                                                           |
| filters      | Filter configuration for exported data.                                                             | [`CrudFilters`](../../api-references/interfaces.md#crudfilters)                                                                                                                                           |
| maxItemCount | Maximum number of items to export.                                                                  | `number`                                                                                                                                                                             |
| pageSize     | Number of items per request to fetch while building the exported file.                              | `number`                                                                                                                                                                             |
| mapData      | A mapping function that runs for every record. Mapped data will be included in the request payload. | (value: [`BaseRecord`](../../api-references/interfaces.md#baserecord), index?: number, array?: [`BaseRecord`](../../api-references/interfaces.md#baserecord)[], data?: unknown[][]): [`BaseRecord`](../../api-references/interfaces.md#baserecord); |
| csvProps     | Various options for how to build exported file.                                                     | [`CSVDownloadProps`](#)                                                                                                                                                              |
