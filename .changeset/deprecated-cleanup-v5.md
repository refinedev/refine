---
"@refinedev/antd": patch
"@refinedev/chakra-ui": patch
"@refinedev/mantine": patch
"@refinedev/core": patch
"@refinedev/codemod": patch
---

feat: comprehensive deprecated code cleanup for v5

This release completes the cleanup of deprecated code that remained after the Refine v5 migration, providing a cleaner and more maintainable codebase.

## Breaking Changes - Removed Deprecated Components

**@refinedev/antd:**

- Removed deprecated `ReadyPage` component (use custom components instead)
- Removed deprecated `LoginPage` component (use `AuthPage` instead)
- Removed deprecated `useSiderVisible` hook (use `useThemedLayoutContext` instead)

**@refinedev/chakra-ui:**

- Removed deprecated `ReadyPage` component (use custom components instead)
- Removed deprecated `useSiderVisible` hook (use `useThemedLayoutContext` instead)

**@refinedev/mantine:**

- Removed deprecated `useSiderVisible` hook (use `useThemedLayoutContext` instead)

## New Features

**@refinedev/codemod:**

- Added `welcome-page-import-from-core` codemod transformation
- Automatically migrates WelcomePage imports from UI libraries to @refinedev/core
- Run with: `npx @refinedev/codemod@latest welcome-page-import-from-core`

## Improvements

**@refinedev/antd:**

- Un-deprecated `getDefaultFilter` function - now the preferred import location
- Updated documentation to import `getDefaultFilter` from `@refinedev/antd` instead of `@refinedev/core`

**@refinedev/core:**

- Un-deprecated `warnWhenUnsavedChanges` property in RefineOptions (still valid and actively used)
- Updated all TanStack Query documentation links from v4 to v5
- Improved TSDoc comments with current TanStack Query v5 references

## Documentation Updates

- Updated 7 documentation files to use `getDefaultFilter` from `@refinedev/antd`
- Migrated 22 TanStack Query v4 documentation links to v5
- All API references now point to current TanStack Query v5 documentation
