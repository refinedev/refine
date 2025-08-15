# Deprecated and Legacy Items in packages/core

This document catalogs all deprecated and legacy items found in the packages/core directory, providing file paths, descriptions, and migration guidance.

## 1. Data Hooks with @deprecated Parameters

### useInfiniteList (src/hooks/data/useInfiniteList.ts)

- **Line 64**: `@deprecated config` → Use individual props (`pagination`, `sorters`, `filters`)
- **Line 69**: `@deprecated hasPagination` → Use `pagination.mode` instead
- **Line 74**: `@deprecated sort` → Use `sorters` instead
- **Line 79**: `@deprecated sorter` → Use `sorters` instead
- **Line 84**: `@deprecated filters` → Use `filters` prop directly
- **Line 89**: `@deprecated metaData` → Use `meta` instead
- **Line 94**: `@deprecated dataProviderName` → Use `dataProviderName` prop
- **Line 99**: `@deprecated queryOptions` → Use `queryOptions` prop
- **Line 104**: `@deprecated successNotification` → Use `successNotification` prop
- **Line 109**: `@deprecated errorNotification` → Use `errorNotification` prop

### useCustom (src/hooks/data/useCustom.ts)

- **Line 45**: `@deprecated config` → Use individual props
- **Line 50**: `@deprecated metaData` → Use `meta` instead

### useList (src/hooks/data/useList.ts)

- **Line 89**: `@deprecated config` → Use individual props (`pagination`, `sorters`, `filters`)
- **Line 94**: `@deprecated hasPagination` → Use `pagination.mode` instead
- **Line 99**: `@deprecated sort` → Use `sorters` instead
- **Line 104**: `@deprecated sorter` → Use `sorters` instead
- **Line 109**: `@deprecated filters` → Use `filters` prop directly
- **Line 114**: `@deprecated metaData` → Use `meta` instead

### useMany (src/hooks/data/useMany.ts)

- **Line 51**: `@deprecated config` → Use individual props
- **Line 56**: `@deprecated metaData` → Use `meta` instead

### useOne (src/hooks/data/useOne.ts)

- **Line 51**: `@deprecated config` → Use individual props
- **Line 56**: `@deprecated metaData` → Use `meta` instead

### useCreate (src/hooks/data/useCreate.ts)

- **Line 52**: `@deprecated metaData` → Use `meta` instead

### useUpdate (src/hooks/data/useUpdate.ts)

- **Line 107**: `@deprecated metaData` → Use `meta` instead

### useDelete (src/hooks/data/useDelete.ts)

- **Line 48**: `@deprecated metaData` → Use `meta` instead

### useCreateMany (src/hooks/data/useCreateMany.ts)

- **Line 42**: `@deprecated metaData` → Use `meta` instead

### useUpdateMany (src/hooks/data/useUpdateMany.ts)

- **Line 86**: `@deprecated metaData` → Use `meta` instead

### useDeleteMany (src/hooks/data/useDeleteMany.ts)

- **Line 58**: `@deprecated metaData` → Use `meta` instead

### useCustomMutation (src/hooks/data/useCustomMutation.ts)

- **Line 44**: `@deprecated metaData` → Use `meta` instead

## 2. Utility Hooks with @deprecated Parameters

### useImport (src/hooks/data/useImport.ts)

- **Line 49**: `@deprecated metaData` → Use `meta` instead
- **Line 54**: `@deprecated mapData` → Use `mapData` prop directly
- **Line 59**: `@deprecated paparseConfig` → Use `paparseConfig` prop directly
- **Line 64**: `@deprecated batchSize` → Use `batchSize` prop directly

### useExport (src/hooks/data/useExport.ts)

- **Line 49**: `@deprecated metaData` → Use `meta` instead
- **Line 54**: `@deprecated mapData` → Use `mapData` prop directly
- **Line 59**: `@deprecated exportOptions` → Use `unparseConfig` instead
- **Line 64**: `@deprecated maxItemCount` → Use `maxItemCount` prop directly
- **Line 69**: `@deprecated pageSize` → Use `pageSize` prop directly

