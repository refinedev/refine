---
id: mutation-mode
title: Mutation Mode
---

## Overview
Mutation mode determines the mode with which the mutations run. Mutations can run under 3 different modes: `pessimistic`, `optimistic`, `undoable`.  
Each mode correspondes to a different type of user experience.

## Usage
Mutation mode can be set application-wide in [`<Refine>`](#). 

```tsx title="App.tsx"
<Refine mutationMode="optimistic">
    ...
</Refine>
```
>Its default value is `pessimistic`.

<br />

It can also be set in [supported data hooks](#supported-data-hooks) for fine-grained configuration. 

```tsx
const { mutate } = useUpdate("categories", "optimistic");
```
> Mutation mode passed to `<Refine>` will be overriden by the mutation mode passed to a data hook.

### Supported data hooks

- [`useUpdate` &#8594](api-references/hooks/data/useUpdate.md)   
- [`useUpdateMany` &#8594](api-references/hooks/data/useUpdateMany.md)  
- [`useDelete` &#8594](api-references/hooks/data/useDelete.md)  
- [`useDeleteMany` &#8594](api-references/hooks/data/useDeleteMany.md)


<br />

## Modes

### `pessimistic`
The mutation runs immediately. Redirection and UI updates are executed after the mutation returns successfuly.

### `optimistic`
The mutation is applied locally, redirection and UI updates are executed immediately as if the mutation is succesful. If mutation returns with error, UI updates accordingly.

### `undoable`
The mutation is applied locally, redirection and UI updates are executed immediately as if the mutation is succesful. Waits for a customizable amount of timeout before mutation is applied. During the timeout, mutation can be cancelled from the notification with an undo button and UI will revert back accordingly.

