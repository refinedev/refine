---
id: csv-import
title: CSV Import
---

import importButton from '@site/static/img/import-button.png';

You can easily import csv files for any resource by using refine' s  customizable `<ImportButton>` component.  refine uses [paparse](https://www.papaparse.com/) parser under the hood to parse csv files.

You can add an `<ImportButton>` on a list page with a mapping function to format the files data into API's data. It creates the imported resources, using `create` or `createMany` data provider methods under the hood.

Resources are added as one by one (`create`) or as batch (`createMany`) if explicitly configured with [`batchSize`](#importbutton-props) option. By default, `batchSize` is 1. If it is more than 1, createMany should be implemented on DataProvider.

Let's look at an example of adding a custom `<ImportButton>`.

## Example

Add an `extra` area on `<List>` component to show `<ImportButton>`.

```tsx title="/src/pages/posts/list.tsx"
import {
    List,
    Table,
    TextField,
    useTable,
    useMany,
    Space,
    EditButton,
    ShowButton,
    ImportButton,
} from "@pankod/refine";

import { IPost, ICategory, IPostFile } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>("categories", categoryIds, {
        enabled: categoryIds.length > 0,
    });

    const Actions = () => (
        <Space direction="horizontal">
            <ImportButton />
        </Space>
    );

    return (
        <List
            {...props}
            //highlight-start
            pageHeaderProps={{
                extra: <Actions />,
            }}
            //highlight-end
        >
            ...
};
```

```tsx title="/src/interfaces/index.d.ts"
export interface ICategory {
    id: string;
    title: string;
}

export interface IPostFile {
    id: string;
    title: string;
    content: string;
    userId: number;
    categoryId: number;
    status: "published" | "draft" | "rejected";
}

export interface IPost {
    id: string;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: ICategory;
}
```

<div style={{textAlign: "center"}}>
    <img src={importButton} />
</div>
<br/>

We should map csv data into `Post` data. Assume that this is the csv file content we have:

```csv title="dummy.csv"
"title","content","status","categoryId","userId"
"dummy title 1","dummy content 1","rejected","3","8"
"dummy title 2","dummy content 2","draft","44","8"
"dummy title 3","cummy content 3","published","41","10"
```

It has 3 entries. We should map `categoryId` to `category.id` and `userId` to `user.id`. Since these are objects, we store any relational data as their id in CSV.

This would make our `<ImportButton>` look like this:

```tsx title="/src/pages/posts/list.tsx"
export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>("categories", categoryIds, {
        enabled: categoryIds.length > 0,
    });

    const Actions = () => (
        <Space direction="horizontal">
            <ImportButton
                //highlight-start
                mapData={(item: IPostFile) => {
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
                }}
                //highlight-end
            />
        </Space>
    );

    ...
};
```

And it's done. When you click on the button and provide a csv file of the headers `"title","content","status","categoryId","userId"`, it should be mapped and imported. Mapped data is the request payload. Either as part of an array or by itself as part of every request. In our example, it fires 4 `POST` requests like this:

```json title="POST https://refine-fake-rest.pankod.com/posts"
{
    "title": "dummy title 1",
    "content": "dummy content 1",
    "status": "rejected",
    "category": {
        "id": "3"
    },
    "user": {
        "id": "8"
    }
}
```

## `<ImportButton>` Props

| Key            | Description                                                                                                        | Type                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| resourceName   | Default resource name this button imports to. Inferred from route by default.                                      | `string`                                                            |
| mapData        | A mapping function that runs for every record. Mapped data will be included in the request payload.                | `(value: any, index?: number, array?: any[], data?: any[][]): any;` |
| paparseOptions | Custom Papa Parse options.                                                                                         | [`ParseConfig`](https://www.papaparse.com/docs)                     |
| batchSize      | Request batch size. By default, it is 1. If it is more than 1, `createMany` should be implemented on DataProvider. | `number`                                                            |
