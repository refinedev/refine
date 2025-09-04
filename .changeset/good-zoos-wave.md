---
"@refinedev/codemod": patch
---

fix(codemod): correctly rename isLoading to isPending in mutation hooks

Codemod previously was expecting mutation hooks to have isPending. Since isPending is introduced with react-query@5 it wasn't correct.
