---
id: mutation-mode
title: Mutation Mode
---


## Overview

Mutation mode determines which mode the mutation runs with. Mutations can run under three different modes: `pessimistic`, `optimistic` and `undoable`.  
Each mode corresponds to a different type of user experience.

## Modes

We'll show usages of modes with editing a record examples.

### `pessimistic`

The mutation runs immediately. Redirection and UI updates are executed after the mutation returns successfuly.

<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/mutation-mode/pessimistic.gif" alt="pessimistic mode" />
</div>

<br />

> When the user clicks on save button, request to the API happens directly and after successful response, list page updates with newly edited record.

<br />

### `optimistic`

The mutation is applied locally, redirection and UI updates are executed immediately as if the mutation is succesful. If mutation returns with error, UI updates to show data prior to the mutation.

<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/mutation-mode/optimistic.gif" alt="optimistic mode" />
</div>

<br />

> When the user clicks on save button, request to the API happens directly and list page updates with edited data immediately without waiting API response.

<br />

### `undoable`

The mutation is applied locally, redirection and UI updates are executed immediately as if the mutation is succesful. Waits for a customizable amount of timeout period before mutation is applied. During the timeout, mutation can be cancelled from the notification with an undo button and UI will revert back accordingly.

<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/mutation-mode/undoable.gif" alt="undoable mode" />
</div>

<br />

> When the user clicks on save button, request isn't sent to API immediately however list page updates with edited data. It waits for a period of time while the user can cancel the mutation. If the mutation is cancelled, locally applied edit is undone.

## Usage

Mutation mode can be set application-wide in [`<Refine>`](/api-references/components/refine-config.md#mutationmode) component.

```tsx title="App.tsx"
<Refine ... mutationMode="optimistic" />
```

> Its default value is `pessimistic`.

<br />

It can also be set in supported [data hooks](https://docs-mu-doc-refine.pankod.com/docs/api-references/hooks/data/useUpdate#mutation-mode) and [form hooks](https://docs-mu-doc-refine.pankod.com/docs/api-references/hooks/form/useForm#properties) for fine-grained configuration.

```tsx
import { useUpdate } from "@pankod/refine";

const { mutate } = useUpdate();

mutate({
    resource: "categories",
    id: "2",
    values: { title: "New Category Title" },
// highlight-next-line
    mutationMode: "optimistic",
});
```

> Mutation mode passed to `<Refine>` will be overriden by the mutation mode passed to data or form hooks and components.

### Supported data hooks

-   [`useUpdate` &#8594](api-references/hooks/data/useUpdate.md)
-   [`useUpdateMany` &#8594](api-references/hooks/data/useUpdateMany.md)
-   [`useDelete` &#8594](api-references/hooks/data/useDelete.md)
-   [`useDeleteMany` &#8594](api-references/hooks/data/useDeleteMany.md)

### Supported form hooks

-   [`useForm` &#8594](api-references/hooks/form/useForm.md)
-   [`useModalForm` &#8594](api-references/hooks/form/useModalForm.md)
-   [`useDrawerForm` &#8594](api-references/hooks/form/useDrawerForm.md)
-   [`useStepsForm` &#8594](api-references/hooks/form/useStepsForm.md)

### Supported components

-   [`DeleteButton` &#8594](api-references/components/buttons/delete.md)

<br />

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-example-mutation-mode-0m3y9?autoresize=1&fontsize=14&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-example-mutation-mode"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>