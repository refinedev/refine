import React from "react";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import { LandingArrowRightIcon } from "./icons/landing-arrow-right";
import { ShowcaseWrapper } from "../components/landing/showcase-wrapper";

export const LandingHeroShowcaseSection = ({}) => {
    const [activeApp, setActiveApp] = React.useState(apps[0]);

    const ShowcaseComponent = React.useMemo(() => {
        return activeApp.showcase;
    }, [activeApp.name]);

    return (
        <div
            className={clsx(
                "bg-gray-50 dark:bg-gray-800",
                "flex",
                "flex-col",
                "w-full",
                "rounded-2xl landing-sm:rounded-[32px]",
                "gap-2 landing-sm:gap-4",
                "p-2 landing-sm:p-4",
                "relative",
            )}
        >
            <div className={clsx("flex", "w-full", "gap-2")}>
                <div
                    className={clsx(
                        "rounded-3xl",
                        "overflow-y-auto",
                        "scrollbar-hidden",
                        "flex",
                        "items-center",
                        "justify-start",
                        "gap-2",
                        "snap snap-x snap-mandatory",
                        "snap-mandatory",
                        "relative",
                    )}
                >
                    <div
                        className={clsx(
                            "hidden landing-sm:block",
                            "w-[244px]",
                            "rounded-3xl",
                            "h-full",
                            "bg-gray-200 dark:bg-gray-700",
                            "absolute",
                            "left-0",
                            "top-0",
                            "transition-transform",
                            "duration-150",
                            "ease-out",
                        )}
                        style={{
                            transform: `translateX(${
                                apps.findIndex(
                                    (f) => f.name === activeApp.name,
                                ) *
                                (244 + 8)
                            }px) translateZ(0px)`,
                        }}
                    />
                    {apps.map((app, index) => (
                        <button
                            key={app.name}
                            type="button"
                            onClick={(event) => {
                                setActiveApp(app);
                                // if index i >= 2
                                // then scroll to the right
                                event.currentTarget.parentElement?.scrollTo({
                                    left: index >= 2 ? index * (244 + 8) : 0,
                                    behavior: "smooth",
                                });
                            }}
                            className={clsx(
                                "z-[1]",
                                "snap-start",
                                "last:snap-end",
                                "appearance-none",
                                "focus:outline-none",
                                "border-none",
                                "flex-1",
                                "break-keep",
                                "whitespace-nowrap",
                                "landing-sm:min-w-[244px]",
                                "py-2",
                                "landing-sm:py-3.5",
                                "px-4",
                                "rounded-3xl",
                                "transition-colors",
                                "ease-in-out",
                                "duration-150",
                                activeApp.name !== app.name && "bg-transparent",
                                activeApp.name === app.name &&
                                    "bg-gray-200 dark:bg-gray-700",
                                activeApp.name !== app.name &&
                                    "text-gray-600 dark:text-gray-400",
                                activeApp.name === app.name &&
                                    "text-gray-900 dark:text-gray-0",
                                "landing-sm:bg-transparent",
                                "dark:landing-sm:bg-transparent",
                                "transition-colors",
                                "duration-150",
                                "ease-out",
                                "text-xs",
                                "landing-sm:text-sm",
                            )}
                        >
                            {app.name}
                        </button>
                    ))}
                </div>
                <a
                    href="#"
                    className={clsx(
                        "hover:!no-underline",
                        "w-40",
                        "hidden landing-lg:flex",
                        "py-3.5",
                        "pl-7",
                        "pr-4",
                        "rounded-3xl",
                        "flex",
                        "items-center",
                        "justify-center",
                        "gap-4",
                        "bg-transparent",
                        "border border-solid",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-0",
                    )}
                >
                    <span className="text-sm">See more</span>
                    <LandingArrowRightIcon />
                </a>
            </div>
            <div
                className={clsx(
                    "rounded-lg",
                    "landing-md:rounded-xl",
                    "landing-lg:rounded-2xl",
                    "overflow-hidden",
                    "border border-solid",
                    "border-gray-200 dark:border-transparent",
                    "relative",
                )}
            >
                <div
                    className={clsx(
                        "w-full",
                        "h-auto",
                        "aspect-[1168/736]",
                        "bg-gray-0",
                    )}
                />
                <AnimatePresence>
                    <ShowcaseComponent
                        className={clsx(
                            "absolute",
                            "left-0",
                            "top-0",
                            "w-full",
                            "rounded-lg",
                            "landing-md:rounded-xl",
                            "landing-lg:rounded-2xl",
                            "overflow-hidden",
                        )}
                        key={activeApp.name}
                    />
                </AnimatePresence>
                <div
                    className={clsx(
                        "hidden",
                        "landing-lg:block",
                        "absolute",
                        "left-0",
                        "bottom-0",
                        "right-0",
                        "w-full",
                        "h-24",
                        "from-gray-0",
                        "via-gray-0",
                        "to-transparent",
                        "bg-gradient-to-t",
                        "rounded-bl-lg rounded-br-lg",
                        "landing-md:rounded-bl-xl landing-md:rounded-br-xl",
                        "landing-lg:rounded-bl-2xl landing-lg:rounded-br-2xl",
                    )}
                />
            </div>
            <div
                className={clsx(
                    "flex",
                    "items-center",
                    "justify-center",
                    "landing-lg:-mb-4",
                )}
            >
                <a
                    href={activeApp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                        "landing-lg:animate-mini-bounce",
                        "landing-lg:mt-[-104px]",
                        "z-[3]",
                        "py-2 landing-sm:py-4",
                        "pl-4 pr-4 landing-sm:pl-6 landing-sm:pr-4",
                        "rounded-[32px] landing-sm:rounded-[48px]",
                        "flex",
                        "items-center",
                        "justify-center",
                        "gap-2",
                        "bg-refine-blue dark:bg-refine-cyan-alt",
                        "bg-opacity-10 dark:bg-opacity-10",
                        "landing-lg:bg-opacity-100 dark:landing-lg:bg-opacity-100",
                        "text-refine-blue dark:text-refine-cyan-alt",
                        "landing-lg:text-gray-0 dark:landing-lg:text-gray-900",
                    )}
                >
                    <span
                        className={clsx(
                            "text-xs landing-sm:text-base",
                            "font-semibold",
                        )}
                    >
                        See live demo
                    </span>
                    <LandingArrowRightIcon />
                </a>
            </div>
        </div>
    );
};

