---
"@refinedev/core": patch
---

fix(core): correct useCustom return type to allow undefined data

The `useCustom` hook's `result.data` type was incorrectly typed as always defined, causing TypeScript errors when trying to use optional chaining or check for undefined. This fix updates the return type to explicitly allow `undefined` for `result.data`, aligning TypeScript types with actual runtime behavior.

**Changes:**
- Updated `UseCustomReturnType` to mark `result.data` as `TData | undefined`
- Added comprehensive JSDoc explaining when data can be undefined
- Removed `EMPTY_OBJECT` fallback that masked the undefined state
- Added extensive test coverage for undefined data scenarios

**Impact:**
- Enables proper null-safety checks with optional chaining
- Prevents type errors during loading, error, or disabled query states
- Maintains backward compatibility for existing code

Resolves #7088
