---
"@pankod/refine-cli": patch
---
- Rename command name `generate:resource` to `create-resource`.
- Removed the requirement for the `resource name` parameter. Ask for `resource name` and `actions` with `inquirer`.
- Add multiple resource create support. (`refine create-resource post category user`)