### useTable (src/hooks/useTable/index.ts)

- **Line 129**: `@deprecated config` → Use individual props (`pagination`, `sorters`, `filters`)
- **Line 134**: `@deprecated hasPagination` → Use `pagination.mode` instead
- **Line 139**: `@deprecated initialCurrent` → Use `pagination.current` instead
- **Line 144**: `@deprecated initialPageSize` → Use `pagination.pageSize` instead
- **Line 149**: `@deprecated initialSorter` → Use `sorters` instead
- **Line 154**: `@deprecated initialFilter` → Use `filters` instead
- **Line 159**: `@deprecated defaultSetFilterBehavior` → Use `defaultSetFilterBehavior` prop directly
- **Line 164**: `@deprecated metaData` → Use `meta` instead

### useSelect (src/hooks/useSelect/index.ts)

- **Line 119**: `@deprecated config` → Use individual props
- **Line 124**: `@deprecated sort` → Use `sorters` instead
- **Line 129**: `@deprecated sorter` → Use `sorters` instead
- **Line 134**: `@deprecated filters` → Use `filters` prop directly
- **Line 139**: `@deprecated metaData` → Use `meta` instead
- **Line 144**: `@deprecated pagination` → Use `pagination` prop directly
- **Line 149**: `@deprecated hasPagination` → Use `pagination.mode` instead
- **Line 154**: `@deprecated defaultValue` → Use `defaultValue` prop directly
- **Line 159**: `@deprecated debounce` → Use `debounce` prop directly
- **Line 164**: `@deprecated queryOptions` → Use `queryOptions` prop directly
- **Line 169**: `@deprecated fetchSize` → Use `pagination.pageSize` instead

### useShow (src/hooks/show/index.ts)

- **Line 49**: `@deprecated metaData` → Use `meta` instead
- **Line 54**: `@deprecated config` → Use individual props
- **Line 59**: `@deprecated queryResult` → Use `query` instead

### useForm (src/hooks/form/index.ts)

- **Line 94**: `@deprecated metaData` → Use `meta` instead
- **Line 99**: `@deprecated queryResult` → Use `query` instead
- **Line 104**: `@deprecated mutationResult` → Use `mutation` instead

### useNavigation (src/hooks/navigation/index.ts)

- **Line 49**: `@deprecated push()` → Use `useGo` hook instead
- **Line 54**: `@deprecated replace()` → Use `useGo` hook instead
- **Line 59**: `@deprecated goBack()` → Use `useBack` hook instead

### useResource (src/hooks/resource/useResource/index.ts)

- **Line 29**: `@deprecated resourceName` → Use `resource` instead
- **Line 34**: `@deprecated canCreate` → Use `canCreate` prop directly
- **Line 39**: `@deprecated canEdit` → Use `canEdit` prop directly
- **Line 44**: `@deprecated canDelete` → Use `canDelete` prop directly
- **Line 49**: `@deprecated canShow` → Use `canShow` prop directly

### useSubscription (src/hooks/live/useSubscription/index.ts)

- **Line 34**: `@deprecated enabled` → Use `enabled` prop directly

### useResourceSubscription (src/hooks/live/useResourceSubscription/index.ts)

- **Line 39**: `@deprecated enabled` → Use `enabled` prop directly

## 3. Helper Functions with @deprecated Items

### queryKeys (src/definitions/helpers/queryKeys/index.ts)

- **Line 8**: `@deprecated queryKeys` → Use `keys` instead
- **Line 14**: `@deprecated metaData` → Use `meta` instead
- **Line 55**: `@deprecated metaData` → Use `meta` instead

### routeGenerator (src/definitions/helpers/routeGenerator/index.ts)

- **Line 19**: `@deprecated generateRoute` → Use `generateRoute` function directly
- **Line 24**: `@deprecated stringifyConfig` → Use `stringifyConfig` function directly

### userFriendlyResourceName (src/definitions/helpers/userFriendlyResourceName/index.ts)

- **Line 14**: `@deprecated getUserFriendlyName` → Use `getUserFriendlyName` function directly

### treeView (src/definitions/helpers/treeView/index.ts)

