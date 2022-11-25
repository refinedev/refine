---
"@pankod/refine-mantine": patch
---

Fix `Layout` component for `Table` overflows. `Table` was not respecting the flex layout even inside `ScrollArea` component. This was causing the table to overflow the parent container.
