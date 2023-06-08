import React from "react";
import { ShareIcon } from "@site/src/refine-theme/icons/share";
import { PageIcon } from "@site/src/refine-theme/icons/page";
import { Examples } from "../types/examples";

export const SHOW_CASES: Examples = [
    {
        title: "Refine Swag Store",
        description:
            "Complete headless e-commerce built on top of Medusa. Features a fully working solution with product listings, shopping cart and checkout.",
        image: "/examples/swag-store.jpg",
        image2x: "/examples/swag-store2x.jpg",
        buttons: [
            {
                text: "Demo",
                link: "https://store.refine.dev",
                icon: (props) => <ShareIcon {...props} />,
            },
        ],
        source: "https://github.com/refinedev/refine/tree/master/examples/store",
    },
    {
        title: "Finefoods Storefront",
        description:
            "Headless storefront example built with Tailwind CSS. Features product listings and a simple shopping cart. Supports SSR with NextJS.",
        image: "/examples/food-delivery.jpg",
        image2x: "/examples/food-delivery2x.jpg",
        buttons: [
            {
                text: "Demo",
                link: "https://example.refine.dev",
                icon: (props) => <ShareIcon {...props} />,
            },
        ],
        source: "https://github.com/refinedev/refine/tree/master/examples/finefoods-client",
    },
    {
        title: "Finefoods Ant Design Admin Panel",
        description:
            "Complete admin panel example built with Ant Design. Features authentication, dashboard and 10+ CRUD screens from orders to user management.",
        image: "/examples/antd-finefoods.jpg",
        image2x: "/examples/antd-finefoods2x.jpg",
        buttons: [
            {
                text: "Demo",
                link: "https://example.admin.refine.dev",
                icon: (props) => <ShareIcon {...props} />,
            },
        ],
        source: "https://github.com/refinedev/refine/tree/master/examples/finefoods-antd",
    },

    {
        title: "Finefoods Material Ui Admin Panel",
        description:
            "Complete admin panel example built with Material UI. Features authentication, dashboard and 10+ CRUD screens from orders to user management.",
        image: "/examples/mui-finefoods.jpg",
        image2x: "/examples/mui-finefoods2x.jpg",
        buttons: [
            {
                text: "Demo",
                link: "https://example.mui.admin.refine.dev",
                icon: (props) => <ShareIcon {...props} />,
            },
        ],
        source: "https://github.com/refinedev/refine/tree/master/examples/finefoods-material-ui",
    },
];

export const EXAMPLES: Examples = [
    {
        title: "Realworld Example",
        description: `"The mother of all demo apps" - Exemplary fullstack Medium.com clone powered by <strong>refine</strong>!`,
        image: "/examples/real-world.jpg",
        image2x: "/examples/real-world2x.jpg",
        buttons: [
            {
                text: "Demo",
                link: "https://refine.dev/docs/examples/real-world-refine-example",
                icon: (props) => <ShareIcon {...props} />,
            },
        ],
        source: "https://github.com/refinedev/real-world-example",
    },
    {
        title: "Win95 Style Admin Panel",
        description:
            "With <strong>refine</strong>'s headless feature, you can include any UI in your project and take full advantage of all its features without worrying about compatibility.",
        image: "/examples/win95.jpg",
        image2x: "/examples/win952x.jpg",
        buttons: [
            {
                text: "Blog",
                link: "https://refine.dev/blog/awesome-react-windows95-ui-with-refine",
                icon: (props) => <PageIcon {...props} />,
            },
        ],
        source: "https://github.com/refinedev/refine/tree/master/examples/blog-win95",
    },
    {
        title: "Invoice Generator App",
        description:
            "You can develop any web application or admin panel you want in a very short time with <strong>refine</strong> like an invoice app.",
        image: "/examples/invoice-generator.jpg",
        image2x: "/examples/invoice-generator2x.jpg",
        buttons: [
            {
                text: "Blog",
                link: "https://refine.dev/week-of-refine-strapi/",
                icon: (props) => <PageIcon {...props} />,
            },
        ],
        source: "https://github.com/refinedev/refine/tree/master/examples/refine-week-invoice-generator",
    },
    {
        title: "Refine Pixels!",
        description:
            "Our internal hackathon winner by  Ali Emir Şen. He used Supabase as a db and real-time API and it worked in perfect harmony with <strong>refine</strong>.",
        image: "/examples/refine-pixels.jpg",
        image2x: "/examples/refine-pixels2x.jpg",
        buttons: [
            {
                text: "Blog",
                link: "https://refine.dev/week-of-refine/",
                icon: (props) => <PageIcon {...props} />,
            },
            {
                text: "Demo",
                link: "https://pixels.refine.dev/",
                icon: (props) => <ShareIcon {...props} />,
            },
        ],
        source: "https://github.com/refinedev/refine/tree/master/examples/pixels",
        isExternal: true,
    },
    {
        title: "Multi-Tenancy Example with Strapi",
        description:
            "Cake House application using <strong>refine</strong> and Strapi-v4 and AppWrite.",
        image: "/examples/multi-tenancy-strapi.jpg",
        image2x: "/examples/multi-tenancy-strapi2x.jpg",
        buttons: [
            {
                text: "Blog",
                link: "https://refine.dev/docs/advanced-tutorials/multi-tenancy/strapi-v4/",
                icon: (props) => <PageIcon {...props} />,
            },
        ],
        source: "https://github.com/refinedev/refine/tree/next/examples/multi-tenancy-strapi",
    },
    {
        title: "Multi-Tenancy Example with Appwrite",
        description:
            "Cake House application using <strong>refine</strong> and Strapi-v4 and AppWrite.",
        image: "/examples/multi-tenancy-appwrite.jpg",
        image2x: "/examples/multi-tenancy-appwrite2x.jpg",
        buttons: [
            {
                text: "Blog",
                link: "https://refine.dev/docs/advanced-tutorials/multi-tenancy/appwrite/",
                icon: (props) => <PageIcon {...props} />,
            },
        ],
        source: "https://github.com/refinedev/refine/tree/next/examples/multi-tenancy-appwrite",
    },
];
