---
"@refinedev/core": patch
---

fix(rest): allow override optional `getMany` method as `undefined`

Fixed an issue preventing optional data provider `getMany` method from being overridden with `undefined` values when creating a data provider.
