## Summary
This fix ensures that the internal `enabled` condition in `useForm` is always respected and cannot be overridden by user-provided `queryOptions.enabled`.

## What changed
- Spread `props.queryOptions` **before** setting `enabled`
- Internal condition `(!isCreate && id !== undefined)` is now applied last
- Users can still explicitly disable queries by setting `enabled: false`

## Why
Previously, spreading `props.queryOptions` after `enabled` allowed user-defined `enabled` to bypass the internal safety check, which could trigger API calls with undefined IDs.

## Expected behavior after fix
1. **Create action:** Query never enabled.
2. **Edit/Clone with undefined ID:** Query never enabled.
3. **Edit/Clone with defined ID:** Query enabled unless `enabled` is explicitly `false`.
4. **User override:** `enabled: false` still disables the query.

## Test cases
```ts
// Not enabled
useForm({ action: "create", queryOptions: { enabled: true } })

// Not enabled
useForm({ action: "edit", queryOptions: { enabled: true } })

// Enabled
useForm({ action: "edit", id: "123", queryOptions: { enabled: true } })

// Not enabled
useForm({ action: "edit", id: "123", queryOptions: { enabled: false } })
