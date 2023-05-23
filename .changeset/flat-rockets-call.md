---
"@refinedev/core": minor
---

feat: implement `generateDefaultDocumentTitle` function

This function generates a default document title based on the current route by following these rules (`resource` in this case is "Post"):

-   list -> `Posts | Refine`
-   edit -> `#{id} Edit Post | Refine`
-   show -> `#{id} Show Post | Refine`
-   create -> `Create new Post | Refine`
-   default (not a `resource`) -> `Refine`
