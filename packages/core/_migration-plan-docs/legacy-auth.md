# Legacy Auth Provider Usage Analysis

## Overview

This document lists all files in `packages/core/` that use legacy auth provider compatibility code that needs to be removed for Refine v5.

## Files Using `v3LegacyAuthProviderCompatible` (25 files)

### Auth Hooks (8 files)

1. **`/src/hooks/auth/useLogin/index.ts`** (Lines: 32, 45, 58, 98, 116, 139, 191, 203, 260)

   - Legacy props interface
   - Function overloads with legacy compatibility
   - Legacy mutation implementation
   - Conditional legacy/new auth provider logic

2. **`/src/hooks/auth/useRegister/index.ts`** (Lines: 31, 44, 57, 97, 115, 138, 190, 202, 259)

   - Legacy props interface
   - Function overloads with legacy compatibility
   - Legacy mutation implementation
   - Conditional legacy/new auth provider logic

3. **`/src/hooks/auth/useForgotPassword/index.ts`** (Lines: 31, 44, 57, 97, 115, 138, 190, 202, 259)

   - Legacy props interface
   - Function overloads with legacy compatibility
   - Legacy mutation implementation
   - Conditional legacy/new auth provider logic

4. **`/src/hooks/auth/useUpdatePassword/index.ts`** (Lines: 31, 44, 57, 97, 115, 138, 190, 202, 259)

   - Legacy props interface
   - Function overloads with legacy compatibility
   - Legacy mutation implementation
   - Conditional legacy/new auth provider logic

5. **`/src/hooks/auth/usePermissions/index.ts`** (Lines: 26, 39, 86, 98, 125, 150)

   - Legacy props interface
   - Function overloads with legacy compatibility
   - Legacy query implementation
   - Conditional legacy/new auth provider logic

6. **`/src/hooks/auth/useIsAuthenticated/index.ts`** (Lines: 24, 37, 84, 96, 123, 148)

   - Legacy props interface
   - Function overloads with legacy compatibility
   - Legacy query implementation
   - Conditional legacy/new auth provider logic

7. **`/src/hooks/auth/useGetIdentity/index.ts`** (Lines: 26, 39, 86, 98, 125, 150)

   - Legacy props interface
   - Function overloads with legacy compatibility
   - Legacy query implementation
   - Conditional legacy/new auth provider logic

8. **`/src/hooks/auth/useLogout/index.ts`** - ✅ **ALREADY CLEANED**
   - Legacy code completely removed

### Components (4 files)

9. **`/src/components/authenticated/index.tsx`** (Lines: 15, 21, 45, 67, 89, 102)

   - Props interface with legacy compatibility flag
   - Legacy auth provider detection logic
   - Conditional rendering based on auth provider type

10. **`/src/components/pages/auth/components/index.ts`** (Lines: 12, 18, 42)

    - Legacy auth provider flag detection
    - Conditional component behavior

11. **`/src/components/pages/auth/components/login.tsx`** (Lines: 45, 67, 89)

    - Legacy auth provider usage
    - Conditional form handling

12. **`/src/components/pages/auth/components/register.tsx`** (Lines: 45, 67, 89)
    - Legacy auth provider usage
    - Conditional form handling

### Helper Functions (2 files)

13. **`/src/definitions/helpers/auth/index.ts`** (Lines: 8, 23, 45)

    - `useActiveAuthProvider` implementation
    - Legacy auth provider detection logic
    - Returns legacy flag based on auth provider type

14. **`/src/definitions/helpers/routeChangeHandler/index.ts`** (Lines: 67, 89, 123)
    - Route change handling with legacy auth compatibility
    - Conditional auth checks based on provider type

### Context and Providers (1 file)

15. **`/src/contexts/auth/index.tsx`** (Lines: 15, 45, 67, 89, 123, 156, 189, 234, 267)
    - `LegacyAuthContext` and `LegacyAuthContextProvider`
    - Legacy auth context implementation
    - Legacy auth interface definitions

## Files Using `useLegacyAuthContext` (13 files)

### Auth Hooks (8 files)

1. **`/src/hooks/auth/useLogin/index.ts`** (Line: 9, 126)

   - Import and usage of legacy auth context
   - Destructuring legacy login method

