---
"@refinedev/antd": patch
---

fix: antd notificationProvider issue

Antd notification component could not access theme context, now it's fixed.

This release changes exported `notificationProvider` value from type `NotificationProvider` to `() => NotificationProvider`. If you previously had customizations applied to the `notificationProvider` object, you may need to update your code like the following:

```diff
- import { notificationProvider } from "@refinedev/antd";
+ import { notificationProvider as useDefaultNotificationProvider } from "@refinedev/antd";

- const myNotificationProvider = {
-    ...notificationProvider,
-    open: (...args) => {
-        // do some operation here
-        notificationProvider.open(...args);
-    },
- }
+ const myNotificationProvider = () => {
+     const notificationProvider = useDefaultNotificationProvider();
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
        <Refine
            /* ... */
            notificationProvider={myNotificationProvider}
        >
            /* ... */
        </Refine>
    );
}
```
