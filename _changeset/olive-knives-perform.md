---
"@pankod/refine-kbar": minor
"@pankod/refine-nextjs-router": minor
"@pankod/refine-react-location": minor
"@pankod/refine-react-router-v6": minor
---

Pass the full `resource` to the `accessControlProvider` can method. This will enable Attribute Based Access Control (ABAC), for example granting permissions based on the value of a field in the resource object.

```ts
const App: React.FC = () => {
    <Refine
        // other providers and props
        accessControlProvider={{
            can: async ({ resource, action, params }) => {
                if (resource === "posts" && action === "edit") {
                    return Promise.resolve({
                        can: false,
                        reason: "Unauthorized",
                    });
                }

                // or you can access directly *resource object
                // const resourceName = params?.resource?.name;
                // const anyUsefulOption = params?.resource?.options?.yourUsefulOption;
                // if (resourceName === "posts" && anyUsefulOption === true && action === "edit") {
                //     return Promise.resolve({
                //         can: false,
                //         reason: "Unauthorized",
                //     });
                // }

                return Promise.resolve({ can: true });
            },
        }}
    />;
};
```
