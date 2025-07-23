# 🚀 Refine v5: TanStack Query v5 + React 19 Support

**Related Issues:**

- https://github.com/refinedev/refine/issues/6574
- https://github.com/refinedev/refine/issues/5370

## Overview

Modernize Refine to support TanStack Query v5 and React 19 with comprehensive deprecation cleanup.

---

## TanStack Query v5 Migration

### Core Hook Updates

- [x] **Data Hooks:** `useList`, `useOne`, `useMany`, `useCustom`, `useInfiniteList`
- [x] **Mutation Hooks:** `useCreate`, `useUpdate`, `useDelete`, `useCreateMany`, `useUpdateMany`, `useDeleteMany`
- [x] **Auth Hooks:** `useLogin`, `useLogout`, `useRegister`, `useGetIdentity`, `usePermissions`

### Breaking Changes Handling

- [x] Fix callback patterns: `onSuccess`/`onError` → `useEffect` patterns
- [x] Update query signature: `useQuery(key, fn, options)` → `useQuery({ queryKey, queryFn, ...options })`
- [x] Add required `initialPageParam` to infinite queries
- [x] Add required `queryKey` and `queryFn` to all hooks
- [x] Update AutoSave indicator for new Tanstack Query v5 status API

---

## Core Package Deprecation Cleanup

### Legacy Resource Type Cleanup

- [x] Remove deprecated `options` property from ResourceProps → use `meta`
- [x] Remove deprecated `canDelete` property from ResourceProps → use `meta.canDelete`
- [x] Remove deprecated `icon` property from ResourceProps → use `meta.icon`
- [x] Remove deprecated `parentName` property from ResourceProps → use `meta.parent`
- [x] Remove deprecated `key` property from ResourceProps (not used anymore)
- [x] Remove deprecated `label` property from IResourceItem → use `meta.label`
- [x] Remove deprecated `route` property from IResourceItem
- [x] Remove deprecated `DeprecatedOptions` interface entirely
- [x] Remove deprecated `RouteableProperties` interface (canCreate, canEdit, canShow, canDelete)

### useResource Hook Modernization

- [x] Remove deprecated legacy props interface (`UseResourceLegacyProps`)
- [x] Remove deprecated return properties (`resourceName`, `id`, `action`)
- [x] Migrate ErrorComponent to use `useResourceParams` instead of deprecated `useResource().action`
- [x] Keep `resourceNameOrRouteName` support (still actively used in UI libraries)

### Core Helper Updates

- [x] Update `routeGenerator` to use `meta.route` instead of `options.route`
- [x] Update `generateDocumentTitle` to use only `meta.label`
- [x] Update `navigation-button` to remove `resource.label` fallback
- [x] Update `sanitize-resource` to handle only `meta` properties
- [x] Update `get-parent-resource` to use only `meta.parent`

### Test Suite Migration

- [x] Migrate all test files from deprecated props to `meta` object pattern
- [x] Update `useMenu.spec.tsx` with modern resource definitions
- [x] Remove deprecated `key`, `parentName`, `options`, `canDelete` usage in tests
- [x] Update test utilities to use `meta` instead of `options`

### Deprecated Module/Component Removal

- [x] **Component Deletions**

  - [x] Remove `layoutWrapper` component and tests entirely
  - [x] Remove `pages/login` component (deprecated LoginPage)
  - [x] Remove `pages/ready` component and tests (deprecated ReadyPage)
  - [x] Remove exports from components/index.ts and pages/index.ts

- [x] **Legacy Router Infrastructure**

  - [x] Remove `contexts/router/legacy/index.tsx` and types
  - [x] Remove `contexts/router/picker/index.tsx`
  - [x] Remove `hooks/legacy-router/index.ts` and `useRouterContext.ts`

- [x] **Helper Function Cleanup**
  - [x] Remove `definitions/helpers/legacy-resource-transform` and tests
  - [x] Remove `definitions/helpers/pickNotDeprecated` and tests
  - [x] Remove `definitions/helpers/queryKeys` and tests (replaced by TanStack Query v5)
  - [x] Remove `definitions/helpers/routeGenerator` and tests (completely removed)
  - [x] Remove `definitions/helpers/treeView` modules entirely
  - [x] Remove `definitions/helpers/useActiveAuthProvider` test file
  - [x] Remove `definitions/helpers/userFriendlyResourceName` and tests

### Legacy Parameter Removal

- [x] Remove `@deprecated metaData` → use `meta` (affects 15+ hooks)
- [x] Remove `@deprecated sort` → use `sorters` (affects useList, useTable, useSelect)
- [x] Clean up `pickNotDeprecated` function usage across codebase
- [x] Update interface definitions and type exports
- [x] Legacy Auth Provider infrastructure cleanup
- [x] Legacy Router infrastructure cleanup

---

## React 19 Support

