---
"@refinedev/airtable": patch
"@refinedev/antd": patch
"@refinedev/appwrite": patch
"@refinedev/chakra-ui": patch
"@refinedev/cli": patch
"@refinedev/core": patch
"@refinedev/devtools": patch
"@refinedev/devtools-internal": patch
"@refinedev/devtools-shared": patch
"@refinedev/devtools-ui": patch
"@refinedev/graphql": patch
"@refinedev/hasura": patch
"@refinedev/inferencer": patch
"@refinedev/kbar": patch
"@refinedev/mantine": patch
"@refinedev/medusa": patch
"@refinedev/mui": patch
"@refinedev/nestjs-query": patch
"@refinedev/nestjsx-crud": patch
"@refinedev/nextjs-router": patch
"@refinedev/react-hook-form": patch
"@refinedev/react-router-v6": patch
"@refinedev/react-table": patch
"@refinedev/remix-router": patch
"@refinedev/simple-rest": patch
"@refinedev/strapi": patch
"@refinedev/strapi-v4": patch
"@refinedev/supabase": patch
"@refinedev/ui-tests": patch
"@refinedev/ui-types": patch
---

fix: type errors on typescript <5

Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.
