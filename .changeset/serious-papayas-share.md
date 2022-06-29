---
"@pankod/refine-core": patch
---

Added `actions` translate support for CRUD operations (`list`,`create`,`edit`,`show`) in the `useBreadcrumb` [`useBreadcrumb`](https://refine.dev/docs/core/hooks/useBreadcrumb/#i18n-support) hook.

#️⃣ First, We need to add the `actions` key to the translation file.

```json
    "actions": {
        "list": "List",
        "create": "Create",
        "edit": "Edit",
        "show": "Show"
    },
```

#️⃣ If you don't provide the `actions` key, `useBreadcrumb` will try to find the `buttons` key in the `translation` file for backward compatibility.

```json
    "buttons": {
        "list": "List",
        "create": "Create",
        "edit": "Edit",
        "show": "Show"
    },
```

🎉 You can check the code part of this pull request to see how it works [here👇🏼](https://github.com/pankod/refine/pull/2069)

```tsx
const key = `actions.${action}`;
const actionLabel = translate(key);
if (actionLabel === key) {
    console.warn(
        `Breadcrumb missing translate key for the "${action}" action. Please add "actions.${action}" key to your translation file. For more information, see https://refine.dev/docs/core/hooks/useBreadcrumb/#i18n-support`,
    );
    breadcrumbs.push({
        label: translate(`buttons.${action}`, humanizeString(action)),
    });
} else {
    breadcrumbs.push({
        label: translate(key, humanizeString(action)),
    });
}
```