### Package Dependencies

- [x] Update peer dependencies to support React 18/19: `"react": "^18.0.0 || ^19.0.0"`
- [x] Update TypeScript types: `@types/react`, `@types/react-dom`
- [ ] Test compatibility across all packages

---

## UI Package Cleanups

### 📦 Ant Design Package (`packages/antd`)

#### Button Components Modernization

- [ ] Remove `resourceNameOrRouteName` prop from CloneButton
- [ ] Remove `resourceNameOrRouteName` prop from EditButton
- [ ] Remove `resourceNameOrRouteName` prop from ShowButton
- [ ] Remove `resourceNameOrRouteName` prop from CreateButton
- [ ] Remove `resourceNameOrRouteName` prop from ListButton
- [ ] Remove `resourceNameOrRouteName` prop from DeleteButton
- [ ] Remove `resourceNameOrRouteName` prop from RefreshButton
- [ ] Remove `recordItemId` prop from all button components
- [ ] Update button implementation to use only `resource` and `id` props

#### Hook Parameter Updates

- [ ] Remove `metaData` parameter from useForm → use only `meta`
- [ ] Remove `metaData` parameter from useTable → use only `meta`
- [ ] Remove `metaData` parameter from useSimpleList → use only `meta`
- [ ] Remove `metaData` parameter from useSelect → use only `meta`
- [ ] Remove `metaData` parameter from useCheckboxGroup → use only `meta`
- [ ] Remove `metaData` parameter from useRadioGroup → use only `meta`
- [ ] Remove deprecated query parameters from field hooks
- [ ] Clean up `pickNotDeprecated(meta, metaData)` patterns

#### Resource Property Cleanup

- [ ] Remove deprecated `route` property access in edit component
- [ ] Remove deprecated `route` property access in show component
- [ ] Remove deprecated `route` property access in list component
- [ ] Update IMenuItem interface to use `meta.route` instead of `route`
- [ ] Clean up legacy route fallback patterns in CRUD components

#### Test Suite Updates

- [ ] Replace `canDelete: true/false` with `meta: { canDelete: true/false }` in edit tests
- [ ] Replace `canDelete: true/false` with `meta: { canDelete: true/false }` in show tests
- [ ] Update all CRUD component tests (edit, show, list)
- [ ] Remove deprecated resource property usage in test fixtures

#### Sider Component Updates

- [ ] Remove `pickNotDeprecated(meta?.parent, options?.parent, parentName)` from themedLayoutV2 sider
- [ ] Remove `pickNotDeprecated(meta?.parent, options?.parent, parentName)` from themedLayout sider
- [ ] Remove `pickNotDeprecated(meta?.parent, options?.parent, parentName)` from layout sider
- [ ] Use only `meta.parent` for resource hierarchy

#### Deprecated Component Cleanup

- [ ] Remove or update LoginPage (marked deprecated)
- [ ] Remove or update ReadyPage (marked deprecated)
- [ ] Remove or update WelcomePage (marked deprecated)
- [ ] Remove or update Layout (marked deprecated)
- [ ] Remove or update ThemedLayout (marked deprecated)
- [ ] Remove or update notificationProvider (marked deprecated)

### 📦 Material-UI Package (`packages/mui`)

- [ ] Apply same button component updates as antd package
- [ ] Apply same hook parameter updates as antd package
- [ ] Apply same resource property cleanup as antd package
- [ ] Apply same test suite updates as antd package
- [ ] Apply same sider component updates as antd package
- [ ] Apply same deprecated component cleanup as antd package

### 📦 Mantine Package (`packages/mantine`)

- [ ] Apply same button component updates as antd package
- [ ] Apply same hook parameter updates as antd package
- [ ] Apply same resource property cleanup as antd package
- [ ] Apply same test suite updates as antd package
- [ ] Apply same sider component updates as antd package
- [ ] Apply same deprecated component cleanup as antd package

### 📦 Chakra UI Package (`packages/chakra-ui`)

- [ ] Apply same button component updates as antd package
- [ ] Apply same hook parameter updates as antd package
- [ ] Apply same resource property cleanup as antd package
- [ ] Apply same test suite updates as antd package
- [ ] Apply same sider component updates as antd package
- [ ] Apply same deprecated component cleanup as antd package

---

## 🔄 Testing & Quality Assurance

### Test Suite Updates

- [ ] Fix failing tests due to TanStack Query v5 changes
- [ ] Update test patterns for new hook signatures
- [ ] Validate performance improvements and regressions

### End-to-End Testing

- [ ] Test all packages together in real applications
- [ ] Validate cross-package compatibility
- [ ] Performance benchmarking (query speed, bundle size)

---

## 🔄 Documentation

- [ ] Create comprehensive migration guide for users
- [ ] Update API documentation for new patterns
- [ ] Prepare FAQ for common migration issues

---
