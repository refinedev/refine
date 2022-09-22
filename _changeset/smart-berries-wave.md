---
"@pankod/refine-core": patch
---

Removed `children` property from `useCan`s `params.resource` since it can be in `ITreeMenu` type and `React.ReactNode` breaks the `react-query`s key stringify function.
