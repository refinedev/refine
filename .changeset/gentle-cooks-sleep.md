---
"@refinedev/antd": minor
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
} from "@refinedev/antd";

const PostShow = () => {
    <Show
        isLoading={isLoading}
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
    </Show>;
};
```
