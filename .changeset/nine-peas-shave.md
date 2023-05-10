---
"@refinedev/chakra-ui": minor
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
} from "@refinedev/chakra-ui";

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
                        {listButtonProps && <ListButton {...listButtonProps} />}
                        {editButtonProps && <EditButton {...editButtonProps} />}
                        {deleteButtonProps && (
                            <DeleteButton {...deleteButtonProps} />
                        )}
                        <RefreshButton {...refreshButtonProps} />
                    </>
                );
            }}
        >
            {/* ... */}
        </Show>
    );
};
```
