import { NavMenu } from "../types/nav-menu";
import {
    DocumentsIcon,
    IntegrationsIcon,
    TutorialIcon,
    ExamplesIcon,
    AwesomeIcon,
    ExpertIcon,
    ContributeIcon,
    UseCasesIcon,
    RefineWeekIcon,
    AboutUsIcon,
    RefineStoreIcon,
    RefineIcon,
} from "./popover-icons";

export const POPOVERMENUS: NavMenu[] = [
    {
        label: "Open-source",
        items: [
            {
                label: "Documents",
                description: "Everything you need to get started",
                link: "/docs/getting-started/overview/",
                icon: DocumentsIcon,
            },
            {
                label: "Integrations",
                description: "Discover the refine ecosystem",
                link: "/integrations",
                icon: IntegrationsIcon,
            },
            {
                label: "Tutorial",
                description: "Your first refine application",
                link: "/docs",
                icon: TutorialIcon,
            },
            // {
            //     label: "UI Frameworks",
            //     description: "Ant Design, Material UI, Mantine, Chakra UI...",
            //     link: "/",
            //     icon: UIFrameworksIcon,
            // },
            {
                label: "Examples",
                description: "Ready-made snippets for your project",
                link: "/examples",
                icon: ExamplesIcon,
            },
            {
                label: "Awesome refine",
                description: "Repo of awesome things",
                link: "https://github.com/refinedev/awesome-refine",
                icon: AwesomeIcon,
            },
        ],
        imageLink: "https://github.com/refinedev/refine",
        imageURL:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/landing/popovers/open-source.png",
    },
    {
        label: "Community",
        items: [
            {
                label: "Hire an expert",
                description: "Find a trusted partner",
                link: "/become-a-refine-expert",
                icon: ExpertIcon,
            },
            {
                label: "Contributing",
                description: "Join open-source contributors",
                link: "/docs/contributing/",
                icon: ContributeIcon,
            },
            {
                label: "Use cases",
                description: "Inspiring projects built with refine",
                link: "/use-cases",
                icon: UseCasesIcon,
            },
            {
                label: "refineweek",
                description: "The official refine event",
                link: "/week-of-refine",
                icon: RefineWeekIcon,
            },
        ],
        imageLink: "/examples",
        imageURL:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/landing/popovers/community.png",
    },
    {
        label: "Company",
        items: [
            {
                label: "About Us",
                description: "Team & company information",
                link: "/about",
                icon: AboutUsIcon,
            },
            {
                label: "Swag Store",
                description: "T-shirts, caps, and more",
                link: "https://store.refine.dev",
                icon: RefineStoreIcon,
            },
            {
                label: "Meet refine",
                description: "Call us for any questions",
                link: "https://calendly.com/d/cmk-5gb-b2p/meet-refine",
                icon: RefineIcon,
            },
        ],
        imageLink: "https://store.refine.dev",
        imageURL:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/landing/popovers/company.png",
    },
];
