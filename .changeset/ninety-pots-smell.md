---
"@refinedev/mui": patch
---

fix: `transformMuiOperatorToCrudOperator` return type is wrong.

This PR fixes the return type of `transformMuiOperatorToCrudOperator` function. It has return type `Exclude<CrudOperators, "or">` but it also should exclude `and` operator to satisfy `LogicalFilter` type.
