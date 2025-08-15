# pickNotDeprecated Function Usage Analysis

## Overview

The `pickNotDeprecated` function is an internal helper that returns the first non-undefined value from its arguments. It's used throughout the codebase to handle parameter deprecation migrations, typically choosing between new and legacy parameter names.

**Function Definition:**

```typescript
export const pickNotDeprecated = <T extends unknown[]>(
  ...args: T
): T[never] => {
  return args.find((arg) => typeof arg !== "undefined");
};
```

## Usage Categories

### 1. Data Hooks (13 files)

#### Query Hooks

- **`src/hooks/data/useList.ts`**

  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props
  - `pickNotDeprecated(filters, config?.filters)` - Choose between direct filters and config filters
  - `pickNotDeprecated(sorters, config?.sort)` - Choose between sorters and config sort
  - `pickNotDeprecated(hasPagination, config?.hasPagination)` - Choose pagination setting

- **`src/hooks/data/useOne.ts`**

  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props

- **`src/hooks/data/useMany.ts`**

  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props

- **`src/hooks/data/useCustom.ts`**

  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props

- **`src/hooks/data/useInfiniteList.ts`**
  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props
  - `pickNotDeprecated(filters, config?.filters)` - Choose between direct filters and config filters
  - `pickNotDeprecated(sorters, config?.sort)` - Choose between sorters and config sort
  - `pickNotDeprecated(hasPagination, config?.hasPagination)` - Choose pagination setting

#### Mutation Hooks

- **`src/hooks/data/useCreate.ts`**

  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props in mutation function

- **`src/hooks/data/useUpdate.ts`**

  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props in mutation function

- **`src/hooks/data/useDelete.ts`**

  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props in mutation function

- **`src/hooks/data/useCreateMany.ts`**

  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props in mutation function

- **`src/hooks/data/useUpdateMany.ts`**

  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props in mutation function

- **`src/hooks/data/useDeleteMany.ts`**

  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props in mutation function

- **`src/hooks/data/useCustomMutation.ts`**
  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props in mutation function

### 2. Utility Hooks (6 files)

- **`src/hooks/form/index.ts`**

  - `pickNotDeprecated(props.meta, props.metaData)` - Choose between new `meta` and deprecated `metaData` props

- **`src/hooks/useTable/index.ts`**

  - `pickNotDeprecated(pagination?.pageSize, initialPageSize)` - Choose between new pagination prop and deprecated initialPageSize
  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props
  - `pickNotDeprecated(filtersFromProp?.initial, initialFilter)` - Choose between new filters.initial and deprecated initialFilter
  - `pickNotDeprecated(filtersFromProp?.permanent, permanentFilter)` - Choose between new filters.permanent and deprecated permanentFilter
  - `pickNotDeprecated(sortersFromProp?.initial, initialSorter)` - Choose between new sorters.initial and deprecated initialSorter
  - `pickNotDeprecated(sortersFromProp?.permanent, permanentSorter)` - Choose between new sorters.permanent and deprecated permanentSorter
  - `pickNotDeprecated(filtersFromProp?.defaultBehavior, defaultSetFilterBehavior)` - Choose between new filters.defaultBehavior and deprecated defaultSetFilterBehavior

- **`src/hooks/useSelect/index.ts`**

  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props
  - `pickNotDeprecated(filters, defaultValueQueryOptions?.filters)` - Choose between direct filters and query option filters
  - `pickNotDeprecated(sorters, defaultValueQueryOptions?.sort)` - Choose between sorters and query option sort
  - `pickNotDeprecated(hasPagination, defaultValueQueryOptions?.hasPagination)` - Choose pagination setting

- **`src/hooks/show/index.ts`**

  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props

- **`src/hooks/breadcrumb/index.ts`**

  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props

- **`src/hooks/menu/useMenu.tsx`**
  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props

### 3. Feature Hooks (3 files)

- **`src/hooks/export/index.ts`**

  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props
  - `pickNotDeprecated(sorters, sorter)` - Choose between new `sorters` and deprecated `sorter` props (appears twice in getList call)

- **`src/hooks/import/index.tsx`**

  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props

- **`src/hooks/auditLog/useLog/index.ts`**
  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props

### 4. Helper Functions (7 files)

- **`src/definitions/helpers/queryKeys/index.ts`**

  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props for query key generation

- **`src/definitions/helpers/routeGenerator/index.ts`**

  - `pickNotDeprecated(item.meta, item.options)` - Choose between new `meta` and deprecated `options` props for resource route generation

- **`src/definitions/helpers/pickDataProvider/index.ts`**

  - Used indirectly (imports pickNotDeprecated but actual usage may be in related functions)

- **`src/definitions/helpers/handlePaginationParams/index.ts`**

  - `pickNotDeprecated(...)` - Used for handling pagination parameter migration

- **`src/definitions/helpers/treeView/createTreeView/index.ts`**

  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props for tree view creation

- **`src/definitions/helpers/router/get-parent-resource.ts`**

  - `pickNotDeprecated(...)` - Used for handling parent resource metadata

- **`src/hooks/data/useApiUrl.ts`**
  - `pickNotDeprecated(meta, metaData)` - Choose between new `meta` and deprecated `metaData` props

### 5. Other Files (5 files)

- **`src/index.tsx`**

  - Export statement for the pickNotDeprecated function

- **`src/definitions/table/index.ts`**

  - Type definitions related to pickNotDeprecated usage

- **`src/definitions/helpers/index.ts`**

  - Export statement for the pickNotDeprecated function

- **`src/definitions/helpers/pickNotDeprecated/index.ts`**

  - The actual function definition file

- **`src/definitions/helpers/pickNotDeprecated/index.spec.ts`**

  - Test file for the pickNotDeprecated function

- **`CHANGELOG.md`**
  - Documentation mentioning pickNotDeprecated changes

## Summary

**Total Usage Count: 34 files**

### Primary Usage Patterns:

1. **`meta` vs `metaData`** - Most common pattern (21+ usages)
2. **`sorters` vs `sorter`** - Sorting parameter migration (4+ usages)
3. **New structured props vs legacy flat props** - Table/form configuration (7+ usages)
4. **Direct props vs config object props** - Parameter organization (3+ usages)

### Recommendation for Cleanup:

Files can be prioritized for cleanup based on deprecation timeline:

- **High Priority**: Data hooks (most frequently used)
- **Medium Priority**: Utility hooks (user-facing APIs)
- **Low Priority**: Helper functions (internal usage)
- **Keep**: Test files and definitions until all usages are cleaned up

The deprecation cleanup should be done carefully, ensuring that the deprecated parameters are no longer supported before removing these pickNotDeprecated calls.
