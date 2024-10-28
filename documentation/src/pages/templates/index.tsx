import Head from "@docusaurus/Head";
import React, { type SVGProps } from "react";
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
  RestWithoutText,
  Strapi,
  Supabase,
} from "@site/src/assets/integration-icons";
import { TemplatesList } from "@site/src/refine-theme/templates-list";
import {
  type Filters,
  TemplatesFilters,
} from "@site/src/refine-theme/templates-filters";
import { TemplatesFilterButton } from "@site/src/refine-theme/templates-filter-button";
import { CommonDrawer } from "@site/src/refine-theme/common-drawer";
import { TemplateEdition } from "@site/src/types/integrations";

const Templates: React.FC = () => {
  const title = "Refine | Open-source Retool for Enterprise";

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = React.useState(false);

  const [filters, setFilters] = React.useState<Filters>({
    edition: TemplateEdition.All,
    uiFramework: [],
    backend: [],
  });

  const dataFiltered = React.useMemo(() => {
    const byEdition =
      filters.edition === "All"
        ? dataTemplates
        : dataTemplates.filter((item) => item.edition === filters.edition);

    if (!filters.uiFramework.length && !filters.backend.length) {
      return byEdition;
    }

    const byTechStack = byEdition.filter((item) => {
      return item.integrations.some((integration) => {
        return (
          filters.uiFramework.includes(integration.label) ||
          filters.backend.includes(integration.label)
        );
      });
    });

    return byTechStack;
  }, [filters]);

  const handleFilterChange = (
    filter: string | TemplateEdition,
    field: keyof typeof filters,
  ) => {
    setFilters((prev) => {
      if (field === "edition") {
        return {
          ...prev,
          [field]: filter as TemplateEdition,
        };
      }

      const hasFilter = prev[field].includes(filter);
      if (hasFilter) {
        return {
          ...prev,
          [field]: prev[field].filter((item) => item !== filter),
        };
      }

      return {
        ...prev,
        [field]: [...prev[field], filter],
      };
    });
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
                "w-full",
                "mx-auto",
                "px-2 landing-sm:px-8 landing-md:px-0",
                "pt-4",
                "landing-sm:pt-12",
                "landing-md:pt-0",
                "w-full max-w-[592px] landing-sm:max-w-[656px] landing-md:max-w-full",
              )}
            >
              <TemplatesHero />
              <TemplatesFilterButton
                className={clsx("flex landing-md:hidden", "mt-6")}
                onClick={() => {
                  setIsFilterDrawerOpen(true);
                }}
              />
            </div>
            <div
              className={clsx(
                "w-full max-w-[592px] landing-sm:max-w-[656px] landing-md:max-w-[896px] landing-lg:max-w-[1200px]",
                "flex",
                "items-start",
                "gap-6",
                "mx-auto",
                "mt-12",
                "relative",
                "not-prose",
              )}
            >
              <div
                className={clsx(
                  "hidden landing-md:flex",
                  "flex-col",
                  "not-prose",
                  "sticky top-24 left-0",
                )}
              >
                <h3
                  className={clsx(
                    "text-base",
                    "font-semibold",
                    "dark:text-gray-300 text-gray-900",
                    "pl-4",
                  )}
                >
                  Filter Templates
                </h3>
                <TemplatesFilters
                  svgId={"sider"}
                  onEditionChange={(edition) => {
                    handleFilterChange(edition, "edition");
                  }}
                  onBackendChange={(backend) => {
                    handleFilterChange(backend, "backend");
                  }}
                  onUIFrameworkChange={(uiFramework) => {
                    handleFilterChange(uiFramework, "uiFramework");
                  }}
                  className={clsx("min-w-[180px]", "mt-10")}
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
          variant="templates"
        >
          <div className={clsx("flex", "flex-col", "not-prose")}>
            <TemplatesFilters
              svgId={"drawer"}
              onEditionChange={(edition) => {
                handleFilterChange(edition, "edition");
              }}
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
    label: "Ant Design" | "Material UI" | "Headless" | "Chakra UI" | "Mantine";
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
  editions: [
    {
      label: "All",
      icon: null,
    },
    {
      label: "Enterprise",
      icon: null,
    },
    {
      label: TemplateEdition.Community,
      icon: null,
    },
  ],
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
        <RestWithoutText width={16} height={16} {...props} />
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
  to: string;
  edition: TemplateEdition;
  integrations: (Integration["uiFrameworks"] | Integration["backends"])[];
}[] = [
  {
    to: "/templates/crm-application",
    title: "CRM Application",
    description:
      "A comprehensive CRM app built using Refine, Ant Design, and GraphQL. It includes authentication, a dashboard, and over 10 CRUD interfaces, ranging from charts and sales kanban boards to user administration.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/refine-crm.jpg",
    edition: TemplateEdition.Enterprise,
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
    to: "/templates/hr-application",
    title: "HR Management App Example",
    description:
      "HR management app example built with Refine, demonstrating how quickly enterprise-level tools can be developed. This template features leave management, employee directory, and expense tracking.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/refine-hr.png",
    edition: TemplateEdition.Enterprise,
    integrations: [
      {
        label: "Material UI",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Antd width={16} height={16} {...props} />
        ),
      },
      {
        label: "Rest API",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <RestWithoutText width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/templates/multitenancy-strapi",
    title: "Multitenancy App with Strapi",
    description:
      "Implementing multitenancy architecture in Refine applications.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/multitenancy-strapi.jpg",
    edition: TemplateEdition.Enterprise,
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
    to: "/templates/next-js-tailwind",
    title: "E-Commerce Application Storefront",
    description:
      "A Headless storefront example built with Refine and Tailwind CSS. Features product listings and a simple shopping cart. Supports SSR with NextJS.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/finefoods-storefront.jpg",
    edition: TemplateEdition.Community,
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
          <RestWithoutText width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/templates/react-admin-panel",
    title: "B2B Admin Panel with Material UI",
    description:
      "A comprehensive Admin panel template built using Refine and Material UI demonstrating a food ordering system. It includes features such as authentication, a dashboard, and over 10 CRUD interfaces, ranging from orders to user management.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/finefoods-material-ui.jpg",
    edition: TemplateEdition.Community,
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
          <RestWithoutText width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/templates/react-admin-panel-ant-design",
    title: "B2B Internal tool with Ant Design",
    description:
      "A comprehensive Admin panel template built using Refine and Ant design demonstrating a food ordering system. It includes features such as authentication, a dashboard, and over 10 CRUD interfaces, ranging from orders to user management.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/finefoods-ant-design.jpg",
    edition: TemplateEdition.Community,
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
          <RestWithoutText width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/templates/next-js-ecommerce-store",
    title: "Swag Store",
    description:
      "A complete headless e-commerce template was built on top of Medusa with Refine. Features a fully working solution with product listings, a shopping cart, and checkout. Supports SSR with NextJS.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/swag-store.jpg",
    edition: TemplateEdition.Community,
    integrations: [
      {
        label: "Headless",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <Headless width={16} height={16} {...props} />
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
    to: "/templates/supabase-crud-app",
    title: "Pixels",
    description:
      "It is a funny app built with Refine and Supabase, along with a Realtime feature.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/pixels.jpg",
    edition: TemplateEdition.Community,
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
    to: "/templates/react-pdf-invoice-generator",
    title: "Invoice Generator - Internal Tool",
    description:
      "The Internal Tool template features a PDF Invoice Generator along with CRUD functionalities.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/invoicer.jpg",
    edition: TemplateEdition.Community,
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
    to: "/templates/win-95-style-admin-panel",
    title: "Win95 Style Admin Panel",
    description:
      "With the headless architecture of Refine, you have the flexibility to implement any custom design!",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/video-club.png",
    edition: TemplateEdition.Community,
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
    to: "/templates/react-crud-app",
    title: "Realworld Example",
    description: `"The mother of all demo apps" - Exemplary fullstack Medium.com clone powered by Refine!`,
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/realworld.jpg",
    edition: TemplateEdition.Community,
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
          <RestWithoutText width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/templates/ant-design-template",
    title: "Generic Internal Tool Template with Ant Design",
    description:
      "Complete internal tool template built with Ant Design. Features authentication and CRUD screens.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/ant-design-template.jpg",
    edition: TemplateEdition.Community,
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
          <RestWithoutText width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/templates/material-ui-template",
    title: "Generic Internal Tool Template with Material UI",
    description:
      "Complete internal tool template built with Material UI. Features authentication and CRUD screens.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/material-ui-template.jpg",
    edition: TemplateEdition.Community,
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
          <RestWithoutText width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/templates/chakra-ui-template",
    title: "Generic Internal Tool Template with Chakra UI",
    description:
      "Complete internal tool template built with Chakra UI. Features authentication and CRUD screens.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/chakra-ui-template.jpg",
    edition: TemplateEdition.Community,
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
          <RestWithoutText width={16} height={16} {...props} />
        ),
      },
    ],
  },
  {
    to: "/templates/mantine-template",
    title: "Generic Internal Tool Template with Mantine",
    description:
      "Complete internal tool template built with Mantine. Features authentication and CRUD screens.",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/templates/mantine-template.jpg",
    edition: TemplateEdition.Community,
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
          <RestWithoutText width={16} height={16} {...props} />
        ),
      },
    ],
  },
];

export default Templates;
