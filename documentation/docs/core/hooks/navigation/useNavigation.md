---
id: useNavigation
title: useNavigation
---

**refine** uses [`routerProvider`][routerProvider] and comes with all redirects out of the box. It allows you to manage your routing operations in refine. Using this hook, you can manage all the routing operations of your application very easily.

```tsx 
import { useNavigation } from "@pankod/refine-core";

const { create, edit, clone, show, list, push, replace, goBack } = useNavigation();
```

:::tip
`useNavigation` uses the `useHistory` of the [`routerProvider`][routerProvider].
:::

### Usage

We will make a button for each method to use.

## List

Let's imagine that we have a post list and we want to be redirected to this page. To do this we will use the list hook.

```tsx
import {
// highlight-next-line
    useNavigation,
} from "@pankod/refine-core";

export const MyListButton = () => {
// highlight-next-line
    const { list } = useNavigation();

    return (
        <button
            onClick={(): void =>
// highlight-next-line
                list("posts")
            }
        >
            Navigate to Post List Page
        </button>
    );
};
```

### Create

If we want to go to the post creation page to create a new post, we can use the create hook.

```tsx
import {
// highlight-next-line
    useNavigation,
} from "@pankod/refine-core";

export const MyCreateButton = () => {
// highlight-next-line
    const { create } = useNavigation();

    return (
        <button
            onClick={(): void =>
// highlight-next-line
                create("posts")
            }
        >
            Navigate to Create Page
        </button>
    );
};
```

### Edit

Let's see what we should do if we want to go to the editing page of one of our posts.

```tsx
import {
// highlight-next-line
    useNavigation,
} from "@pankod/refine-core";

export const MyEditButton = () => {
// highlight-next-line
    const { edit } = useNavigation();

    return (
        <button
            onClick={(): void =>
// highlight-next-line
                edit("posts", "1")
            }
        >
            Navigate to Edit Page
        </button>
    );
};
```

We used the `edit` to navigate to the post edit page, but you can see the differences in using it. `edit` requires the id property from us and clicking the button will trigger the edit method of useNavigation and then redirect the app to `/posts/edit/1`

:::caution Attention
There is something we should pay attention to here. We need to give the `id` of which post we want to edit.
:::

:::tip
You can also give a `type` property to the methods. You can look here to see the [properties.](#properties)
:::

### Show

If you want to show the detail of your posts you can use show and you need `id` for show.

```tsx
import {
// highlight-next-line
    useNavigation,
} from "@pankod/refine-core";

export const MyShowButton = () => {
// highlight-next-line
    const { show } = useNavigation();

    return (
        <button
            onClick={(): void =>
// highlight-next-line
                show("posts", "1")
            }
        >
            Navigate to Show Page
        </button>
    );
};
```

:::caution Attention
There is something we should pay attention to here. We need to give the `id` of which post we want to show.
:::

:::tip
If you want to return to previous page. You can use `goBack` hook.
:::

### Clone

If we have the resources to clone a post and we want to go to this page, we will use `clone` with a record id.

```tsx
import {
// highlight-next-line
    useNavigation,
} from "@pankod/refine-core";

export const MyCloneButton = () => {
// highlight-next-line
    const { clone } = useNavigation();

    return (
        <button
            onClick={(): void =>
// highlight-next-line
                clone("posts", "1")
            }
        >
            Navigate to Clone Page
        </button>
    );
};
```

:::caution Attention
There is something we should pay attention to here. We need to give the `id` of which post we want to clone.
:::

### Push, Replace and GoBack

If we do not want to use the above methods and want to redirect ourselves, we should use `push` or `replace` methods and also we can use `goBack` to return to previous page. You can check out the differences between them [here](#return-values).

```tsx 
import {
// highlight-next-line
    useNavigation,
} from "@pankod/refine-core";

export const MyHistoryButtons = () => {
// highlight-next-line
    const { push, replace, goBack } = useNavigation();

    return (
        <>
            <button
                onClick={(): void =>
// highlight-next-line
                    push("posts")
                }
            >
                Push to posts Page
            </button>
            <button
                onClick={(): void =>
// highlight-next-line
                    replace("posts")
                }
            >
                Replaces to posts Page
            </button>
            <button
                onClick={(): void =>
// highlight-next-line
                    goBack()
                }
            >
                Go back to previous Page
            </button>
        </>
    );
};
```

## API Reference

### Properties

| Property                                          | Description                                 | Type                      | Default  |
| ------------------------------------------------- | ------------------------------------------- | ------------------------- | -------- |
| resource <div className="required">Required</div> | Redirect the app to the given resource name | `string`                  |          |
| type                                              | It is [`routerProvider`][routerProvider] history types            | [HistoryType](#interface) | `"push"` |
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

[routerProvider]: /core/providers/router-provider.md