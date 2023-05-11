---
"@refinedev/ui-types": minor
---

feat: added crud component types.
Now `ActionButtonRenderer` has a new generic type `TExtraProps`. This will allow us to pass extra props to the renderer.

feat: added `TEditButtonProps`, `TDeleteButtonProps`, `TRefreshButtonProps`, and, `TListButtonProps` generic types to `RefineCrudShowProps`.
Now `RefineCrudShowProps` can take generic types for all the buttons.
