---
"@refinedev/core": minor
---

Added `<AutoSaveIndicator />` component and updated the `AutoSaveIndicatorProps` type to allow `elements` to be passed in.

`elements` prop is an object with `success`, `error`, `loading` and `idle` keys. Each key is a React element that will be rendered when the corresponding state is active.

By default every state will render a `span` with the translated text of the `autoSave.${state}` key.
