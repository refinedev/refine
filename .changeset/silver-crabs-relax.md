---
"@refinedev/appwrite": major
---

feat(package/appwrite): update `Appwrite` SDK to `v15`

Updated `appwrite` SDK version to `v15` to match latest server version. Depending on your server version upgrading to this version should be safe but may require some changes in your codebase if you are using `appwrite` SDK directly.

If you're using the `data-provider-appwrite` example as base or created your app using the `create-refine-app` CLI, your auth provider implementation may require a small change in the `login` method:

```diff
-      await account.createEmailSession(email, password);
+      await account.createEmailPasswordSession(email, password);
```

[Resolves #6090](https://github.com/refinedev/refine/issues/6090)
