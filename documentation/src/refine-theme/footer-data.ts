import { FooterDiscordIcon } from "./icons/footer-discord";
import { FooterGithubIcon } from "./icons/footer-github";
import { FooterLinkedinIcon } from "./icons/footer-linkedin";
import { FooterRedditIcon } from "./icons/footer-reddit";
import { FooterTwitterIcon } from "./icons/footer-twitter";

export const menuItems = [
    {
        label: "Resources",
        items: [
            {
                label: "Getting Started",
                href: "/docs/getting-started/quickstart",
            },
            {
                label: "Tutorials",
                href: "/docs/tutorial/introduction/index/",
            },
            {
                label: "Blog",
                href: "/blog",
            },
        ],
    },
    {
        label: "Product",
        items: [
            {
                label: "Examples",
                href: "/docs/examples",
            },
            {
                label: "Integrations",
                href: "/integrations",
            },
            // {
            //     label: "Become an Expert",
            //     href: "/become-an-expert",
            // },
            // {
            //     label: "Cloud",
            //     href: "/cloud",
            // },
        ],
    },
    {
        label: "Company",
        items: [
            {
                label: "About",
                href: "/about",
            },
            {
                label: "Store",
                href: "https://store.refine.dev",
            },
            // {
            //     label: "Terms & Conditions",
            //     href: "/terms-and-conditions",
            // },
            {
                label: "Privacy Policy",
                href: "/privacy-policy",
            },
            {
                label: "License",
                href: "https://github.com/refinedev/refine/blob/next/LICENSE",
            },
        ],
    },
];

export const footerDescription = `refine is a React-based framework for the rapid development of web applications. It eliminates the repetitive tasks demanded by CRUD operations and provides industry standard solutions.`;

export const socialLinks = [
    {
        icon: FooterGithubIcon,
        href: "https://github.com/refinedev/refine",
    },
    {
        icon: FooterDiscordIcon,
        href: "https://discord.gg/refine",
    },
    {
        icon: FooterRedditIcon,
        href: "https://www.reddit.com/r/refine/",
    },
    {
        icon: FooterTwitterIcon,
        href: "https://twitter.com/refine_dev",
    },
    {
        icon: FooterLinkedinIcon,
        href: "https://www.linkedin.com/company/refine-dev",
    },
];
