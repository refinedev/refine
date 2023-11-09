import React from "react";
import clsx from "clsx";
import Head from "@docusaurus/Head";

import { CommonLayout } from "@site/src/refine-theme/common-layout";
import { CommonHeader } from "@site/src/refine-theme/common-header";
import { BlogFooter } from "@site/src/refine-theme/blog-footer";
import { PricingInfoIcon } from "@site/src/refine-theme/icons/pricing-info";
import { PricingCheckIcon } from "@site/src/refine-theme/icons/pricing-check";
import { PricingTimesIcon } from "@site/src/refine-theme/icons/pricing-times";
import { PricingRainbowButton } from "@site/src/refine-theme/pricing-rainbow-button";
import {
    PricingAirtableIcon,
    PricingAntdIcon,
    PricingAuth0Icon,
    PricingAwsIcon,
    PricingAzureIcon,
    PricingBambooHrIcon,
    PricingChakraUiIcon,
    PricingCloudIcon,
    PricingElasticsearchIcon,
    PricingGoogleIcon,
    PricingGraphqlIcon,
    PricingHasuraIcon,
    PricingMantineIcon,
    PricingMaterialUiIcon,
    PricingMongoIcon,
    PricingOktaIcon,
    PricingOpenaiIcon,
    PricingPostgresIcon,
    PricingRestIcon,
    PricingScimIcon,
    PricingSheetsIcon,
    PricingStripeIcon,
    PricingSupabaseIcon,
    PricingTwilioIcon,
} from "@site/src/refine-theme/icons/pricing";
import { TinyArrowLeft } from "@site/src/refine-theme/icons/tiny-arrow-left";

const TableItemHeading = ({ children }) => {
    return (
        <div
            className={clsx(
                "px-4",
                "pb-4",
                "pt-6",
                "bg-refine-pricing-table-alt",
                "dark:bg-refine-pricing-table-alt-dark",
                "border-b",
                "border-b-gray-200",
                "dark:border-b-gray-700",
                "text-gray-900",
                "dark:text-gray-0",
                "text-base",
                "font-semibold",
            )}
        >
            {children}
        </div>
    );
};

const TableItemContent = ({ children }) => {
    return (
        <div
            className={clsx(
                "w-[144px]",
                "pricing-content-sm:w-[200px]",
                "pricing-content:w-[296px]",
                "py-3",
                "px-4",
                "text-gray-600",
                "dark:text-gray-400",
                "flex",
                "items-center",
                "justify-center",
                "gap-2",
            )}
        >
            {children}
        </div>
    );
};

const TableItemDescription = ({ children }) => {
    return (
        <div
            className={clsx(
                "flex-1",
                "text-base",
                "text-gray-700",
                "dark:text-gray-300",
                "py-3",
                "px-4",
                "border-r",
                "border-r-gray-200",
                "dark:border-r-gray-700",
                "flex",
                "items-center",
            )}
        >
            {children}
        </div>
    );
};

const TableItemContentGroup = ({ community, enterprise, activeTab }) => {
    return (
        <div
            className={clsx(
                "flex-shrink-0",
                "flex",
                "w-[144px]",
                "pricing-content-sm:w-auto",
                "overflow-hidden",
                "min-h-[62px]",
            )}
        >
            <div
                className={clsx(
                    "flex",
                    "flex-shrink-0",
                    "transition-transform",
                    "ease-in-out",
                    "duration-300",
                    activeTab === "enterprise" && "-translate-x-1/2",
                    "pricing-content-sm:translate-x-0",
                )}
            >
                <TableItemContent>{community}</TableItemContent>
                <div
                    className={clsx(
                        "w-px h-full",
                        "bg-gray-200",
                        "dark:bg-gray-700",
                        "flex-shrink-0",
                        "hidden",
                        "pricing-content-sm:block",
                    )}
                />
                <TableItemContent>{enterprise}</TableItemContent>
            </div>
        </div>
    );
};

const TableItem = ({
    description,
    community,
    enterprise,
    activeTab,
    isLast,
}) => {
    return (
        <div
            className={clsx(
                "flex",
                "w-full",
                !isLast && "border-b",
                !isLast && "border-b-gray-200",
                !isLast && "dark:border-b-gray-700",
            )}
        >
            <TableItemDescription>{description}</TableItemDescription>
            <TableItemContentGroup {...{ community, enterprise, activeTab }} />
        </div>
    );
};

