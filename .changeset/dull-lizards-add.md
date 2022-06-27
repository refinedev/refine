---
"@pankod/refine-antd": patch
"@pankod/refine-mui": patch
---

Fixed `<Link>` usage in packages.

```diff
- <Link href={route} to={route}>
-    {label}
- </Link>
+ <Link href={route}>{label}</Link>
```

We used to have to pass `href` and to `for` Nextjs and React applications, now we just need to pass `href`. **refine** routerProviders handle for us.
