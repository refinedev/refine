---
"@refinedev/core": minor
---

feat: implement `generateDefaultDocumentTitle` function

This function generates a default document title based on the current route by following these rules (`resource` in this case is "Post"):

-   list -> `Posts | refine`
-   edit -> `#{id} Edit Post | refine`
-   show -> `#{id} Show Post | refine`
-   create -> `Create new Post | refine`
-   default (not a `resource`) -> `refine`
