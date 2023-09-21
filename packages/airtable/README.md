<div align="center" style="margin: 30px;">
    <a href="https://refine.dev">
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/refine_logo.png"  align="center" />
    </a>
</div>

<br/>
<br/>

<div align="center">refine is an open-source, headless React framework for developers building enterprise internal tools, admin panels, dashboards, B2B applications.

<br/>

It eliminates repetitive tasks in CRUD operations and provides industry-standard solutions for critical project components like **authentication**, **access control**, **routing**, **networking**, **state management**, and **i18n**. 

</div>
<br/>

<div align="center">
  <sub>Created by <a href="https://refine.dev">refine</a></sub>
</div>

<br/>

# Airtable integration for refine


[Airtable](https://www.airtable.com/) is a cloud-based platform for creating and sharing relational databases.

The [refine](https://refine.dev/) is **headless by design**, offering unlimited styling and customization options. Moreover, refine ships with ready-made integrations for [Ant Design](https://ant.design/), [Material UI](https://mui.com/material-ui/getting-started/overview/), [Mantine](https://mantine.dev/), and [Chakra UI](https://chakra-ui.com/) for convenience.

  refine has connectors for 15+ backend services, including REST API, [GraphQL](https://graphql.org/), and popular services like [Airtable](https://www.airtable.com/), [Strapi](https://strapi.io/), [Supabase](https://supabase.com/), [Firebase](https://firebase.google.com/), and [NestJS](https://nestjs.com/).





## Installation & Usage

```
npm install @refinedev/airtable
```

```
import dataProvider from "@refinedev/airtable";

const App = () => {
    return (
        <Refine
            dataProvider={dataProvider("API_KEY", "BASE_ID")}
            /* ... */
        >
            {/* ... */}
        </Refine>
    );
};
```

## Documentation
- For more detailed information and usage, refer to the [refine data provider documentation](https://refine.dev/docs/core/providers/data-provider).
- [Refer to documentation for more info about refine&#8594](https://refine.dev/docs/)
- [Step up to refine tutorials &#8594](https://refine.dev/docs/tutorial/introduction/index/)
