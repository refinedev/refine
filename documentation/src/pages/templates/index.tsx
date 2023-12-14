import Head from "@docusaurus/Head";
import React, { SVGProps } from "react";
import { CommonHeader } from "@site/src/refine-theme/common-header";
import { CommonLayout } from "@site/src/refine-theme/common-layout";
import { LandingFooter } from "@site/src/refine-theme/landing-footer";
import clsx from "clsx";
import { TemplatesHero } from "@site/src/refine-theme/templates-hero";
import {
    Antd,
    Appwrite,
    Chakra,
    Graphql,
    Headless,
    Mantine,
    Medusa,
    Mui,
    Rest,
    ShadCnUI,
    Strapi,
    Supabase,
} from "@site/src/assets/integration-icons";
import { TemplatesList } from "@site/src/refine-theme/templates-list";
import { TemplatesFilters } from "@site/src/refine-theme/templates-filters";
import { FilterButton } from "@site/src/refine-theme/templates-filter-button";
import { CommonDrawer } from "@site/src/refine-theme/common-drawer";

const Enterprise: React.FC = () => {
    const title = "Refine | Open-source Retool for Enterprise";

    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = React.useState(false);

    const [filters, setFilters] = React.useState({
        uiFramework: null,
        backend: null,
    });

    const dataFiltered = React.useMemo(() => {
        if (!filters.uiFramework && !filters.backend) {
            return dataTemplates;
        }

        return dataTemplates.filter((item) => {
            return (
                item.integrations.some(
                    (integration) => integration.label === filters.uiFramework,
                ) ||
                item.integrations.some(
                    (integration) => integration.label === filters.backend,
                )
            );
        });
    }, [filters]);

    const handleFilterChange = (
        filter: string,
        field: keyof typeof filters,
    ) => {
        setFilters((prev) => ({
            ...prev,
            [field]: prev[field] === filter ? null : filter,
        }));
    };

    return (
        <>
            <Head>
                <html data-active-page="index" />
                <title>{title}</title>
                <meta property="og:title" content={title} />
                <link
                    rel="preload"
                    href="https://refine.new/embed-form"
                    as="document"
                />
            </Head>
            <CommonLayout description="Build React-based internal tools, admin panels, dashboards & B2B apps with unmatched flexibility.">
                <div>
                    <CommonHeader />
                    <div
                        className={clsx(
                            "flex flex-col",
                            "pb-12 landing-sm:pb-16 landing-md:pb-20",
                            "px-2 landing-sm:px-0",
                        )}
                    >
                        <div
                            className={clsx(
                                "pt-4",
                                "landing-sm:pt-12",
                                "landing-md:pt-20",
                                "landing-lg:pt-12",
                                "mx-auto",
                                "px-2 landing-sm:px-8",
                            )}
                        >
                            <TemplatesHero />
                            <FilterButton
                                className={clsx(
                                    "flex landing-md:hidden",
                                    "mt-6",
                                )}
                                onClick={() => {
                                    setIsFilterDrawerOpen(true);
                                }}
                            />
                        </div>
                        <div
                            className={clsx(
                                "w-full max-w-[592px] landing-sm:max-w-[656px] landing-md:max-w-[896px] landing-lg:max-w-[1200px]",
                                "flex",
                                "gap-6",
                                "mx-auto",
                                "mt-16",
                                "not-prose",
                            )}
                        >
                            <div
                                className={clsx(
                                    "hidden landing-md:flex",
                                    "flex-col",
                                    "not-prose",
                                )}
                            >
                                <h3
                                    className={clsx(
                                        "text-base",
                                        "font-semibold",
                                        "dark:text-gray-300 text-gray-900",
                                    )}
                                >
                                    Filter Templates
                                </h3>
                                <TemplatesFilters
                                    svgId={"sider"}
                                    onBackendChange={(backend) => {
                                        handleFilterChange(backend, "backend");
                                    }}
                                    onUIFrameworkChange={(uiFramework) => {
                                        handleFilterChange(
                                            uiFramework,
                                            "uiFramework",
                                        );
                                    }}
                                    className={clsx("min-w-[180px]")}
                                    selected={filters}
                                    data={dataFilters}
                                />
                            </div>
                            <TemplatesList data={dataFiltered} />
                        </div>
                    </div>
                    <LandingFooter />
                </div>
                <CommonDrawer
                    onClose={() => setIsFilterDrawerOpen(false)}
                    open={isFilterDrawerOpen}
                    title="Filter Templates"
                >
                    <div className={clsx("flex", "flex-col", "not-prose")}>
                        <TemplatesFilters
                            svgId={"drawer"}
                            onBackendChange={(backend) => {
                                handleFilterChange(backend, "backend");
                            }}
                            onUIFrameworkChange={(uiFramework) => {
                                handleFilterChange(uiFramework, "uiFramework");
                            }}
                            className={clsx("min-w-[180px]")}
                            selected={filters}
                            data={dataFilters}
                        />
                    </div>
                </CommonDrawer>
            </CommonLayout>
        </>
    );
};

