---
"@refinedev/mui": minor
---

feat: added default button props into the renderer functions `headerButtons` and `footerButtons` in CRUD components.
Now, customization of the header and footer buttons can be achieved without losing the default functionality.

```tsx
import {
    Show,
    ListButton,
    RefreshButton,
    EditButton,
    DeleteButton,
} from "@refinedev/mui";
const PostShow = () => {
    return (
        <Show
            headerButtons={({
                deleteButtonProps,
                editButtonProps,
                listButtonProps,
                refreshButtonProps,
            }) => {
                return (
                    <>
                        {/* custom components */}
                        <ListButton {...listButtonProps} />
                        <RefreshButton {...refreshButtonProps} />
                        <EditButton {...editButtonProps} />
                        <DeleteButton {...deleteButtonProps} />
                    </>
                );
            }}
        >
            {/* ... */}
        </Show>
    );
};
```
