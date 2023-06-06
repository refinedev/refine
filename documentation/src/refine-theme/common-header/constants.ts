import { CloudIcon } from "../icons/cloud";
import {
    DocumentsIcon,
    IntegrationsIcon,
    TutorialIcon,
    ExamplesIcon,
    AwesomeIcon,
    UseCasesIcon,
    ContributeIcon,
    RefineWeekIcon,
    HackathonsIcon,
    AboutUsIcon,
    StoreIcon,
    MeetIcon,
} from "../icons/popover";

export type NavbarPopoverItemType = {
    isPopover: true;
    label: string;
    items: {
        label: string;
        description: string;
        link: string;
        icon: React.FC;
    }[];
};

export type NavbarItemType = {
    isPopover?: false;
    label: string;
    icon?: React.FC;
    href?: string;
};

export type MenuItemType = NavbarPopoverItemType | NavbarItemType;

export const MENU_ITEMS: MenuItemType[] = [
    {
        isPopover: true,
        label: "Open-source",
        items: [
            {
                label: "Documentation",
                description: "Everything you need to get started.",
                link: "/docs/",
                icon: DocumentsIcon,
            },
            {
                label: "Integrations",
                description: "Discover the refine ecosystem.",
                link: "/integrations",
                icon: IntegrationsIcon,
            },
            {
                label: "Tutorial",
                description: "Create your first refine application.",
                link: "/docs/tutorial/introduction/index/",
                icon: TutorialIcon,
            },
            {
                label: "Examples",
                description: "Ready-made snippets for your projects.",
                link: "/examples",
                icon: ExamplesIcon,
            },
            {
                label: "Awesome refine",
                description: "Repository of awesome things.",
                link: "https://github.com/refinedev/awesome-refine",
                icon: AwesomeIcon,
            },
        ],
    },
    {
        isPopover: false,
        label: "Cloud",
        icon: CloudIcon,
        href: "#cloud",
    },
    {
        isPopover: true,
        label: "Community",
        items: [
            {
                label: "Use cases",
                description: "Inspiring projects built with refine.",
                link: "/use-cases",
                icon: UseCasesIcon,
            },
            {
                label: "Contributing",
                description: "Join open-source contributors.",
                link: "/docs/contributing/",
                icon: ContributeIcon,
            },
            {
                label: "refineweeks",
                description: "Weekly projects to practice refine.",
                link: "/week-of-refine",
                icon: RefineWeekIcon,
            },
            {
                label: "Hackathons",
                description: "Compete in hackathons and earn prizes!",
                link: "#",
                icon: HackathonsIcon,
            },
        ],
    },
    {
        isPopover: true,
        label: "Company",
        items: [
            {
                label: "About refine",
                description: "Team & company information.",
                link: "/about",
                icon: AboutUsIcon,
            },
            {
                label: "Swag Store",
                description: "T-shirts, caps, and more!",
                link: "https://store.refine.dev",
                icon: StoreIcon,
            },
            {
                label: "Meet refine",
                description: "Call us for any questions",
                link: "https://refinedev.typeform.com/to/Z9wS06kE",
                icon: MeetIcon,
            },
        ],
    },
    {
        isPopover: false,
        label: "Blog",
        href: "/blog",
    },
];
