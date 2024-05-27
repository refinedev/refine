---
"@refinedev/simple-rest": patch
---

fix: "mapOperator" test type error.
Some `CrudOperators` not supported in `operatorMappings` type but still extended from `CrudOperators`. To fix that we use `Partial` type for `operatorMappings` type.
