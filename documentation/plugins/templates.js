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
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-refine-crm.jpg",
        ],
        runOnYourLocalPath: "app-crm",
        liveDemo: "https://example.crm.refine.dev/",
        github: "https://github.com/refinedev/refine/tree/master/examples/app-crm",
        reactPlatform: "Vite",
        uiFramework: "Ant Design",
        dataProvider: "Nestjs-query",
        authProvider: "Custom",
        description: `
This  CRM app example, built with Refine, demonstrates a complete solution for enterprise-level CRM internal tool needs. It has a wide range of functionalities for real-use cases, which are extensively utilized by enterprise companies.

The app connected to GraphQL API through Refine's Nestjs-query data provider, and its user interface is developed using Ant Design, which Refine offers built-in UI framework support. 

We built this template to demonstrate how the Refine framework simplifies and speeds up development. It is a valuable resource, offering insights into Refine's best practices and modern development techniques.

The source code of the CRM app is also open-source; feel free to use or inspect it to discover how Refine works. Being production-ready, you can either build your own CRM internal tool using it as a code base or directly implement it as is.


### Key Features:


- **Dashboard**: Overview of CRM activities, key metrics, and customer interactions.
- **Calendar**: Manage appointments and events.
- **Scrumboard-Project Kanban**: Streamline project management and task tracking.
- **Sales Pipeline**: Visualize sales stages and track lead conversions.
- **Companies**: Organize business contacts with detailed profiles.
- **Contacts**: Efficient management of individual customer interactions.
- **Quotes**: Create, send, and manage customer quotes.
- **Administration**: Customize CRM settings, user roles, and permissions.


This CRM app template can be used in for various app requirements like B2B applications, internal tools, admin panel, dashboard and all CRUD applications, providing a comprehensive platform for: 

- Human Resource Management (HRM) Tools
- IT Service Management (ITSM) Tools
- Network Monitoring Tools
- Risk Management Tools
- Customer Support Tools
- Financial Planning Systems
- Customer Analytics Tools
- Inventory Management Systems
- Supply Chain Management Tools
- Retail Management Systems
- Business Intelligence Tools
- Electronic Health Record (EHR) Systems
- Patient Management Systems
- Health Information Exchange (HIE) Systems
- Pharmacy Management Systems
`,
    },
    {
        slug: "next-js-tailwind",
        title: "E-Commerce Application Storefront",
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
        description: `
This is a template that can serve as an example for building React-based storefronts, admin panels, or internal tools using Refine. Implemented popular tools like Tailwind CSS and Next.js, which are highly demanded by the community.

### Key Features:

- With Refine's headless approach, we demonstrated how to apply a style of your choice, such as Tailwind CSS. 
- SSR support with Next.js. Refine supports SSR with Next.js and Remix. You can use this template as a starter point for Next.js-powered Refine apps.
- REST API implementation

The source code is also open-source; feel free to use or inspect it to discover how to Refine works with any custom designs & UI library and supports SSR with Next.js.`,
    },
    {
        slug: "react-admin-panel",
        title: "B2B Admin Panel with Material UI",
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
        description: `
This example of a React admin panel, built with Refine, provides a comprehensive solution for the needs of enterprise-level admin panels. It features a full range of functionalities typical in products used by enterprise companies.

The admin panel connects to a REST API using a Simple REST data provider. Its user interface is developed with Material UI, which Refine offers built-in UI framework support.

We built this template to showcase the efficiency and ease of using the Refine framework in development. It is a valuable resource, offering insights into Refine's best practices and modern development techniques. As it's ready for production, you can use this template as a foundation to build your own React admin panel or implement it as it is.

The template is open-source, so you can freely use or examine it to understand how Refine works.

### Key Features:

-   **Dashboard**: Get an overview of food ordering activities, track product performance, and view insightful charts.
-   **Orders**: Manage, track, and filter all customer orders.
-   **Users**: Administer customer and courier accounts and data.
-   **Stores**: View and manage the list of participating stores.
-   **Categories**: Categorize and organize menu items and store types.
-   **Couriers**: Monitor and manage courier activity and interactions.
-   **Reviews**: Handle customer feedback, review ratings, and respond to comments.

This admin panel template can be used for various app requirements like B2B applications, internal tools, admin panel, dashboard, and all CRUD applications, providing a comprehensive platform for managing order interactions, restaurant management, and sales processes.`,
    },
    {
        slug: "react-admin-panel-ant-design",
        title: "B2B Internal tool with Ant Design",
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
        description: `
This example of a B2B React admin panel, built with Refine, provides a comprehensive solution for the needs of enterprise-level internal tools. It features a full range of functionalities typical in products used by enterprise companies.

The admin panel connects to a REST API using a Simple REST data provider. Its user interface is developed with Ant Design, which Refine offers built-in UI framework support.

We built this template to showcase the efficiency and ease of using the Refine framework in development. It is a valuable resource, offering insights into Refine's best practices and modern development techniques. As it's ready for production, you can use this template as a foundation to build your own React admin panel or implement it as it is.

The template is open-source, so you can freely use or examine it to understand how Refine works.


### Key Features:

- **Dashboard**: Get an overview of food ordering activities, track product performance, and view insightful charts.
- **Orders**: Manage, track, and filter all customer orders.
- **Users**: Administer customer and courier accounts and data.
- **Stores**: View and manage the list of participating stores.
- **Categories**: Categorize and organize menu items and store types.
- **Couriers**: Monitor and manage courier activity and interactions.
- **Reviews**: Handle customer feedback, review ratings, and respond to comments.

This admin panel template can be used in for various app requirements like B2B applications, internal tools, admin panel, dashboard and all CRUD applications, providing a comprehensive platform for managing order interactions, restaurant management, and sales processes.`,
    },
    {
        slug: "next-js-ecommerce-store",
        title: "Swag Store",
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-store.jpg",
        ],
        runOnYourLocalPath: "store",
        liveDemo: "https://store.refine.dev/",
        github: "https://github.com/refinedev/refine/tree/master/examples/store",
        reactPlatform: "Next.js",
        uiFramework: "Ant Design",
        dataProvider: "Medusa",
        authProvider: "Medusa",
        description: `
This template is a comprehensive e-commerce storefront app created using Refine, Medusa.js, Next.js, and Stripe, encompassing all the necessary features for an e-commerce web application. Its source code is open-source, allowing you to freely use or explore it to gain a deeper understanding of how Refine integrates with Next.js and Tailwind CSS.

The app interfaces with the Medusa API through Refine's Medusa data provider, and its user interface is crafted with Tailwind CSS. This template is designed to showcase the effectiveness of the Refine framework in streamlining and accelerating the development process for storefront apps, providing an optimal approach to using Refine in storefront app development.

With its production-ready status, this template offers a solid foundation for building your own storefront, whether you choose to use it as a starting point or implement it directly as it is.


### Key Features:

- **Authentication & Authorization**: Securely manages user logins and permissions.
- **Product Listing**: Displays a catalog of products available for purchase.
- **Account Information Pages**: Allows users to view and edit their account details.
- **Product Detail**: Provides detailed information about each product, including descriptions, prices, and images.
- **Shopping Cart**: Enables customers to add products to a virtual cart and manage their selections before checkout.
- **Payment with Stripe**: Offers a secure payment system through Stripe for processing transactions.
- **Gift Code Feature**: Allows gift codes for discounts or special offers during the checkout process.
- **Email Send and Verification**: Handles the sending of emails for purposes like account verification and marketing, and verifies email addresses.
                `,
    },
    {
        slug: "supabase-crud-app",
        title: "Pixels",
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-pixels.jpg",
        ],
        runOnYourLocalPath: "pixels",
        liveDemo: "https://pixels.refine.dev/",
        github: "https://github.com/refinedev/refine/tree/master/examples/pixels",
        tutorial: "https://refine.dev/week-of-refine-supabase/",
        reactPlatform: "Vite",
        uiFramework: "Ant Design",
        dataProvider: "Supabase",
        authProvider: "Supabase",
        description: `
This example presents the RefineWeek series - a seven-part quickfire guide to help developers learn the ins and outs of Refine and Supabase's powerful capabilities and get going with Refine within a week.

The source code for this CRUD app is open-source, providing an opportunity for you to use or examine it to gain a deeper understanding of how Refine operates. The CRM application featured in this series utilizes a Supabase API through Refine's Supabase data provider, and its user interface is crafted using Ant Design.

This CRM application consumes a Supabase API through Refine's Supabase data provider, and its user interface is developed using Ant Design, which Refine offers built-in UI framework support.
 
We built this template to demonstrate how the Refine framework simplifies and speeds up development. It is a valuable resource, offering insights into Refine's best practices and modern development techniques. 

### Key Features:

- **Realtime Collaboration Features**: Implements real-time updates using Supabase's Realtime for collaborative canvas drawing.
- **Role-Based Authorization**: Incorporates user role-based authorization with different permissions for editors and admins.
- **Audit Logging**: Implements an audit log for tracking pixel drawing activities in both the client and admin apps.
        `,
    },
    {
        slug: "react-pdf-invoice-generator",
        title: "Invoice Generator - Internal Tool",
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
        description: `
The Invoicer is a template for an internal tool created as part of the #RefineWeek series, integrating Refine, Strapi, and Ant Design technologies. It's designed for users to manage company registrations, client and contact additions, task creations, and invoice issuance. A standout feature of this app is its ability to generate PDF invoices, enabling the creation of professional documents.

With its PDF generation feature, this open-source internal tool template is ideal for understanding Refine's capabilities. The app uses Strapi for data management, connecting through a Strapi data provider. Its interface is crafted using Ant Design, supported natively by Refine for a seamless UI experience.

We built this template to showcase the efficiency and ease of using the Refine framework in development along with third-party API management tools. It is a valuable resource, offering insights into Refine's best practices and modern development techniques. Being production-ready, this template can serve as a solid base for developing your own React-based internal tools, or it can be used as-is for immediate implementation.



### Key Features

- **Comprehensive CRUD Operations**: The app supports CRUD functionalities for companies, clients, contacts, missions, and invoices.
- **Authentication and Authorization**: Implements secure user authentication and role-based permissions using Refine's authProvider.
- **PDF Invoice Generation**: Includes the capability to generate and view PDF documents of invoices using the @react-pdf/renderer package.
        `,
    },
    {
        slug: "win-95-style-admin-panel",
        title: "Win95 Style Admin Panel",
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
        description: `
This Fun CRUD app example demonstrates how you can customize the Refine app design for specific needs. It is connected to a Supabase backend through Refine’s Supabase data provider and its user interface is developed using [React95](https://github.com/React95/React95).

The source code of the CRUD app is also open-source; feel free to use or inspect it to discover how Refine works along with external UI packages.
        `,
    },
    {
        slug: "react-crud-app",
        title: "Realworld Example",
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
        description: `
This RealWorld app template displays a comprehensive full-stack application created using Refine, including features like CRUD operations, user authentication, routing, and pagination, among others.

The RealWorld example standard, often called the "Mother of All Demo Apps," is a specification for building full-stack applications that demonstrate real-world usage of various frontend and backend technologies. This standard provides consistent requirements for creating functionally equivalent applications across different technology stacks. 

This RealWorld example aims to demonstrate the practical use of Refine in building standards and real-world applications, providing a more authentic and useful example than the usual "to-do list" demonstrations.

Since the source code of this RealWorld app is open-source, you have the freedom to use or explore it to gain insights into the workings of Refine and its integration with Next.js and Tailwind CSS.


### Key Features
- Authenticate users via JWT (login/register pages + logout button on settings page)
- CRUD users (sign up & settings page - no deleting required)
- CRUD Articles
- CRUD Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users
`,
    },
    {
        slug: "multitenancy-strapi",
        title: "Multitenancy App with Strapi",
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-multitenancy-strapi.jpg",
        ],
        runOnYourLocalPath: "multi-tenancy-strapi",
        liveDemo: "https://multi-tenancy-strapi.refine.dev",
        github: "https://github.com/refinedev/refine/tree/master/examples/multi-tenancy-strapi",
        tutorial:
            "https://refine.dev/docs/guides-concepts/multi-tenancy/#strapi",
        reactPlatform: "Vite",
        uiFramework: "Ant Design",
        dataProvider: "Strapi",
        authProvider: "Strapi",
        description: `
Multitenancy is a design approach where a single software instance on a server provides services to multiple clients at the same time. This CRUD app template is an excellent example of implementing multitenant architecture in Refine applications. It connects to a Strapi API using a Strapi data provider and features a user interface developed with Ant Design, which is natively supported by Refine.

This template was developed to demonstrate how the Refine framework can simplify and expedite the development of apps with enterprise-level needs. It's a valuable resource that offers insights into Refine's best practices and modern development techniques.

The source code of this multitenancy app is open-source, allowing you to use or inspect it to see how Refine can fulfill enterprise-grade application requirements. 
        `,
    },
    {
        slug: "multitenancy-appwrite",
        title: "Multitenancy App with Appwrite",
        images: [
            "https://refine.ams3.cdn.digitaloceanspaces.com/templates/detail-multitenancy-appwrite.jpg",
        ],
        runOnYourLocalPath: "multi-tenancy-appwrite",
        liveDemo: "https://multi-tenancy-appwrite.refine.dev",
        github: "https://github.com/refinedev/refine/tree/master/examples/multi-tenancy-appwrite",
        tutorial:
            "https://refine.dev/docs/guides-concepts/multi-tenancy/#appwrite",
        reactPlatform: "Vite",
        uiFramework: "Ant Design",
        dataProvider: "Appwrite",
        authProvider: "Appwrite",
        description: `
Multitenancy is a design approach where a single software instance on a server provides services to multiple clients at the same time. This CRUD app template is an excellent example of implementing multitenant architecture in Refine applications. It connects to a Appwrite API using a Appwrite data provider and features a user interface developed with Ant Design, which is natively supported by Refine.

This template was developed to demonstrate how the Refine framework can simplify and expedite the development of apps with enterprise-level needs. It's a valuable resource that offers insights into Refine's best practices and modern development techniques.

The source code of this multitenancy app is open-source, allowing you to use or inspect it to see how Refine can fulfill enterprise-grade application requirements. 
        `,
    },
    {
        slug: "ant-design-template",
        title: "Internal tool template with Ant Design ",
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
        description: `
Complete internal tool template built with Material UI. Features authentication and CRUD screens.
        `,
    },
    {
        slug: "material-ui-template",
        title: "Generic Internal Tool Template with Material UI",
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
        description: `
Complete internal tool template built with Material UI. Features authentication and CRUD screens.
        `,
    },
    {
        slug: "mantine-template",
        title: "Generic Internal Tool Template with Mantine",
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
        description: `
Complete internal tool template built with Mantine. Features authentication and CRUD screens.
        `,
    },
    {
        slug: "chakra-ui-template",
        title: "Generic Internal Tool Template with Chakra UI",
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
        description: `
Complete admin panel template built with Chakra UI. Features authentication and CRUD screens.
        `,
    },
];
