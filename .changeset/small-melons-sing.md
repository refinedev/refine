---
"@refinedev/antd": patch
---

fix: antd notificationProvider issue

Antd notification component could not access theme context, now it's fixed.

This release provides an alternative to exported `notificationProvider` value from type `NotificationProvider` to `() => NotificationProvider`. If you previously had customizations applied to the `notificationProvider` object, you may need to update your code like the following:

```diff
- import { notificationProvider } from "@refinedev/antd";
+ import { useNotificationProvider } from "@refinedev/antd";
+ import { App as AntdApp } from "antd";

- const myNotificationProvider = {
-    ...notificationProvider,
-    open: (...args) => {
-        // do some operation here
-        notificationProvider.open(...args);
-    },
- }
+ const myNotificationProvider = () => {
+     const notificationProvider = useNotificationProvider();
+     return {
+          ...notificationProvider,
+          open: (...args) => {
+             // do some operation here
+             notificationProvider.open(...args);
+          },
+     }
+ }
}

const App = () => {
    return (
        <AntdApp>
            <Refine
                /* ... */
                notificationProvider={myNotificationProvider}
            >
                /* ... */
            </Refine>
        </AntdApp>
    );
}
```
