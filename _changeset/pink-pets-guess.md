---
"@refinedev/graphql": patch
---

fix(graphql): issue with graphql liveprovider subscription query

For the graphql subscription, 'query' was used instead of 'subscription'.
