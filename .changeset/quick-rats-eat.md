---
"@refinedev/cli": patch
---

feat(cli): create base translation files for i18n provider in add provider command

Currently `refine add provider i18n` command is only creating a demo i18n provider implementation but misses the translation files. This PR adds the base translation files for the i18n provider which is used by Refine internally in hooks, notifications and components.

Now `locale/en.json` will be added with primarily used translation keys and values for the i18n provider.

[Resolves #5918](https://github.com/refinedev/refine/issues/5918)
