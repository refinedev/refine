import {
  AboutUsIcon,
  AwesomeIcon,
  BlogIcon,
  DocumentsIcon,
  ExamplesIcon,
  IntegrationsIcon,
  MeetIcon,
  NewBadgeIcon,
  TutorialIcon,
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
    label: "Resources",
    items: [
      {
        label: "Documentation",
        description: "Everything you need to get started.",
        link: "/core/docs/",
        icon: DocumentsIcon,
      },
      {
        label: "Tutorial",
        description: "Create your first Refine application.",
        link: "/core/tutorial/essentials/intro",
        icon: TutorialIcon,
      },
      {
        label: "Awesome Refine",
        description: "Repository of awesome things.",
        link: "https://github.com/refinedev/awesome-refine",
        icon: AwesomeIcon,
      },
      {
        label: "Integrations",
        description: "Discover the Refine ecosystem.",
        link: "/core/integrations",
        icon: IntegrationsIcon,
      },
      {
        label: "Templates",
        description: "Ready-made examples for your project",
        link: "/core/templates",
        icon: ExamplesIcon,
      },
      {
        label: "Blog",
        description: "Articles about web development.",
        link: "/blog",
        icon: BlogIcon,
      },
    ],
  },
  {
    isPopover: false,
    label: "Refine AI",
    href: "/ai",
    icon: NewBadgeIcon,
  },
  {
    isPopover: false,
    label: "Enterprise",
    href: "/core/enterprise",
  },
  {
    isPopover: true,
    label: "Company",
    items: [
      {
        label: "About Refine",
        description: "Team & company information.",
        link: "/core/about",
        icon: AboutUsIcon,
      },
      {
        label: "Meet Refine",
        description: "Call us for any questions",
        link: "https://form.typeform.com/to/Z9wS06kE",
        icon: MeetIcon,
      },
    ],
  },
];
