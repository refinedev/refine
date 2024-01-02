---
"@refinedev/inferencer": patch
---

Updated the object field inferencer to check for fields end with `name` and `label` and use them as the display name for the field. Previously the check was done for a predefined set of properties, now it's done for any property that ends with `name` or `label` which results with more accurate code generation.
