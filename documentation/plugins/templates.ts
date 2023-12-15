import type { Plugin } from "@docusaurus/types";

export default async function RefineTemplates(): Promise<Plugin> {
    return {
        name: "docusaurus-plugin-refine-templates",
        contentLoaded: async (args) => {
            const { content, actions } = args;
            const { addRoute, createData } = actions;

            await Promise.all(
                (content as typeof templates).map(async (data) => {
                    const json = await createData(
                        `templates-${data.slug}.json`,
                        JSON.stringify(data, null, 2),
                    );

                    addRoute({
                        path: `/templates/${data.slug}`,
                        component:
                            "@site/src/components/templates-detail-page/index",
                        exact: true,
                        modules: {
                            content: json,
                        },
                    });
                }),
            );
        },
        loadContent: async () => {
            return templates;
        },
    };
}

const templates = [
    {
        slug: "crm-application",
        title: "CRM Application",
        description: `
Comprehensive CRM App developed using **Refine**, **[Ant Design](https://ant.design/)** and **GraphQL**. It includes features like authentication, a dashboard, and over 10 CRUD interfaces ranging from charts and sales kanban boards to user administration.

Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
        `,
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/refine-crm-ss.jpg",
        ],
        runOnYourLocalPath: "app-crm",
        liveDemo: "https://crm.refine.dev",
        github: "https://github.com/refinedev/refine/tree/master/examples/app-crm",
        tutorial: "",
        reactPlatform: "Next.js",
        uiFramework: "ShadCN UI",
        dataProvider: "Supabase",
        authProvider: "Supabase",
    },
    {
        slug: "hr-application",
        title: "HR Application",
        description: `
HR
        `,
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/refine-crm-ss.jpg",
        ],
        runOnYourLocalPath: "app-crm",
        liveDemo: "https://crm.refine.dev",
        github: "https://github.com/refinedev/refine/tree/master/examples/app-crm",
        tutorial: "",
        reactPlatform: "Next.js",
        uiFramework: "ShadCN UI",
        dataProvider: "Supabase",
        authProvider: "Supabase",
    },
];
