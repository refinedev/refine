---
"@refinedev/core": patch
---

feat: `<GitHubBanner />` has `paddingLeft: 200px` by default to make space for the sidebar. This is not needed when the sidebar is not present.

From on, `<GitHubBanner />` style property can be overridden by passing `containerStyle` prop.

```jsx
<GitHubBanner containerStyle={{ paddingLeft: 0 }} />
```
