---
"@refinedev/core": patch
---

fix: Added more flexibility to the [`<Link />`](https://refine.dev/docs/routing/components/link/) component's `ref` type by changing it from `HTMLAnchorElement` to `Element`.
From now on, we can pass any type of `ref` to the [`<Link />`](https://refine.dev/docs/routing/components/link/) component.

```tsx
// Before fix - Only worked with HTMLAnchorElement
const ref = useRef<HTMLAnchorElement>(null);

// After fix - Works with any Element type
const ref = useRef<HTMLDivElement>(null);
const ref = useRef<HTMLSpanElement>(null);
```

Resolves [#6463](https://github.com/refinedev/refine/issues/6463)