type Integration = {
    uiFrameworks: {
        label:
            | "Ant Design"
            | "Material UI"
            | "Headless"
            | "Chakra UI"
            | "ShadCN UI"
            | "Mantine";
        icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    };
    backends: {
        label:
            | "Supabase"
            | "Rest API"
            | "GraphQL"
            | "Strapi"
            | "Appwrite"
            | "Medusa";
        icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    };
};

const dataFilters = {
    uiFrameworks: [
        {
            label: "Ant Design",
            icon: (props: SVGProps<SVGSVGElement>) => (
                <Antd width={16} height={16} {...props} />
            ),
        },
        {
            label: "Material UI",
            icon: (props: SVGProps<SVGSVGElement>) => (
                <Mui width={16} height={16} {...props} />
            ),
        },
        {
            label: "Headless",
            icon: (props: SVGProps<SVGSVGElement>) => (
                <Headless width={16} height={16} {...props} />
            ),
        },
        {
            label: "Chakra UI",
            icon: (props: SVGProps<SVGSVGElement>) => (
                <Chakra width={16} height={16} {...props} />
            ),
        },
        {
            label: "ShadCN UI",
            icon: (props: SVGProps<SVGSVGElement>) => (
                <ShadCnUI width={16} height={16} {...props} />
            ),
        },
        {
            label: "Mantine",
            icon: (props: SVGProps<SVGSVGElement>) => (
                <Mantine width={16} height={16} {...props} />
            ),
        },
    ],
    backends: [
        {
            label: "Supabase",
            icon: (props: SVGProps<SVGSVGElement>) => (
                <Supabase width={16} height={16} {...props} />
            ),
        },
        {
            label: "Rest API",
            icon: (props: SVGProps<SVGSVGElement>) => (
                <Rest width={16} height={16} {...props} />
            ),
        },
        {
            label: "GraphQL",
            icon: (props: SVGProps<SVGSVGElement>) => (
                <Graphql width={16} height={16} {...props} />
            ),
        },
        {
            label: "Strapi",
            icon: (props: SVGProps<SVGSVGElement>) => (
                <Strapi width={16} height={16} {...props} />
            ),
        },
        {
            label: "Appwrite",
            icon: (props: SVGProps<SVGSVGElement>) => (
                <Appwrite width={16} height={16} {...props} />
            ),
        },
        {
            label: "Medusa",
            icon: (props: SVGProps<SVGSVGElement>) => (
                <Medusa width={16} height={16} {...props} />
            ),
        },
    ],
};

