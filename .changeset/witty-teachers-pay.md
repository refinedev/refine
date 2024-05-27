---
"@refinedev/nestjsx-crud": patch
---

fix: "mapOperator" test type error.
Some `CrudOperators` not supported in `mapOperator` type but still extended from `CrudOperators`. To fix that we use `Partial` type for `mapOperator` function.
