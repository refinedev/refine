---
"@refinedev/nestjs-query": patch
---

fix: implement unimplemented operators

The following filter operators have been implemented.

- `containss`
- `ncontainss`
- `startswiths`
- `nstartswiths`
- `endswiths`
- `nendswiths`
- `nbetween`

Resolves #6008
