---
"@pankod/refine-codemod": major
---

-   `AuthProvider` deprecated and renamed to `LegacyAuthProvider` with refine@4. `AuthProvider` to `LegacyAuthProvider` Transformation added.

-   With refine@4, Auth hooks are takes `legacy` prop to support `AuthProvider` and `LegacyAuthProvider`. Added the transform that adds the `legacy:true` prop.