const ShowcaseCRM = ({ className }: { className?: string }) => {
    return (
        <ShowcaseWrapper
            className={className}
            render="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/base-render.png"
            highlights={[
                {
                    x: 224,
                    y: 88,
                    width: 296,
                    height: 136,
                    render: "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/number_of_companies.png",
                    codePosition: "right",
                    code: `
                                import { useOne } from "@refinedev/core";
                                const { data } = useOne({
                                    resource: "companies"
                                });
                                `,
                },
                {
                    x: 536,
                    y: 88,
                    width: 296,
                    height: 136,
                    render: "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/number_of_contacts.png",
                    codePosition: "bottom",
                    code: `
                                import { useOne } from "@refinedev/core";
                                const { data } = useOne({
                                    resource: "contacts"
                                });
                                `,
                },
                {
                    x: 848,
                    y: 88,
                    width: 296,
                    height: 136,
                    render: "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/total_deals.png",
                    codePosition: "bottom",
                    code: `
                                    import { useOne } from "@refinedev/core";
                                    const { data } = useOne({
                                        resource: "deals"
                                    });
                                `,
                },
                {
                    x: 12,
                    y: 88,
                    width: 200,
                    height: 376,
                    render: "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/sidebar_navigation.png",
                    codePosition: "right",
                    code: `
                                import { Routes } from "react-router-dom";
                                
                                <Routes path="Dashboard" element={<Dashboard />} />
                                <Routes path="Calendar" element={<Calendar />} />
                                <Routes path="Scrumboard" element={<Scrumboard />} />
                                <Routes path="Companies" element={<Companies />} />
                                <Routes path="Contacts" element={<Contacts />} />
                                <Routes path="Quotes" element={<Quotes />} />
                                <Routes path="Administration" element={<Administration />} />
                                `,
                },
                {
                    x: 224,
                    y: 240,
                    width: 296,
                    height: 472,
                    render: "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/upcoming_events.png",
                    codePosition: "right",
                    code: `
                    import { useList } from "@refinedev/core";
                    const { data } = useList({    
                        resource: "events",
                    });
                                `,
                },
                {
                    x: 536,
                    y: 240,
                    width: 608,
                    height: 472,
                    render: "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/latest_activities.png",
                    codePosition: "left",
                    code: `
                    import { useTable } from "@refinedev/core";
                    const { data } = useTable({
                        resource: "activities"
                    });
                                `,
                },
                {
                    x: 456,
                    y: 16,
                    width: 256,
                    height: 32,
                    render: "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/search_bar.png",
                    codePosition: "bottom",
                    code: `
                    import { RefineKbar } from "@refinedev/kbar";
                                `,
                },
                {
                    x: 1120,
                    y: 16,
                    width: 32,
                    height: 32,
                    render: "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/user_avatar.png",
                    codePosition: "left",
                    code: `
                    import { useGetIdentity } from "@refinedev/core";
                    const { data: identity } = useGetIdentity();
                                `,
                },
            ]}
        />
    );
};

const ShowcaseHR = ({ className }: { className?: string }) => {
    return <ShowcaseCRM className={className} />;
};

const ShowcaseECommerce = ({ className }: { className?: string }) => {
    return <ShowcaseCRM className={className} />;
};

const ShowcaseDevOps = ({ className }: { className?: string }) => {
    return <ShowcaseCRM className={className} />;
};

const apps = [
    {
        name: "CRM Application",
        link: "https://refine.dev/docs",
        showcase: ShowcaseCRM,
    },
    {
        name: "HR Application",
        link: "https://refine.dev/docs",
        showcase: ShowcaseHR,
    },
    {
        name: "E-Commerce Application",
        link: "https://refine.dev/docs",
        showcase: ShowcaseECommerce,
    },
    {
        name: "Dev-Ops Dashboard",
        link: "https://refine.dev/docs",
        showcase: ShowcaseDevOps,
    },
];
