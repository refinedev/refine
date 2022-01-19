---
id: csv-import
title: CSV Import
---

import importButton from '@site/static/img/guides-and-concepts/csv-import/import-button.png';
import importing from '@site/static/img/guides-and-concepts/csv-import/importing.gif';

You can easily import CSV files for any resource by using **refine**'s customizable `useImport` hook, optionally with `<ImportButton>` component. `useImport` hook returns the necessary props for `<ImportButton>` component. **refine** uses [Papa Parse][Papa Parse] parser under the hood to parse CSV files.

You can call the `useImport` hook and add an `<ImportButton>` with properties returned from `useImport` on a list page, configured with a mapping function to format the files data into API's data. When the button gets triggered, it creates the imported resources using [`create`][create] or [`createMany`][createMany] [dataProvider][dataProvider] methods under the hood.

## Usage

Let's look at an example of adding a custom import button:

```tsx  title="pages/posts/list.tsx"
import {
    List,
    useTable,
    useMany,
// highlight-start
    useImport,
    ImportButton,
// highlight-end
} from "@pankod/refine";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

// highlight-next-line
    const importProps = useImport<IPostFile>();

    return (
        <List
// highlight-start
            pageHeaderProps={{
                extra: <ImportButton {...importProps} />,
            }}
// highlight-end
        >
            ...
        </List>
    );
};

interface ICategory {
    id: string;
    title: string;
}

interface IPostFile {
    id: string;
    title: string;
    content: string;
    userId: number;
    categoryId: number;
    status: "published" | "draft" | "rejected";
}

interface IPost {
    id: string;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: ICategory;
}
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={importButton} alt="Import button" />
</div>
<br />

We should map CSV data into `Post` data. Assume that this is the CSV file content we have:

```csv title="dummy.csv"
"title","content","status","categoryId","userId"
"dummy title 1","dummy content 1","rejected","3","8"
"dummy title 2","dummy content 2","draft","44","8"
"dummy title 3","cummy content 3","published","41","10"
```

It has 3 entries. We should map `categoryId` to `category.id` and `userId` to `user.id`. Since these are objects, we store any relational data as their id in CSV.

This would make our `useImport` call look like this:

```tsx  title="/src/pages/posts/list.tsx"
export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

// highlight-start
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
// highlight-end

    return <></>;
}
```

And it's done. When you click on the button and provide a CSV file of the headers `"title"`,`"content"`,`"status"`,`"categoryId"` and `"userId"`, it should be mapped and imported. Mapped data is the request payload. Either as part of an array or by itself as part of every request. In our example, it fires `POST` request/requests like this:

```json title="POST https://api.fake-rest.refine.dev/posts"
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

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={importing} alt="Importing CSV" />
</div>
<br />

Depending on the [`batchSize`][batchSize] option, posts can get sent one by one or as batches. By default, all records are sent in one [`createMany`][createMany] call.

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-import-export-example-4nneu?autoresize=1&fontsize=14&theme=dark&view=preview"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="refine-import-export-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


[Papa Parse]: https://www.papaparse.com/
[batchSize]: /api-references/hooks/import-export/useImport.md#api-reference
[dataProvider]: /api-references/providers/data-provider.md
[create]: /api-references/providers/data-provider.md#create
[createMany]: /api-references/providers/data-provider.md#createmany