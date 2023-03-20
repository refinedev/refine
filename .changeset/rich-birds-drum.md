---
"@refinedev/core": minor
---

-   `title` prop added to `AuthPage`'s `renderContent` prop.

```ts
<AuthPage
    renderContent={(content: React.ReactNode, title: React.ReactNode) => {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {title}
                <h1 style={{ color: "white" }}>Extra Header</h1>
                {content}
                <h1 style={{ color: "white" }}>Extra Footer</h1>
            </div>
        );
    }}
/>
```
