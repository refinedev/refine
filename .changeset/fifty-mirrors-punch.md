---
"@refinedev/rest": minor
---

fix(rest): make `getMany` method optional in data provider

The `getMany` method is no longer provided by default. Previously, a default implementation was included, but it has been removed to make the method truly optional. Users who need the `getMany` functionality must now explicitly define it in their data provider configuration.
