---
"@refinedev/core": minor
---

feat: add the `textTransformers` option to `<Refine/>` component

The `textTransformers` option in **refine** is used to transform the resource name displayed on the user interface (UI). By default, if you define a resource named `posts`, refine will display it as `Posts`. Similarly, when you delete a record, notification messages will be shown as `Post deleted successfully.`.

You have the flexibility to customize these messages by using the `textTransformers` option. For instance, if you wish to disable any transformation, you can set the `textTransformers` option as shown in the example below:

```tsx
const App: React.FC = () => (
    <Refine
        ...
        options={{
            textTransformers: {
                humanize: (text) => text,
                plural: (text) => text,
                singular: (text) => text,
            },
        }}
    />
);
```