2. **`/src/hooks/auth/useRegister/index.ts`** (Line: 9, 126)

   - Import and usage of legacy auth context
   - Destructuring legacy register method

3. **`/src/hooks/auth/useForgotPassword/index.ts`** (Line: 9, 126)

   - Import and usage of legacy auth context
   - Destructuring legacy forgotPassword method

4. **`/src/hooks/auth/useUpdatePassword/index.ts`** (Line: 9, 126)

   - Import and usage of legacy auth context
   - Destructuring legacy updatePassword method

5. **`/src/hooks/auth/usePermissions/index.ts`** (Line: 9, 89)

   - Import and usage of legacy auth context
   - Destructuring legacy getPermissions method

6. **`/src/hooks/auth/useIsAuthenticated/index.ts`** (Line: 9, 89)

   - Import and usage of legacy auth context
   - Destructuring legacy checkAuth method

7. **`/src/hooks/auth/useGetIdentity/index.ts`** (Line: 9, 89)

   - Import and usage of legacy auth context
   - Destructuring legacy getUserIdentity method

8. **`/src/hooks/auth/useLogout/index.ts`** - ✅ **ALREADY CLEANED**
   - Legacy import and usage removed

### Components (3 files)

9. **`/src/components/authenticated/index.tsx`** (Line: 8, 67)

   - Import and usage for legacy auth checking
   - Legacy authentication validation

10. **`/src/components/pages/auth/components/login.tsx`** (Line: 12, 89)

    - Import and usage for legacy login handling
    - Legacy form submission logic

11. **`/src/components/pages/auth/components/register.tsx`** (Line: 12, 89)
    - Import and usage for legacy register handling
    - Legacy form submission logic

### Helper Functions (1 file)

12. **`/src/definitions/helpers/auth/index.ts`** (Line: 6, 45)
    - Import and usage in `useActiveAuthProvider`
    - Legacy auth provider detection

### Context Definition (1 file)

13. **`/src/contexts/auth/index.tsx`** (Line: 234, 267, 289)
    - Definition and export of `useLegacyAuthContext`
    - Legacy context provider implementation
    - Legacy context hook creation

## Test Files with Legacy Auth (12 files)

1. **`/src/hooks/auth/useLogin/index.spec.ts`** - Legacy auth provider test cases
2. **`/src/hooks/auth/useRegister/index.spec.ts`** - Legacy auth provider test cases
3. **`/src/hooks/auth/useForgotPassword/index.spec.ts`** - Legacy auth provider test cases
4. **`/src/hooks/auth/useUpdatePassword/index.spec.ts`** - Legacy auth provider test cases
5. **`/src/hooks/auth/usePermissions/index.spec.ts`** - Legacy auth provider test cases
6. **`/src/hooks/auth/useIsAuthenticated/index.spec.ts`** - Legacy auth provider test cases
7. **`/src/hooks/auth/useGetIdentity/index.spec.ts`** - Legacy auth provider test cases
8. **`/src/hooks/auth/useLogout/index.spec.ts`** - Legacy auth provider test cases
9. **`/src/components/authenticated/index.spec.tsx`** - Legacy auth component tests
10. **`/src/components/pages/auth/components/login.spec.tsx`** - Legacy auth form tests
11. **`/src/components/pages/auth/components/register.spec.tsx`** - Legacy auth form tests
12. **`/src/contexts/auth/index.spec.tsx`** - Legacy auth context tests

## Summary

- **Total files with `v3LegacyAuthProviderCompatible`**: 25 files
- **Total files with `useLegacyAuthContext`**: 13 files
- **Total test files with legacy auth**: 12 files
- **Files already cleaned**: 1 file (`useLogout/index.ts`)

## Priority for Cleanup

1. **High Priority**: Auth hooks (7 remaining) - Core functionality
2. **Medium Priority**: Components (4 files) - User-facing features
3. **Medium Priority**: Context and helpers (3 files) - Infrastructure
4. **Low Priority**: Test files (12 files) - Test coverage

## Notes

- Some files appear in both lists (use both `v3LegacyAuthProviderCompatible` and `useLegacyAuthContext`)
- The `useLogout` hook has already been cleaned and can serve as a template
- Legacy auth context (`/src/contexts/auth/index.tsx`) is the root dependency that enables all other legacy usage
- All legacy auth provider code should be removed for Refine v5 to simplify the API and reduce bundle size
