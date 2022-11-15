import { IntegrationsType } from "../types/integrations";
import {
    Airtable,
    Altogic,
    Antd,
    Appwrite,
    Directus,
    Firebase,
    Graphql,
    Hasura,
    Mantine,
    Medusa,
    Mui,
    Nest,
    Nextjs,
    Nhost,
    Remix,
    Rest,
    Strapi,
    Supabase,
    React,
    HookForm,
    Kbar,
    Ably,
    Dp,
    Elide,
} from "./integration-icons";

export const integrations: IntegrationsType = {
    "ui-framework-packages": [
        {
            name: "Ant Design",
            icon: Antd,
            description:
                "<strong>Ant Design</strong> System UI Framework support. 20+ framework-specific <strong>hooks</strong> and  <strong>components</strong> incl. Table, Form, Select, Menu, Layout, Notification and CRUD components.",
            url: "https://www.npmjs.com/package/@pankod/refine-antd",
            status: "stable",
        },
        {
            name: "Material UI",
            icon: Mui,
            description:
                "<strong>Material UI</strong> Framework support. 20+ framework-specific hooks and  components  incl. DataGrid (+ Pro), AutoComplete, Menu, Layout, Notification and CRUD components.",
            url: "https://www.npmjs.com/package/@pankod/refine-mui",
            status: "stable",
        },
        {
            name: "Mantine UI",
            icon: Mantine,
            description:
                " <strong>Mantine UI</strong> Framework support. 20+ framework-specific hooks and components incl. Table, Form, AutoComplete, Menu, Layout, Notification and CRUD components.",
            url: "https://www.npmjs.com/package/@pankod/refine-mantine",
            status: "stable",
        },
    ],
    "data-provider-packages": [
        {
            name: "REST API Data Provider",
            icon: Rest,
            description:
                "Connect any custom <strong>REST API</strong> backend.",
            url: "https://www.npmjs.com/package/@pankod/refine-simple-rest",
            status: "stable",
        },
        {
            name: "GraphQL Data Provider",
            icon: Graphql,
            description: "Connect any custom <strong>GraphQL</strong> backend.",
            url: "https://www.npmjs.com/package/@pankod/refine-graphql",
            status: "stable",
        },
        {
            name: "NestJsX Crud Data Provider",
            icon: Nest,
            description:
                "Consume <strong>REST API's</strong> built with <strong>NestJs</strong>.",
            url: "https://www.npmjs.com/package/@pankod/refine-nestjsx-crud",
            status: "stable",
        },
        {
            name: "Strapi Data Provider",
            icon: Strapi,
            description:
                "<strong>Strapi</strong> connector for <strong>v4 REST API</strong>.",
            url: "https://www.npmjs.com/package/@pankod/refine-strapi",
            status: "stable",
        },
        {
            name: "Supabase Data Provider",
            icon: Supabase,
            description:
                "<strong>Supabase</strong> data provider. Supports <strong>Supabase Realtime</strong> for <strong>live/realtime</strong> projects.",
            url: "https://www.npmjs.com/package/@pankod/refine-supabase",
            status: "stable",
        },
        {
            name: "Hasura GraphQL Data Provider",
            icon: Hasura,
            description:
                "<strong>Hasura GraphQL</strong> data provider. Supports <strong>GraphQL Subscriptions</strong> for <strong>live/realtime</strong> projects.",
            url: "https://www.npmjs.com/package/@pankod/refine-hasura",
            status: "stable",
        },
        {
            name: "Nhost Data Provider",
            icon: Nhost,
            description:
                "<strong>Nhost</strong> data provider. Supports <strong>GraphQL Subscriptions</strong> for <strong>live/realtime</strong> projects.",
            url: "https://www.npmjs.com/package/@pankod/refine-nhost",
            status: "stable",
        },
        {
            name: "Appwrite Data Provider",
            icon: Appwrite,
            description:
                " Appwrite data provider. Supports <strong>Appwrite Realtime</strong> for <strong>live/realtime</strong> projects.",
            url: "https://www.npmjs.com/package/@pankod/refine-appwrite",
            status: "stable",
        },
        {
            name: "Airtable Data Provider",
            icon: Airtable,
            description: "Use <strong>Airtable</strong> as backend service.",
            url: "https://www.npmjs.com/package/@pankod/refine-airtable",
            status: "stable",
        },
        {
            name: "Medusa Data Provider",
            icon: Medusa,
            description:
                "<strong>Medusa</strong> connector for your e-commerce projects.",
            url: "https://www.npmjs.com/package/@pankod/refine-medusa",
            status: "stable",
        },
        {
            name: "Altogic Data Provider",
            icon: Altogic,
            description:
                "Connect backends created with <strong>Altogic</strong>",
            url: "https://www.npmjs.com/package/@pankod/refine-altogic",
            status: "stable",
        },
        {
            name: "Strapi - GraphQL Data Provider",
            icon: Strapi,
            description:
                "<strong>Strapi</strong> connector for <strong>GraphQL API</strong>.",
            url: "https://www.npmjs.com/package/@pankod/refine-strapi-graphql",
            status: "stable",
        },
        {
            name: "Firebase Data Provider",
            icon: Firebase,
            description: "Support for <strong>Firebase</strong> services.",
            url: "https://www.npmjs.com/package/refine-firebase",
            status: "stable",
            contributors: [
                {
                    name: "rturan29",
                    url: "https://github.com/rturan29",
                },
            ],
        },
        {
            name: "Directus Data Provider",
            icon: Directus,
            description:
                "Connector for backends created with <strong>Directus</strong>",
            url: "https://www.npmjs.com/package/@tspvivek/refine-directus",
            status: "stable",
            contributors: [
                {
                    name: "tspvivek",
                    url: "https://github.com/tspvivek",
                },
            ],
        },
        {
            name: "Elide Data Provider",
            icon: Elide,
            description:
                "Connector for backends created with <strong>Elide</strong>",
            url: "https://github.com/chirdeeptomar/refine-elide-rest",
            status: "stable",
            contributors: [
                {
                    name: "chirdeeptomar",
                    url: "https://github.com/chirdeeptomar",
                },
            ],
        },
    ],
    frameworks: [
        {
            name: "Next.js",
            icon: Nextjs,
            description: "Router Provider for <strong>Next.js</strong>",
            url: "https://www.npmjs.com/package/@pankod/refine-nextjs-router",
            status: "stable",
        },
        {
            name: "Remix",
            icon: Remix,
            description: "Router Provider for <strong>Remix</strong>",
            url: "https://www.npmjs.com/package/@pankod/refine-remix-router",
            status: "stable",
        },
    ],
    integrations: [
        {
            name: "React Table",
            icon: React,
            description:
                "<strong>React Table</strong> integration. Powerful tables & datagrids for your <strong>headless</strong> projects.",
            url: "https://www.npmjs.com/package/@pankod/refine-react-table",
            status: "stable",
        },
        {
            name: "React Hook Form",
            icon: HookForm,
            description:
                "<strong>React Hook Form</strong> integration. Extensible forms and validation for your projects.",
            url: "https://www.npmjs.com/package/@pankod/refine-react-hook-form",
            status: "stable",
        },
        {
            name: "kbar interface",
            icon: Kbar,
            description:
                "<strong>kbar</strong> integration. Add command/crtrl+k interfaces to your project.",
            url: "https://www.npmjs.com/package/@pankod/refine-kbar",
            status: "stable",
        },
    ],
    "live-providers": [
        {
            name: "Ably Live Provider",
            icon: Ably,
            description:
                "<strong>Ably</strong> support for for <strong>live/realtime</strong> projects.",
            url: "https://www.npmjs.com/package/@pankod/refine-ably",
            status: "stable",
        },
    ],
    "community-packages": [
        {
            name: "DP Customizer",
            icon: Dp,
            description: " Mix & match different data providers",
            url: "https://www.npmjs.com/package/data-provider-customizer",
            status: "stable",
            contributors: [
                {
                    name: "miyavsu",
                    url: "https://github.com/miyavsu-limited",
                },
            ],
        },
        {
            name: "Directus Data Provider",
            icon: Directus,
            description:
                "Connector for backends created with <strong>Directus</strong>",
            url: "https://www.npmjs.com/package/@tspvivek/refine-directus",
            status: "stable",
            contributors: [
                {
                    name: "tspvivek",
                    url: "https://github.com/tspvivek",
                },
            ],
        },
        {
            name: "Firebase Data Provider",
            icon: Firebase,
            description: "Support for <strong>Firebase</strong> services.",
            url: "https://www.npmjs.com/package/refine-firebase",
            status: "stable",
            contributors: [
                {
                    name: "rturan29",
                    url: "https://github.com/rturan29",
                },
            ],
        },
        {
            name: "Elide Data Provider",
            icon: Elide,
            description:
                "Connector for backends created with <strong>Elide</strong>",
            url: "https://github.com/chirdeeptomar/refine-elide-rest",
            status: "stable",
            contributors: [
                {
                    name: "chirdeeptomar",
                    url: "https://github.com/chirdeeptomar",
                },
            ],
        },
    ],
};