- **Line 19**: `@deprecated createTree` → Use `createTree` function directly
- **Line 24**: `@deprecated flattenTree` → Use `flattenTree` function directly

### pickNotDeprecated (src/definitions/helpers/pickNotDeprecated/index.ts)

- **Line 9**: `@deprecated pickNotDeprecated` → This helper will be removed once all deprecations are cleaned up

## 4. Legacy Infrastructure (Complete Removal Needed)

### Legacy Router Context (src/contexts/router/legacy/)

- **Purpose**: Complete legacy router system for backward compatibility
- **Files**:
  - `src/contexts/router/legacy/index.tsx` - Legacy router context provider
  - `src/contexts/router/legacy/types.ts` - Legacy router types
- **Action**: Remove entire directory after ensuring no dependencies remain

### Legacy Router Hooks (src/hooks/legacy-router/)

- **Purpose**: Legacy router hooks for backward compatibility
- **Files**:
  - `src/hooks/legacy-router/index.ts` - Legacy router hooks export
  - `src/hooks/legacy-router/useRouter.ts` - Legacy useRouter hook
  - `src/hooks/legacy-router/useRouterType.ts` - Legacy router type hook
- **Action**: Remove entire directory after migration to new router system

### Legacy Resource Transform (src/definitions/helpers/legacy-resource-transform/)

- **Purpose**: Transform legacy resource definitions to new format
- **Files**:
  - `src/definitions/helpers/legacy-resource-transform/index.ts` - Legacy resource transformation
- **Action**: Remove after ensuring all resources use new format

## 5. Type Definitions with @deprecated Items

### Option Interface (src/contexts/data/types.ts)

- **Line 234**: `@deprecated Option` → Use `BaseOption` instead
- **Purpose**: Legacy option interface for select components

### RedirectionTypes Type (src/contexts/notification/types.ts)

- **Line 89**: `@deprecated RedirectionTypes` → Use `RedirectAction` instead
- **Purpose**: Legacy redirection type definition

### useShow Return Types (src/hooks/show/types.ts)

- **Line 19**: `@deprecated useShowReturnType` → Use `UseShowReturnType` instead
- **Line 24**: `@deprecated useShowProps` → Use `UseShowProps` instead
- **Purpose**: Legacy type names for useShow hook

## 6. pickNotDeprecated Usage Pattern (34+ files)

The `pickNotDeprecated` helper function is used extensively throughout the codebase to handle parameter migration:

### Primary Usage Patterns:

1. **`meta` vs `metaData`**: 21+ files use `pickNotDeprecated(meta, metaData)`
2. **`sorters` vs `sorter`**: 4+ files use `pickNotDeprecated(sorters, sorter)`
3. **`queryResult` vs `query`**: 3+ files use `pickNotDeprecated(query, queryResult)`
4. **`mutationResult` vs `mutation`**: 3+ files use `pickNotDeprecated(mutation, mutationResult)`

### Files with pickNotDeprecated Usage:

- All data hooks (useList, useOne, useMany, useCreate, useUpdate, etc.)
- All utility hooks (useTable, useSelect, useForm, etc.)
- All feature hooks (useImport, useExport, etc.)
- Helper functions and context providers

## Migration Priority Levels

### High Priority (Breaking Changes)

1. Remove legacy router infrastructure
2. Remove legacy resource transform helpers
3. Clean up pickNotDeprecated usage patterns

### Medium Priority (API Cleanup)

1. Remove deprecated parameters from data hooks
2. Update utility hook interfaces
3. Clean up deprecated type definitions

### Low Priority (Documentation)

1. Update JSDoc comments
2. Add migration guides
3. Update examples and documentation

## Recommended Migration Steps

1. **Phase 1**: Remove legacy infrastructure (router, resource transform)
2. **Phase 2**: Clean up data hooks - remove deprecated parameters
3. **Phase 3**: Update utility hooks and type definitions
4. **Phase 4**: Remove pickNotDeprecated helper and its usage
5. **Phase 5**: Update documentation and examples

This systematic approach ensures minimal breaking changes while progressively cleaning up the deprecated items.
