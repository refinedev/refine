---
id: useTable
title: useTable
---

By using `useTable`, you are able to get properties such as sorting, filtering and pagination. These properties allow us to fetch our data as we wish.

Lets say you have a endpoint that returns the following data:

```json title="https://api.fake-rest.refine.dev/posts"
[
    {
        "id": 182,
        "title": "A aspernatur rerum molestiae.",
        "content": "Natus molestias incidunt voluptatibus. Libero delectus facilis...",
        "status": "published"
    },
    {
        "id": 989,
        "title": "A molestiae vel voluptatem enim.",
        "content": "Voluptas consequatur quia beatae. Ipsa est qui culpa deleniti...",
        "status": "draft",
        "createdAt": "2020-01-28T02:57:58.892Z"
    }
]
```

## Basic Usage

In basic usage `useTable` returns the same value as the `queryResult` of [`useList`](#).

```tsx
import { useTable } from "@pankod/core";

interface IPost {
    id: string;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
}

const { tableQueryResult } = useTable<IPost>({
    resource: "posts",
});
```

## Pagination

`useTable` has a pagination feature. The pagination is done by using the `current` and `pageSize` props. The `current` is the current page and the `pageSize` is the number of items per page. 

By default, the `current` is 1 and the `pageSize` is 10. You can change inital values by passing the `initialCurrent` and `initialPageSize` props to the `useTable` hook.

You can also change the `current` and `pageSize` values in the `useTable` hook by using the `setCurrent` and `setPageSize` functions. Every change will trigger a new fetch.

```tsx
import { useTable } from "@pankod/core";

const { pageSize, setPageSize, current, setCurrent } = useTable({
    resource: "posts",
    initialCurrent: 1,
    initialPageSize: 10,
});

console.log(pageSize); // 10
console.log(current); // 1

setPageSize(20);
console.log(pageSize); // 20

setCurrent(2);
console.log(current); // 2
```



## Sorter

## Filter


