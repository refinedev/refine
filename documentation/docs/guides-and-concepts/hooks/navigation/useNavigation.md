---
id: useNavigation
title: useNavigation
---

`useNavigation` is a modified version of `useHistory` from [react-router-dom](https://reactrouter.com/web/api/Hooks/usehistory). It also helps refine's crud pages navigations.

```tsx
const { create, edit, clone, show, list, push, replace, goBack } = useNavigation();
```


### Usage
Let's show how we can use `edit`.

```tsx
import { Button } from "antd";
//highlight-next-line
import { useNavigation } from "@hooks";

export const MyEditButton = () => {

    //highlight-next-line
    const { edit } = useNavigation();

    return (
        <Button
            onClick={(): void =>
                //highlight-next-line
                edit("posts", "push", "1")
            }
        >
            Navigate to Edit Page
        </Button>
    );
};
```

Clicking the button will trigger the edit method of useNavigation and then redirect the app to `/resources/posts/edit/1` 



- `resource` is used to redirect the app to the given resource name.
- `type` is used to set [navigation type](#interface).
- `id` is used to append the record id to the end of the path.


## API Reference

### Properties
| Property                                          | Description                                 | Type                      | Default  |
| ------------------------------------------------- | ------------------------------------------- | ------------------------- | -------- |
| resource <div className="required">Required</div> | Redirect the app to the given resource name | `string`                  |          |
| type                                              | It is React Router history types            | [HistoryType](#interface) | `"push"` |
| id                                                | It is used to append to the end of the path | `string`                  |          |

### Return values

| Property | Description                                     | Type                                                                         |
| -------- | ----------------------------------------------- | ---------------------------------------------------------------------------- |
| create   | Navigate to `create page` of your resource      | `(resource: string, type:` [HistoryType](#interface) `) => void `            |
| list     | Navigate to `list page` of your resource        | `(resource: string, type:` [HistoryType](#interface) `) => void`             |
| edit     | Navigate to `edit page` of your resource        | `(resource: string, type:` [HistoryType](#interface) `, id: string) => void` |
| clone    | Navigate to `clone page` of your resource       | `(resource: string, type:` [HistoryType](#interface) `, id: string) => void` |
| show     | Navigate to `show page` of your resource        | `(resource: string, type:` [HistoryType](#interface) `, id: string) => void` |
| push     | Pushes a new entry onto the history stack       | `(path: string, state?: unknown ) => void`                                   |
| replace  | Replaces the current entry on the history stack | `(path: string, state?: unknown ) => void`                                   |
| goBack   | Equivalent to go previous stack                 | `() => void`                                                                 |



#### Interface


```tsx title="History Type"
 export type HistoryType = "push" | "replace";
```