const dataTemplates: {
    title: string;
    description: string;
    image: string;
    integrations: (Integration["uiFrameworks"] | Integration["backends"])[];
}[] = [
    {
        title: "CRM Application",
        description:
            "Comprehensive CRM App developed using refine, Ant Design and GraphQL. It includes features like authentication, a dashboard, and over 10 CRUD interfaces ranging from charts and sales kanban boards to user administration.",
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/templates/refine-crm.jpg",
        integrations: [
            {
                label: "Ant Design",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Antd width={16} height={16} {...props} />
                ),
            },
            {
                label: "GraphQL",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Graphql width={16} height={16} {...props} />
                ),
            },
        ],
    },
    {
        title: "HR Application",
        description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.",
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/templates/refine-hr.jpg",
        integrations: [
            {
                label: "ShadCN UI",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <ShadCnUI width={16} height={16} {...props} />
                ),
            },
            {
                label: "Rest API",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Rest width={16} height={16} {...props} />
                ),
            },
        ],
    },
    {
        title: "DevOps Dashboard",
        description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.",
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/templates/refine-k8s.jpg",
        integrations: [
            {
                label: "Ant Design",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Antd width={16} height={16} {...props} />
                ),
            },
            {
                label: "Supabase",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Supabase width={16} height={16} {...props} />
                ),
            },
        ],
    },
    {
        title: "E-Commerce Application Storefront",
        description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.",
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/templates/finefoods-storefront.jpg",
        integrations: [
            {
                label: "Headless",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Headless width={16} height={16} {...props} />
                ),
            },
            {
                label: "Rest API",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Rest width={16} height={16} {...props} />
                ),
            },
        ],
    },
    {
        title: "E-Commerce Application with Material UI",
        description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.",
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/templates/finefoods-material-ui.jpg",
        integrations: [
            {
                label: "Material UI",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Mui width={16} height={16} {...props} />
                ),
            },
            {
                label: "Rest API",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Rest width={16} height={16} {...props} />
                ),
            },
        ],
    },
    {
        title: "E-Commerce Application with Antd Design",
        description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.",
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/templates/finefoods-ant-design.jpg",
        integrations: [
            {
                label: "Ant Design",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Antd width={16} height={16} {...props} />
                ),
            },
            {
                label: "Rest API",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Rest width={16} height={16} {...props} />
                ),
            },
        ],
    },
    {
        title: "Swag Store",
        description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.",
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/templates/swag-store.jpg",
        integrations: [
            {
                label: "Headless",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Antd width={16} height={16} {...props} />
                ),
            },
            {
                label: "Medusa",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Medusa width={16} height={16} {...props} />
                ),
            },
        ],
    },
    {
        title: "Pixels",
        description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.",
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/templates/pixels.jpg",
        integrations: [
            {
                label: "Ant Design",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Antd width={16} height={16} {...props} />
                ),
            },
            {
                label: "Supabase",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Supabase width={16} height={16} {...props} />
                ),
            },
        ],
    },
    {
        title: "Invoice Generator",
        description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.",
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/templates/invoicer.jpg",
        integrations: [
            {
                label: "Ant Design",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Antd width={16} height={16} {...props} />
                ),
            },
            {
                label: "Strapi",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Strapi width={16} height={16} {...props} />
                ),
            },
        ],
    },
    {
        title: "Win95 Style Admin Panel",
        description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.",
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/templates/win95.jpg",
        integrations: [
            {
                label: "Headless",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Headless width={16} height={16} {...props} />
                ),
            },
            {
                label: "Supabase",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Supabase width={16} height={16} {...props} />
                ),
            },
        ],
    },
    {
        title: "Realworld Example",
        description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.",
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/templates/realworld.jpg",
        integrations: [
            {
                label: "Headless",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Antd width={16} height={16} {...props} />
                ),
            },
            {
                label: "Rest API",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Rest width={16} height={16} {...props} />
                ),
            },
        ],
    },
    {
        title: "Multitenancy App with Strapi",
        description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.",
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/templates/multitenancy-strapi.jpg",
        integrations: [
            {
                label: "Headless",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Antd width={16} height={16} {...props} />
                ),
            },
            {
                label: "Strapi",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Strapi width={16} height={16} {...props} />
                ),
            },
        ],
    },
    {
        title: "Multitenancy App with Appwrite",
        description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.",
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/templates/multitenancy-appwrite.jpg",
        integrations: [
            {
                label: "Headless",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Antd width={16} height={16} {...props} />
                ),
            },
            {
                label: "Appwrite",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Appwrite width={16} height={16} {...props} />
                ),
            },
        ],
    },
    {
        title: "Ant Design Template",
        description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.",
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/templates/ant-design-template.jpg",
        integrations: [
            {
                label: "Ant Design",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Antd width={16} height={16} {...props} />
                ),
            },
            {
                label: "Rest API",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Rest width={16} height={16} {...props} />
                ),
            },
        ],
    },
    {
        title: "Material UI Template",
        description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.",
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/templates/material-ui-template.jpg",
        integrations: [
            {
                label: "Material UI",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Mui width={16} height={16} {...props} />
                ),
            },
            {
                label: "Rest API",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Rest width={16} height={16} {...props} />
                ),
            },
        ],
    },
    {
        title: "Chakra UI Template",
        description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.",
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/templates/chakra-ui-template.jpg",
        integrations: [
            {
                label: "Chakra UI",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Chakra width={16} height={16} {...props} />
                ),
            },
            {
                label: "Rest API",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Rest width={16} height={16} {...props} />
                ),
            },
        ],
    },
    {
        title: "Mantine Template",
        description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.",
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/templates/mantine-template.jpg",
        integrations: [
            {
                label: "Mantine",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Mantine width={16} height={16} {...props} />
                ),
            },
            {
                label: "Rest API",
                icon: (props: SVGProps<SVGSVGElement>) => (
                    <Rest width={16} height={16} {...props} />
                ),
            },
        ],
    },
];

export default Enterprise;
