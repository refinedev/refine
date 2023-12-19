"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

async function RefineTemplates() {
    return {
        name: "docusaurus-plugin-refine-templates",
        contentLoaded: async (args) => {
            const { content, actions } = args;
            const { addRoute, createData } = actions;

            await Promise.all(
                content.map(async (data) => {
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
exports.default = RefineTemplates;

const templates = [
    {
        slug: "crm-application",
        title: "CRM Application",
        description: `This is a complete CRM (Customer Relationship Management) example project built using [Refine](https://refine.dev/) and [Ant Design](https://ant.design/). It provides a set of tools and features to manage customer data, track interactions, and streamline business processes.

The application includes features such as dashboard analytics, a calendar for scheduling appointments, a scrum board for task management, and CRUD operations for managing companies, contacts, and quotes.

Refine is a React-based powerful framework for building low-code applications. It is primarily focused on implementing data-heavy apps such as internal tools, dashboards, admin panels, and storefronts. It comes with a core package that segregates app concerns like data handling, authentication, access control, etc., into React contexts. It also supports integration with industry standard backend systems such and UI frameworks. It is highly customizable and extensible.

### Features
 
- **Dashboard**: Gain insights into your business with interactive charts and analytics.
- **Calendar**: Schedule and manage appointments, meetings, and events.
- **Scrumboard**: Organize and track tasks using a Kanban-style board.
- **Companies**: Create, update, and delete company records.
- **Contacts**: Manage your customer contacts efficiently.
- **Quotes**: Generate and manage quotes for your clients.
- **Administration**: Configure application settings and user roles.`,
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-refine-crm.jpg",
        ],
        runOnYourLocalPath: "app-crm",
        liveDemo: "https://crm.refine.dev",
        github: "https://github.com/refinedev/refine/tree/master/examples/app-crm",
        reactPlatform: "Next.js",
        uiFramework: "ShadCN UI",
        dataProvider: "Supabase",
        authProvider: "Supabase",
    },
    {
        slug: "e-commerce-storefront",
        title: "E-Commerce Application Storefront",
        description: `Headless storefront example built with Tailwind CSS. Features product listings and a simple shopping cart. Supports SSR with NextJS.`,
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-storefront.jpg",
        ],
        runOnYourLocalPath: "finefoods-client",
        liveDemo: "https://example.refine.dev/",
        github: "https://github.com/refinedev/refine/tree/master/examples/finefoods-client",
        reactPlatform: "Next.js",
        uiFramework: "Headless",
        dataProvider: "Rest API",
        authProvider: "Custom",
    },
    {
        slug: "finefoods-material-ui",
        title: "Finefoods Material UI Admin Panel",
        description: `Complete admin panel example built with Material UI. Features authentication, dashboard and 10+ CRUD screens from orders to user management.`,
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-finefoods-material-ui.jpg",
        ],
        runOnYourLocalPath: "finefoods-material-ui",
        liveDemo: "https://example.mui.admin.refine.dev",
        github: "https://github.com/refinedev/refine/tree/master/examples/finefoods-material-ui",
        reactPlatform: "Vite",
        uiFramework: "Material UI",
        dataProvider: "Rest API",
        authProvider: "Custom",
    },
    {
        slug: "finefoods-ant-design",
        title: "Finefoods Ant Design Admin Panel",
        description: `Complete admin panel example built with Ant Design. Features authentication, dashboard and 10+ CRUD screens from orders to user management.`,
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-finefoods-ant-design.jpg",
        ],
        runOnYourLocalPath: "finefoods-antd",
        liveDemo: "https://example.admin.refine.dev",
        github: "https://github.com/refinedev/refine/tree/master/examples/finefoods-antd",
        reactPlatform: "Vite",
        uiFramework: "Ant Design",
        dataProvider: "Rest API",
        authProvider: "Custom",
    },
    {
        slug: "swag-store",
        title: "Swag Store",
        description: `
This is a complete eCommerce storefront app built with refine, Medusa.js, Next.js, and Stripe.

We were planning to build a swag store for our open source project called refine.

We had two options when it came to building this shop.

The first option was to deploy a ready-made solution like Shopify, and the second was to create a custom solution.

Since refine can be used to build eCommerce storefronts with SSR support, we started looking for Headless eCommerce solutions.
During this process, we met with the Medusa, and we decided that the solution offered by Medusajs fit us quite well.
Starting from this, we decided to use the Medusa commerce API and built the storefront app with refine and Next.js.

In that way, we could share complete eCommerce store solutions with the open source community. Also, it helps us to test our framework with a real-world use case.

We deployed our Medusa commerce API fastly without pain. First, we deployed our admin interface and created products, collections, and other stuff.
For the UI, we used [Vercel's eCommerce template](https://demo.vercel.store/). Since there is no payment step involved in Vercel's eCommerce template, we took advantage of the [nextjs-starter-medusa](https://github.com/medusajs/nextjs-starter-medusa) for checkout and account features.

So basically, we built a complete eCommerce storefront by combining Vercel's eCommerce template with [nextjs-starter-medusa](https://github.com/medusajs/nextjs-starter-medusa).

Currently, we are using this store and have already processed real shopping transactions with credit cards and gift codes.

The app includes the following features:
- Authentication & Authorization
- Product Listing
- Account information pages
- Product detail
- Shopping cart
- Payment with Stripe
- Gift Code feature
- Email send and verification
        `,
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-store.jpg",
        ],
        runOnYourLocalPath: "store",
        liveDemo: "https://store.refine.dev/",
        github: "https://github.com/refinedev/refine/tree/master/examples/store",
        reactPlatform: "Vite",
        uiFramework: "Ant Design",
        dataProvider: "Rest API",
        authProvider: "Custom",
    },
    {
        slug: "pixels",
        title: "Pixels",
        description: `
Our internal hackathon winner by  Ali Emir Şen. He used Supabase as a db and real-time API and it worked in perfect harmony with Refine.
        `,
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-pixels.jpg",
        ],
        runOnYourLocalPath: "pixels",
        liveDemo: "https://store.refine.dev/",
        github: "https://github.com/refinedev/refine/tree/master/examples/pixels",
        tutorial: "https://refine.dev/week-of-refine-supabase/",
        reactPlatform: "Vite",
        uiFramework: "Ant Design",
        dataProvider: "Supabase",
        authProvider: "Supabase",
    },
    {
        slug: "invoice-generator",
        title: "Invoice Generator",
        description: `
You can develop any web application or admin panel you want in a very short time with Refine like an invoice app.
        `,
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-invoice-generator.jpg",
        ],
        runOnYourLocalPath: "refine-week-invoice-generator",
        liveDemo: "https://invoice-generator.refine.dev/",
        github: "https://github.com/refinedev/refine/tree/master/examples/refine-week-invoice-generator",
        tutorial: "https://refine.dev/week-of-refine-strapi/",
        reactPlatform: "Vite",
        uiFramework: "Ant Design",
        dataProvider: "Strapi",
        authProvider: "Strapi",
    },
    {
        slug: "win-95-style-admin-panel",
        title: "Win95 Style Admin Panel",
        description: `
With Refine's headless feature, you can include any UI in your project and take full advantage of all its features without worrying about compatibility.
        `,
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-win95.jpg",
        ],
        runOnYourLocalPath: "blog-win95",
        liveDemo: "https://win95.refine.dev/",
        github: "https://github.com/refinedev/refine/tree/master/examples/blog-win95",
        tutorial:
            "https://refine.dev/blog/awesome-react-windows95-ui-with-refine/",
        reactPlatform: "Vite",
        uiFramework: "Headless",
        dataProvider: "Supabase",
        authProvider: "Supabase",
    },
    {
        slug: "realworld",
        title: "Realworld Example",
        description: `
"The mother of all demo apps" - Exemplary fullstack Medium.com clone powered by Refine!
        `,
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-realworld.jpg",
        ],
        runOnYourLocalPath: "real-world-example",
        liveDemo: "https://refine-real-world.netlify.app/",
        github: "https://github.com/refinedev/real-world-example",
        reactPlatform: "Vite",
        uiFramework: "Headless",
        dataProvider: "Rest API",
        authProvider: "Custom",
    },
    {
        slug: "multitenancy-strapi",
        title: "Multitenancy App with Strapi",
        description: `
Cake House application using Refine and Strapi.
        `,
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-multitenancy-strapi.jpg",
        ],
        runOnYourLocalPath: "multi-tenancy-strapi",
        liveDemo: "https://multi-tenancy-strapi.refine.dev",
        github: "https://github.com/refinedev/refine/tree/master/examples/multi-tenancy-strapi",
        tutorial:
            "https://refine.dev/docs/advanced-tutorials/multi-tenancy/strapi-v4/",
        reactPlatform: "Vite",
        uiFramework: "Ant Design",
        dataProvider: "Strapi",
        authProvider: "Strapi",
    },
    {
        slug: "multitenancy-appwrite",
        title: "Multitenancy App with Appwrite",
        description: `
Cake House application using Refine and Appwrite.
        `,
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-multitenancy-appwrite.jpg",
        ],
        runOnYourLocalPath: "multi-tenancy-appwrite",
        liveDemo: "https://multi-tenancy-appwrite.refine.dev",
        github: "https://github.com/refinedev/refine/tree/master/examples/multi-tenancy-appwrite",
        tutorial:
            "https://refine.dev/docs/advanced-tutorials/multi-tenancy/appwrite/",
        reactPlatform: "Vite",
        uiFramework: "Ant Design",
        dataProvider: "Appwrite",
        authProvider: "Appwrite",
    },
    {
        slug: "ant-design-template",
        title: "Ant Design template",
        description: `
Complete admin panel template built with Ant Design. Features authentication and CRUD screens.
        `,
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-ant-design-template.jpg",
        ],
        runOnYourLocalPath: "auth-antd",
        liveDemo:
            "https://codesandbox.io/p/sandbox/github/refinedev/refine/tree/master/examples/auth-antd",
        github: "https://github.com/refinedev/refine/tree/master/examples/auth-antd",
        tutorial: "https://refine.dev/docs/tutorial/introduction/index/",
        reactPlatform: "Vite",
        uiFramework: "Ant Design",
        dataProvider: "Rest API",
        authProvider: "Custom",
    },
    {
        slug: "material-ui-template",
        title: "Material UI template",
        description: `
Complete admin panel template built with Material UI. Features authentication and CRUD screens.
        `,
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-material-ui-template.jpg",
        ],
        runOnYourLocalPath: "auth-material-ui",
        liveDemo:
            "https://codesandbox.io/embed/github/refinedev/refine/tree/master/examples/auth-material-ui",
        github: "https://github.com/refinedev/refine/tree/master/examples/auth-material-ui",
        tutorial: "https://refine.dev/docs/tutorial/introduction/index/",
        reactPlatform: "Vite",
        uiFramework: "Material UI",
        dataProvider: "Rest API",
        authProvider: "Custom",
    },
    {
        slug: "mantine-template",
        title: "Mantine template",
        description: `
Complete admin panel template built with Mantine. Features authentication and CRUD screens.
        `,
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-mantine-template.jpg",
        ],
        runOnYourLocalPath: "auth-mantine",
        liveDemo:
            "https://codesandbox.io/embed/github/refinedev/refine/tree/master/examples/auth-mantine",
        github: "https://github.com/refinedev/refine/tree/master/examples/auth-mantine",
        tutorial: "https://refine.dev/docs/tutorial/introduction/index/",
        reactPlatform: "Vite",
        uiFramework: "Mantine",
        dataProvider: "Rest API",
        authProvider: "Custom",
    },
    {
        slug: "chakra-ui-template",
        title: "Chakra UI template",
        description: `
Complete admin panel template built with Chakra UI. Features authentication and CRUD screens.
        `,
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-chakra-ui-template.jpg",
        ],
        runOnYourLocalPath: "auth-chakra-ui",
        liveDemo:
            "https://codesandbox.io/embed/github/refinedev/refine/tree/master/examples/auth-chakra-ui",
        github: "https://github.com/refinedev/refine/tree/master/examples/auth-chakra-ui",
        tutorial: "https://refine.dev/docs/tutorial/introduction/index/",
        reactPlatform: "Vite",
        uiFramework: "Chakra UI",
        dataProvider: "Rest API",
        authProvider: "Custom",
    },
];
