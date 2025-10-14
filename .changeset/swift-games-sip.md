---
"@refinedev/nextjs-router": patch
"@refinedev/react-router": patch
"@refinedev/remix-router": patch
---

feat: added `fallbackTo` prop to `NavigateToResource` component #7077

Now with `fallbackTo` prop, you can specify a fallback route when no resource is found to navigate to. The component will navigate to the provided fallback path instead of doing nothing, providing better user experience.

Resolves #7077
