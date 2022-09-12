import { ShowCases, Examples } from "../types/examples";

import SvgAntd from "./example-icons/antd";
import SvgMui from "./example-icons/mui";

export const SHOW_CASES: ShowCases = [
    {
        title: "Storefront",
        description:
            "A simple customer facing app  built with Refine Headless Refine Headless > Refine Core + Next.js (SSR) + Tailwind CSS",
        buttons: [
            {
                text: "Swag Store",
                link: "https://store.refine.dev",
                image: "/examples/swag-store.png",
                default: true,
            },
            {
                text: "Food Delivery",
                link: "https://example.refine.dev",
                image: "/examples/food-delivery.png",
            },
        ],
    },
    {
        title: "Admin Panel",
        description:
            "A simple admin panel for a CMS-like application. Refine Core + Ant Design / Material UI",
        buttons: [
            {
                text: "Ant Design",
                link: "https://example.admin.refine.dev",
                image: "/examples/antd-finefoods.png",
                icon: SvgAntd,
                default: true,
            },
            {
                text: "Material UI",
                link: "https://example.mui.admin.refine.dev",
                image: "/examples/mui-finefoods.png",
                icon: SvgMui,
            },
        ],
    },
];

export const EXAMPLES: Examples = [
    {
        title: "RealWorld Example",
        description: `"The mother of all demo apps" - Exemplary fullstack Medium.com clone powered by refine!`,
        image: "/examples/real-world.png",
        button: {
            text: "View Demo",
            link: "https://refine.dev/docs/examples/real-world-refine-example",
        },
    },
    {
        title: "Win95 Style Admin Panel",
        description:
            "With refine's headless feature, you can include any UI in your project and take full advantage of all its features without worrying about compatibility.",
        image: "/examples/win95.png",
        button: {
            text: "Read Blog",
            link: "https://refine.dev/blog/awesome-react-windows95-ui-with-refine",
        },
    },
    {
        title: "Invoice Generator App",
        description:
            "You can develop any web application or admin panel you want in a very short time with <strong>refine</strong> like an invoice app.",
        image: "/examples/invoice-generator.png",
        button: {
            text: "Read Blog",
            link: "https://refine.dev/blog/awesome-react-windows95-ui-with-refine",
        },
    },
    {
        title: "Refeedback!",
        description:
            "Feedback Admin Panel with Strapi & Ant Design & <strong>refine</strong>",
        image: "/examples/refeedback.png",
        button: {
            text: "Read Blog",
            link: "https://refine.dev/blog/create-a-feedback-admin-panel-with-refine-and-strapi",
        },
    },
    {
        title: "E-mail Subscription Panel",
        description:
            "A web application that allows you to quickly create subscribers and send emails to your subscribers in a simple way.",
        image: "/examples/email-subscription.png",
        button: {
            text: "Read Blog",
            link: "https://refine.dev/blog/e-mail-subscription-panel-with-refine",
        },
    },
    {
        title: "Internal Issue Tracker",
        description:
            "A web application to create issue and tasks for your team members also priotize, tag and assign.",
        image: "/examples/issue-tracker.png",
        button: {
            text: "Read Blog",
            link: "https://refine.dev/blog/customizable-issue-tracker-with-refine-and-supabase",
        },
    },
    {
        title: "Next.js E-commerce App",
        description:
            "An e-commerce client developed with Strapi & Chakra UI & <strong>refine</strong>",
        image: "/examples/issue-tracker.png",
        button: {
            text: "Read Blog",
            link: "https://refine.dev/blog/handcrafted-nextjs-e-commerce-app-tutorial-strapi-chakra-ui",
        },
    },
    {
        title: "Multi-tenancy Example",
        description:
            "Cake House application using refine and Strapi-v4 and AppWrite.",
        image: "/examples/multi-tenancy.png",
        button: {
            text: "Read Blog",
            link: "https://refine.dev/docs/guides-and-concepts/multi-tenancy/appwrite",
        },
    },
    {
        title: "Refine Pixels!",
        description:
            "Our internal hackathon winner by  Ali Emir Şen. He used Supabase as a db and real-time API and it worked in perfect harmony with <strong>refine</strong>.",
        image: "/examples/refine-pixels.png",
        button: {
            text: "View Demo",
            link: "https://refine-pixels.vercel.app/canvases",
        },
    },
];
