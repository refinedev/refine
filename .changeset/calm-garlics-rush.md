---
"@pankod/refine-antd": minor
"@pankod/refine-mui": minor
---

Fix: Wrap with [`<CanAccess />`](https://refine.dev/docs/core/components/accessControl/can-access/) component to parent sider items

```tsx
<Refine
    accessControlProvider={{
        can: async ({ action, resource }) => {
            // console.log({ action, resource });
            // output: {action: "list", resource: "cms" } 
          
            return { can: true };
        },
    }}
    resources={[
        {
            name: "CMS",
        },
        {
            name: "posts",
            parentName: "CMS",
            list: PostList,
        },
    ]}
/>

```
