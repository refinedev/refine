<div align="center" style="margin: 30px;">
    <a href="https://refine.dev">
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/refine_logo.png"  align="center" />
    </a>
</div>
<br/>
<div align="center">refine is an open-source, headless React framework for developers building enterprise web applications.

It eliminates repetitive tasks in CRUD operations and provides industry-standard solutions for critical project components like **authentication**, **access control**, **routing**, **networking**, **state management**, and **i18n**. 

</div>
<br/>

<div align="center">
  <sub>Created by <a href="https://refine.dev">refine</a></sub>
</div>

<br/>

# Ably integration for refine

[Ably](https://ably.com/) reliably distributes realtime data to your users using the publish/subscribe messaging pattern over WebSocket connections. 

The [refine](https://refine.dev/) is **headless by design**, offering unlimited styling and customization options. Moreover, refine ships with ready-made integrations for [Ant Design](https://ant.design/), [Material UI](https://mui.com/material-ui/getting-started/overview/), [Mantine](https://mantine.dev/), and [Chakra UI](https://chakra-ui.com/) for convenience.

  refine has connectors for 15+ backend services, including REST API, [GraphQL](https://graphql.org/), and popular services like [Airtable](https://www.airtable.com/), [Strapi](https://strapi.io/), [Supabase](https://supabase.com/), [Firebase](https://firebase.google.com/), and [NestJS](https://nestjs.com/).




## Installation & Usage

```
npm install @refinedev/ably
```


```
import { liveProvider, Ably } from "@refinedev/ably";

export const ablyClient = new Ably.Realtime("YOUR_API_TOKEN");

const App = () => {
    return (
        <Refine
            liveProvider={liveProvider(ablyClient)}
            /* ... */
        >
            {/* ... */}
        </Refine>
    );
};
```
## Documentation

- For more detailed information and usage, refer to the [refine live provider documentation](https://refine.dev/docs/api-references/providers/live-provider/).

- Refer to refine & Ably tutorial on [official Ably docs](https://ably.com/tutorials/react-admin-panel-with-ably-and-refine).

- [Refer to documentation for more info about refine](https://refine.dev/docs/)
- [Step up to refine tutorials](https://refine.dev/docs/tutorial/introduction/index/)
