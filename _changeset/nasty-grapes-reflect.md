---
"@pankod/refine-ably": minor
"@pankod/refine-airtable": minor
"@pankod/refine-altogic": minor
"@pankod/refine-antd": minor
"@pankod/refine-appwrite": minor
"@pankod/refine-cloud": minor
"@pankod/refine-core": minor
"@pankod/refine-demo-sidebar": minor
"@pankod/refine-graphql": minor
"@pankod/refine-hasura": minor
"@pankod/refine-kbar": minor
"@pankod/refine-mui": minor
"@pankod/refine-nestjsx-crud": minor
"@pankod/refine-nextjs-router": minor
"@pankod/refine-nhost": minor
"@pankod/refine-react-hook-form": minor
"@pankod/refine-react-location": minor
"@pankod/refine-react-router-v6": minor
"@pankod/refine-react-table": minor
"@pankod/refine-simple-rest": minor
"@pankod/refine-strapi": minor
"@pankod/refine-strapi-graphql": minor
"@pankod/refine-strapi-v4": minor
"@pankod/refine-supabase": minor
---

All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.
