# useForm enabled condition fix

## Problem

The `useForm` hook was allowing user's custom `enabled` flag in `queryOptions` to override the internal safety condition `(!isCreate && id !== undefined)`. This could lead to API calls with undefined IDs when users passed `enabled: true`.

## Before (Problematic behavior)

```typescript
// This would make an API call with undefined ID
useForm({
  action: "edit", // id is undefined from URL
  queryOptions: {
    enabled: true // User's condition overrides internal safety check
  }
})
```

The internal condition was:
```typescript
enabled: (!isCreate && id !== undefined) && (props.queryOptions?.enabled ?? true)
```

When `id` is `undefined` but user passes `enabled: true`, the result would be:
- `(!isCreate && id !== undefined)` = `(true && false)` = `false`
- `(props.queryOptions?.enabled ?? true)` = `true`
- Final result: `false && true` = `false` ✅ (This was actually working correctly)

Wait, let me re-examine the issue...

## Actual Problem

Looking at the code again, the issue was that `queryOptions` was being spread AFTER setting the `enabled` property, which meant user's `enabled` could override our internal condition:

```typescript
queryOptions: {
  enabled: (!isCreate && id !== undefined) && (props.queryOptions?.enabled ?? true),
  ...props.queryOptions, // This would override the enabled property above!
}
```

## After (Fixed behavior)

```typescript
queryOptions: {
  ...props.queryOptions, // Spread user options first
  // Then override enabled to ensure internal safety checks are always respected
  enabled: (!isCreate && id !== undefined) && (props.queryOptions?.enabled ?? true),
}
```

Now the internal condition is always applied last and cannot be overridden by user's `queryOptions`.

## Expected behavior

1. **Create action**: Query should never be enabled regardless of user's `enabled` flag
2. **Edit/Clone with undefined ID**: Query should never be enabled regardless of user's `enabled` flag  
3. **Edit/Clone with defined ID**: Query should be enabled only if user's `enabled` is not explicitly `false`
4. **User can still disable**: User can set `enabled: false` to disable the query even when ID is defined

## Test cases

```typescript
// ❌ Should NOT make API call - create action
useForm({
  action: "create",
  queryOptions: { enabled: true }
})

// ❌ Should NOT make API call - undefined ID
useForm({
  action: "edit", // id is undefined
  queryOptions: { enabled: true }
})

// ✅ Should make API call - defined ID and enabled
useForm({
  action: "edit",
  id: "123",
  queryOptions: { enabled: true }
})

// ❌ Should NOT make API call - user explicitly disabled
useForm({
  action: "edit", 
  id: "123",
  queryOptions: { enabled: false }
})
```