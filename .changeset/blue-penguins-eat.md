---
"@pankod/refine-core": minor
---

Added a new `<Refine>` component property: `options`.

Previously, the options were passed as a property to the `<Refine>` component. Now, the options are passed to the `<Refine>` via `options` property like this:

```diff
    <Refine
-       mutationMode="undoable"
-       undoableTimeout={5000}
-       warnWhenUnsavedChanges
-       syncWithLocation
-       liveMode="off"
+       options={{
+           mutationMode: "undoable",
+           undoableTimeout: 5000,
+           warnWhenUnsavedChanges: true,
+           syncWithLocation: true,
+           liveMode: "off",
+       }}
    />
```