---
"@refinedev/cli": patch
---

fix: `refine add resource` generating invalid React component name. #6225

`refine add resource blog-posts` command was generating invalid React component name when the resource name contains a hyphen. This issue has been fixed by converting the resource name to PascalCase before generating the React component name.

```diff
- export const Blog-PostsList: React.FC = () => {};
+ export const BlogPostsList: React.FC = () => {};
```

[Resolves #6225](https://github.com/refinedev/refine/issues/6225)
