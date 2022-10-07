---
"@pankod/refine-core": minor
---

Added `dataProviderName` property to resource options. Now you can define default data provider per resource.

**Usage**

```ts
<Refine
    dataProvider={{
        default: myProvider,
        second: mySecondProvider,
    }}
    resources={[
        {
            name: "posts",
            options: {
                dataProviderName: "second",
            },
        }
    ]}
/>
```
