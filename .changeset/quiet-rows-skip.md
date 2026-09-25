---
"@refinedev/core": patch
---

fix(core): `useImport` no longer imports the empty last line of a CSV file

A CSV file usually ends with a line break. Papa Parse returns that empty last line as a row, so `useImport` sent an extra record like `{ id: "" }` to `create`/`createMany`. With the default batch size that junk record goes in the same `createMany` request as the real rows. `useImport` now passes `skipEmptyLines: true` to Papa Parse by default; it can still be overridden with `paparseOptions`.

Fixes #7615
