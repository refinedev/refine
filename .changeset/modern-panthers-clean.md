---
"@refinedev/devtools": patch
---

refactor(devtools): check both parent and child nodes for representation

Previously, Refine Devtools's X-Ray feature looked for the representation of the components by looking at the parent nodes until a proper `stateNode` was found. This was problematic when the parent node was not a proper HTML element. A lack of type checking caused the feature to break in runtime in some cases.

Adding only a type check for the `stateNode` is not enough since there may be cases where there are no proper HTML elements in the parent nodes. This change adds a check for the child nodes as well. This way, the feature will look for the representation in both the parent and child nodes.

First check for a representation node will be done in the child nodes. If a proper representation is not found, an element will be searched in the parent nodes. If a no proper representation is found in the parent nodes, `document.body` will be used as the representation.

[Resolves #6219](https://github.com/refinedev/refine/issues/6219)