const TableSection = ({ title, items, activeTab, isLast = false }) => {
    return (
        <>
            <TableItemHeading>{title}</TableItemHeading>
            {items.map((item, index) => (
                <TableItem
                    key={index}
                    activeTab={activeTab}
                    {...item}
                    isLast={isLast && index === items.length - 1}
                />
            ))}
        </>
    );
};

const PricingTableTabs = ({ activeTab, setActiveTab }) => {
    return (
        <div
            className={clsx(
                "flex",
                "flex-shrink-0",
                "rounded-tl-lg",
                "rounded-tr-lg",
                "border",
                "border-gray-200",
                "dark:border-gray-700",
                "border-b-0",
                "bg-gray-0",
                "dark:bg-gray-900",
                "w-[146px]",
                "overflow-hidden",
                "pricing-content-sm:w-auto",
                "relative",
            )}
        >
            <button
                type="button"
                onClick={() => {
                    if (activeTab === "community") return;
                    setActiveTab("community");
                }}
                className={clsx(
                    activeTab === "community" && "opacity-50",
                    "transition-opacity duration-200 ease-in-out",
                    "z-[1]",
                    "flex",
                    "pricing-content-sm:hidden",
                    "absolute",
                    "left-2",
                    "top-2",
                    "rounded-full",
                    "w-4 h-4",
                    "items-center justify-center",
                    "bg-gray-200 dark:bg-gray-700",
                    "text-gray-700 dark:text-gray-500",
                )}
            >
                <TinyArrowLeft />
            </button>
            <button
                type="button"
                onClick={() => {
                    if (activeTab === "enterprise") return;
                    setActiveTab("enterprise");
                }}
                className={clsx(
                    activeTab === "enterprise" && "opacity-50",
                    "transition-opacity duration-200 ease-in-out",
                    "z-[1]",
                    "flex",
                    "pricing-content-sm:hidden",
                    "absolute",
                    "right-2",
                    "top-2",
                    "rounded-full",
                    "w-4 h-4",
                    "items-center justify-center",
                    "bg-gray-200 dark:bg-gray-700",
                    "text-gray-700 dark:text-gray-500",
                )}
            >
                <TinyArrowLeft className="rotate-180" />
            </button>
            <div
                className={clsx(
                    "flex",
                    "flex-shrink-0",
                    "transition-transform",
                    "ease-in-out",
                    "duration-300",
                    activeTab === "enterprise" && "-translate-x-1/2",
                    "pricing-content-sm:translate-x-0",
                )}
            >
                <div
                    className={clsx(
                        "w-[144px]",
                        "pricing-content-sm:w-[200px]",
                        "pricing-content:w-[296px]",
                        "flex",
                        "flex-col",
                        "gap-4",
                        "px-2",
                        "py-4",
                        "text-xs",
                        "pricing-content-sm:text-base",
                        "pricing-content:text-xl",
                        "pricing-contnet:leading-8",
                        "text-gray-500",
                        "text-center",
                    )}
                >
                    <div className={clsx("font-normal")}>Community</div>
                    <div
                        className={clsx(
                            "font-semibold",
                            "py-0 pricing-content:py-2",
                            "my-1",
                        )}
                    >
                        Free Forever!
                    </div>
                </div>
                <div
                    className={clsx(
                        "w-px",
                        "h-full",
                        "bg-gray-200",
                        "dark:bg-gray-700",
                        "hidden",
                        "pricing-content-sm:block",
                        "flex-shrink-0",
                    )}
                />
                <div
                    className={clsx(
                        "w-[144px]",
                        "pricing-content-sm:w-[200px]",
                        "pricing-content:w-[296px]",
                        "flex",
                        "flex-col",
                        "gap-3",
                        "pricing-content:gap-4",
                        "px-2",
                        "py-3",
                        "pricing-content-sm:py-4",
                        "text-xs",
                        "pricing-content-sm:text-base",
                        "pricing-content:text-xl",
                        "pricing-contnet:leading-8",
                        "text-gray-500",
                        "text-center",
                    )}
                >
                    <div className={clsx("font-semibold")}>
                        🚀{" "}
                        <span
                            className={clsx(
                                "bg-pricing-text-bg-enterprise",
                                "text-transparent",
                                "bg-clip-text",
                            )}
                        >
                            Enterprise
                        </span>
                    </div>
                    <div
                        className={clsx(
                            "font-semibold",
                            "flex",
                            "items-center",
                            "justify-center",
                            "my-1",
                            "pricing-content-sm:my-0",
                        )}
                    >
                        <PricingRainbowButton href="https://s.refine.dev/enterprise" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const PricingHeader = () => {
    return (
        <div className={clsx("flex", "flex-col", "gap-4")}>
            <div
                className={clsx(
                    "text-[32px]",
                    "leading-[40px]",
                    "pricing-content-sm:text-[36px]",
                    "pricing-content-sm:leading-[48px]",
                    "pricing-content:text-[38px]",
                    "pricing-content:leading-[54px]",
                    "font-semibold",
                    "text-gray-900",
                    "dark:text-gray-0",
                    "text-center",
                )}
            >
                Supercharge Refine with{" "}
                <span
                    className={clsx(
                        "text-transparent",
                        "bg-pricing-text-bg-red",
                        "bg-clip-text",
                    )}
                >
                    enterprise-level
                </span>{" "}
                capabilites
            </div>
        </div>
    );
};

const PricingTableStickyHeader = ({ activeTab, setActiveTab }) => {
    return (
        <div
            className={clsx(
                "sticky",
                "z-[1]",
                "top-[56px]",
                "blog-lg:top-[64px]",
                "pt-4",
                "flex",
                "justify-end",
                "w-full",
                "border-b",
                "bg-gray-0",
                "dark:bg-gray-900",
                "border-b-gray-200",
                "dark:border-b-gray-700",
            )}
        >
            <div className={clsx("ml-px", "flex-1", "backdrop-blur-[3px]")} />
            <PricingTableTabs {...{ activeTab, setActiveTab }} />
        </div>
    );
};

const PricingTableSectionWrapper = ({ children }) => {
    return (
        <div
            className={clsx(
                "border",
                "border-t-0",
                "border-b-0",
                "border-gray-200",
                "dark:border-gray-700",
                "flex",
                "flex-col",
            )}
        >
            {children}
        </div>
    );
};

const PricingCheck = () => {
    return <PricingCheckIcon className="mt-[7px]" />;
};

const PricingCross = () => {
    return <PricingTimesIcon className="mx-[5px]" />;
};

const PricingBadge = ({ children }) => {
    return (
        <div
            className={clsx(
                "rounded-full",
                "w-6 h-6",
                "bg-gray-200 dark:bg-gray-600",
                "text-gray-900 dark:text-gray-0",
                "flex justify-center items-center",
                "text-[10px]",
                "leading-[12px]",
                "font-normal",
                "-ml-px",
            )}
        >
            {children}
        </div>
    );
};

const PricingText = ({ children, bold }: any) => {
    return (
        <div
            className={clsx(
                "text-center",
                "text-base",
                !bold && "text-gray-600",
                !bold && "dark:text-gray-400",
                bold && "text-gray-900",
                bold && "dark:text-gray-0",
                bold && "font-semibold",
            )}
        >
            {children}
        </div>
    );
};

const pricingData = [
    {
        title: "Licensing",
        items: [
            {
                description: "License",
                community: (
                    <PricingText>Open-source under MIT license</PricingText>
                ),
                enterprise: (
                    <PricingText bold>
                        Open-source under Enterprise license
                    </PricingText>
                ),
            },
        ],
    },
    {
        title: "Support",
        items: [
            {
                description: "Support Level",
                community: <PricingText>Community Support</PricingText>,
                enterprise: <PricingText bold>Priority Support</PricingText>,
            },
            {
                description: "Support Channels",
                community: <PricingText>Community Discord Server</PricingText>,
                enterprise: (
                    <PricingText bold>Private Slack Channel</PricingText>
                ),
            },
            {
                description: "Code Review by Core Team",
                community: <PricingCross />,
                enterprise: <PricingCheck />,
            },
            {
                description: "Trainings",
                community: <PricingCross />,
                enterprise: <PricingCheck />,
            },
        ],
    },
    {
        title: "Integrations",
        items: [
            {
                description: "Data Source Integrations",
                community: (
                    <div className="flex items-center justify-center flex-wrap gap-4">
                        <PricingRestIcon name="REST" />
                        <PricingGraphqlIcon name="GraphQL" />
                        <PricingAirtableIcon name="Airtable" />
                        <PricingHasuraIcon name="Hasura" />
                        <PricingSupabaseIcon name="Supabase" />
                        <PricingBadge>+10</PricingBadge>
                    </div>
                ),
                enterprise: (
                    <div className="flex items-center justify-center flex-wrap gap-4">
                        <PricingPostgresIcon name="Postgres" />
                        <PricingMongoIcon name="MongoDB" />
                        <PricingSheetsIcon name="Google Sheets" />
                        <PricingElasticsearchIcon name="ElasticSearch" />
                        <PricingBadge>+21</PricingBadge>
                    </div>
                ),
            },
            {
                description: "3rd Party API Integrations",
                community: <PricingCross />,
                enterprise: (
                    <div className="flex items-center justify-center flex-wrap gap-4">
                        <PricingCloudIcon name="Salesforce" />
                        <PricingStripeIcon name="Stripe" />
                        <PricingTwilioIcon name="Twilio" />
                        <PricingOpenaiIcon
                            name="OpenAI"
                            className="text-gray-1000 dark:text-gray-0"
                        />
                        <PricingAwsIcon
                            name="Amazon Web Services"
                            className="text-gray-1000 dark:text-gray-0"
                        />
                        <PricingBadge>+15</PricingBadge>
                    </div>
                ),
            },
            {
                description: "Access to Integrations",
                community: <PricingText>Frontend only</PricingText>,
                enterprise: <PricingText bold>Frontend + Backend</PricingText>,
            },
            {
                description: "Query Designer",
                community: <PricingCross />,
                enterprise: <PricingCheck />,
            },
            {
                description: "Data Mashup",
                community: <PricingCross />,
                enterprise: <PricingCheck />,
            },
        ],
    },
    {
        title: "User Interface",
        items: [
            {
                description: "Unlimited Customization",
                community: <PricingCheck />,
                enterprise: <PricingCheck />,
            },
            {
                description: "Headless UI",
                community: <PricingCheck />,
                enterprise: <PricingCheck />,
            },
            {
                description: "Component Library Support",
                community: (
                    <div className="flex items-center justify-center flex-wrap gap-4">
                        <PricingMaterialUiIcon name="Material UI" />
                        <PricingAntdIcon name="Ant Design" />
                        <PricingChakraUiIcon name="Chakra UI" />
                        <PricingMantineIcon name="Mantine" />
                    </div>
                ),
                enterprise: (
                    <div className="flex items-center justify-center flex-wrap gap-4">
                        <PricingMaterialUiIcon name="Material UI" />
                        <PricingAntdIcon name="Ant Design" />
                        <PricingChakraUiIcon name="Chakra UI" />
                        <PricingMantineIcon name="Mantine" />
                    </div>
                ),
            },
            {
                description: "Customer-facing Applications with SSR Support",
                community: <PricingCheck />,
                enterprise: <PricingCheck />,
            },
            {
                description: "Custom Enterprise Components",
                community: <PricingCross />,
                enterprise: <PricingCheck />,
            },
        ],
    },
    {
        title: "Authentication",
        items: [
            {
                description: "Authentication UI Components & Flow",
                community: <PricingCheck />,
                enterprise: <PricingCheck />,
            },
            {
                description: "Identity Provider",
                community: <PricingCross />,
                enterprise: <PricingCheck />,
            },
            {
                description: "Identity Management",
                community: <PricingCross />,
                enterprise: <PricingCheck />,
            },
            {
                description: "Social Sign-in",
                community: <PricingCross />,
                enterprise: <PricingCheck />,
            },
            {
                description: "Multi Factor Authentication",
                community: <PricingCross />,
                enterprise: <PricingCheck />,
            },
            {
                description: "OpenID/SAML Support",
                community: <PricingCross />,
                enterprise: <PricingCheck />,
            },
            {
                description: "3rd Party Integrations",
                community: <PricingCross />,
                enterprise: (
                    <div className="flex items-center justify-center flex-wrap gap-4">
                        <PricingAuth0Icon name="Auth0" />
                        <PricingOktaIcon
                            name="Okta"
                            className="text-gray-1000 dark:text-gray-0"
                        />
                        <PricingAzureIcon name="Azure" />
                        <PricingGoogleIcon name="Google" />
                        <PricingScimIcon
                            name="SCIM"
                            className="text-gray-1000 dark:text-gray-0"
                        />
                        <PricingBambooHrIcon name="BambooHR" />
                        <PricingBadge>+30</PricingBadge>
                    </div>
                ),
            },
            {
                description: "Directory Synchronization",
                community: <PricingCross />,
                enterprise: <PricingCheck />,
            },
        ],
    },
    {
        title: "Logging",
        items: [
            {
                description: "Audit Logs UI Flows",
                community: <PricingCheck />,
                enterprise: <PricingCheck />,
            },
            {
                description: "Audit Logs Provider",
                community: <PricingCross />,
                enterprise: <PricingCheck />,
            },
            {
                description: "Stream to SIEM Providers",
                community: <PricingCross />,
                enterprise: <PricingCheck />,
            },
        ],
    },
    {
        title: "Access Control",
        items: [
            {
                description: "ACL UI Components & Flows",
                community: <PricingCheck />,
                enterprise: <PricingCheck />,
            },
            {
                description: "ACL Provider",
                community: <PricingCross />,
                enterprise: <PricingCheck />,
            },
        ],
    },
    {
        title: "Deployments & Security",
        items: [
            {
                description: "Secure Deployments",
                community: <PricingCross />,
                enterprise: <PricingCheck />,
            },
            {
                description: "VPN-less Remote Access",
                community: <PricingCross />,
                enterprise: <PricingCheck />,
            },
            {
                description: "Anomaly Detection",
                community: <PricingCross />,
                enterprise: <PricingCheck />,
            },
        ],
    },
];

function Pricing() {
    const [activeTab, setActiveTab] = React.useState<
        "community" | "enterprise"
    >("community");
    const intervalRef = React.useRef<NodeJS.Timer>(null);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveTab((prev) =>
                prev === "community" ? "enterprise" : "community",
            );
        }, 5000);

        intervalRef.current = interval;

        return () => {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        };
    }, []);

    return (
        <>
            <Head>
                <html data-active-page="index" />
            </Head>
            <CommonLayout
                title={`refine | Build your React-based CRUD applications, without constraints!`}
                description="refine offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. It ships with Ant Design, an enterprise-level UI toolkit."
            >
                <CommonHeader hasSticky={true} />
                <div
                    className={clsx(
                        "px-4",
                        "w-full",
                        "pt-8",
                        "pricing-content-sm:pt-12",
                        "pricing-content:pt-20",
                    )}
                >
                    <div
                        className={clsx(
                            "max-w-screen-pricing-content-sm",
                            "landing-lg:max-w-screen-pricing-content",
                            "w-full",
                            "mx-auto",
                            "flex flex-col",
                            "gap-16",
                            "pb-16",
                            "pricing-content-sm:pb-24",
                            "pricing-content:pb-32",
                        )}
                    >
                        <PricingHeader />
                        <div className={clsx("relative", "w-full", "pt-4")}>
                            <PricingTableStickyHeader
                                activeTab={activeTab}
                                setActiveTab={(
                                    tab: "community" | "enterprise",
                                ) => {
                                    setActiveTab(tab);
                                    clearInterval(intervalRef.current);
                                }}
                            />
                            <PricingTableSectionWrapper>
                                {pricingData.map((section) => (
                                    <TableSection
                                        key={section.title}
                                        title={section.title}
                                        activeTab={activeTab}
                                        items={section.items}
                                    />
                                ))}
                            </PricingTableSectionWrapper>
                        </div>
                    </div>
                </div>
                <BlogFooter />
            </CommonLayout>
        </>
    );
}

export default Pricing;
