---
"@refinedev/nhost": major
---

feat: Added a namingConvention optional parameter to the Nhost data provider. Implemented logic to convert operators to camel case when the naming convention is set to 'graphql-default'. Since this is an optional parameter, existing consumers don't need to update any code. However, existing consumers can pass the namingConvention optional parameter with the value 'graphql-default'.

Pseudo Code:
const { data, total } = await dataProvider(nhost, { 
    namingConvention: 'graphql-default'
});