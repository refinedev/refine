import React, { FC, useState } from "react";
import clsx from "clsx";
import { useColorMode } from "@docusaurus/theme-common";
import {
    AuthenticationIcon,
    ChartsIcon,
    DataTablesIcon,
    FormsIcon,
    ListIcon,
    WizardsIcon,
} from "../components/landing/icons";

type Props = {
    className?: string;
};

export const LandingSweetSpot: FC<Props> = ({ className }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeListItem = list[activeIndex];

    const { colorMode } = useColorMode();
    const isDarkTheme = colorMode === "dark";

    return (
        <div className={clsx(className, "w-full")}>
            <div
                className={clsx("not-prose", "w-full", "px-4 landing-md:px-10")}
            >
                <h2
                    className={clsx(
                        "text-2xl landing-sm:text-[32px]",
                        "tracking-tight",
                        "text-start",
                        "p-0",
                        "dark:text-gray-0 text-gray-900",
                    )}
                >
                    The{" "}
                    <span
                        className={clsx(
                            "font-semibold",
                            "dark:text-refine-cyan-alt dark:drop-shadow-[0_0_30px_rgba(71,235,235,0.25)]",
                            "text-refine-indigo drop-shadow-[0_0_30px_rgba(51,51,255,0.3)]",
                        )}
                    >
                        sweet spot
                    </span>{" "}
                    between low-code and full-code.
                </h2>
                <p
                    className={clsx(
                        "mt-4 landing-sm:mt-6",
                        "max-w-md",
                        "text-base",
                        "dark:text-gray-400 text-gray-600",
                    )}
                >
                    Drag-and-drop tools shine initially, but collapse under the
                    weight of complexity. refine offers comparable speed at the
                    start and infinite scaling in the long run.
                </p>
            </div>

            <div className={clsx("mt-8 landing-sm:mt-12 landing-lg:mt-20")}>
                <div
                    className={clsx(
                        "h-[752px] landing-sm:h-[874px] landing-md:h-[984px] landing-lg:h-[688px]",
                        "not-prose",
                        "pt-4 landing-sm:pt-10 landing-lg:pt-20",
                        "pb-4 landing-lg:pb-0",
                        "pl-4 landing-sm:pl-10",
                        "dark:bg-gray-800 bg-gray-50",
                        "rounded-3xl",
                        "flex flex-col landing-lg:grid landing-lg:grid-cols-12",
                        "overflow-hidden",
                        "landing-xs:bg-landing-sweet-spot-glow-position-xs",
                        "landing-lg:bg-landing-sweet-spot-glow-position-lg",
                        "landing-md:bg-landing-sweet-spot-glow-position-md",
                        "landing-xs:bg-landing-sweet-spot-glow-size-xs",
                        "landing-lg:bg-landing-sweet-spot-glow-size-lg",
                        activeListItem.backgroundImage,
                    )}
                    style={{
                        backgroundRepeat: "repeat, no-repeat",
                    }}
                >
                    <div
                        className={clsx(
                            "not-prose",
                            "pr-6 landing-sm:pr-0",
                            "landing-sm:max-w-[540px] landing-md:max-w-[760px] landing-lg:max-w-[416px]",
                            "landing-lg:col-span-5",
                            "landing-lg:mt-16",
                        )}
                    >
                        <h3
                            className={clsx(
                                "text-base landing-sm:text-xl font-semibold",
                                "dark:text-gray-300 text-gray-700",
                            )}
                        >
                            {activeListItem.title}
                        </h3>
                        <p
                            className={clsx(
                                "mt-6",
                                "text-base",
                                "dark:text-gray-400 text-gray-600",
                            )}
                        >
                            {activeListItem.description}
                        </p>
                        <div
                            className={clsx(
                                "mt-4 landing-sm:mt-10",
                                "w-max",
                                "grid",
                                "grid-cols-2 landing-sm:grid-cols-3 landing-lg:grid-cols-2",
                                "landing-sm:gap-x-2 gap-y-4",
                                "not-prose",
                            )}
                        >
                            {list.map((item, index) => {
                                const active = index === activeIndex;
                                const Icon = item.icon;

                                return (
                                    <button
                                        key={item.iconText}
                                        onClick={() => setActiveIndex(index)}
                                        className={clsx(
                                            "appearance-none",
                                            active
                                                ? "dark:bg-gray-900 bg-gray-0"
                                                : "dark:bg-gray-900/50 bg-gray-0/50",

                                            "w-max",
                                            "flex",
                                            "items-center",
                                            "justify-start",
                                            "gap-1",
                                            "px-4 py-2",
                                            "rounded-full",
                                            "text-sm landing-sm:text-base",
                                        )}
                                    >
                                        <div>
                                            <Icon active={active} />
                                        </div>
                                        <div
                                            className={clsx(
                                                active
                                                    ? "dark:text-gray-0 text-gray-900"
                                                    : "dark:text-gray-400 text-gray-600",
                                            )}
                                        >
                                            {item.iconText}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div
                        className={clsx(
                            "relative",
                            "h-full",
                            "mt-4 landing-sm:mt-[72px] landing-lg:mt-0",
                            "flex",
                            "landing-lg:col-start-7 landing-lg:col-end-13",
                        )}
                    >
                        <div
                            className={clsx(
                                "w-full",
                                "h-full",
                                "landing-sweet-spot-mask",
                                "z-[1]",
                                "landing-lg:absolute",
                                "top-0 right-0",
                            )}
                        >
                            {list.map((item, index) => {
                                const active = index === activeIndex;

                                return (
                                    <img
                                        key={index}
                                        src={
                                            isDarkTheme
                                                ? item.image1Dark
                                                : item.image1Light
                                        }
                                        alt="UI of refine"
                                        loading="lazy"
                                        className={clsx(
                                            "object-cover",
                                            "object-left-top",
                                            "w-full landing-md:w-[874px] landing-lg:w-full",
                                            "h-full landing-lg:h-[464px]",
                                            "landing-md:pl-20 landing-lg:pl-0",
                                            "absolute",
                                            "top-0 right-0",
                                            active && "delay-300",
                                            active
                                                ? "translate-x-0"
                                                : "translate-x-full",
                                            active
                                                ? "opacity-100"
                                                : "opacity-0",
                                            "transition-[transform,opacity] duration-500 ease-in-out",
                                        )}
                                    />
                                );
                            })}
                        </div>

                        {list.map((item, index) => {
                            const active = index === activeIndex;

                            return (
                                <div
                                    key={index}
                                    className={clsx(
                                        "hidden landing-md:block",
                                        "z-[2]",
                                        "w-[488px]",
                                        "absolute",
                                        "landing-md:bottom-[112px] landing-lg:bottom-[78px]",
                                        "landing-md:left-[8px] landing-lg:-left-20",
                                        "rounded-xl",
                                        "dark:bg-gray-900 bg-gray-0",
                                        "dark:shadow-landing-sweet-spot-code-dark",
                                        "shadow-landing-sweet-spot-code-light",
                                        active && "delay-300",
                                        active
                                            ? "translate-y-0"
                                            : "translate-y-full",
                                        active ? "opacity-100" : "opacity-0",
                                        "transition-[transform,opacity] duration-500 ease-in-out",
                                    )}
                                >
                                    <img
                                        src={
                                            isDarkTheme
                                                ? item.image2Dark
                                                : item.image2Light
                                        }
                                        alt="Code of refine"
                                        loading="lazy"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const list = [
    {
        title: "Business applications not only share fundemental UI elements, but also the underlying logic.",
        description: `Stop writing repetitive code for CRUD, security and
        state management. Let refine automatically transform
        your UI elements to enterprise-grade:`,
        icon: (props: { active: boolean }) => (
            <DataTablesIcon
                className={clsx(
                    props.active
                        ? "dark:text-[#FA3852] text-[#D22D2D]"
                        : "text-gray-500",
                )}
            />
        ),
        iconText: "Datatables",
        image1Dark:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/datatables-ui-dark.png",
        image1Light:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/datatables-ui-light.png",
        image2Dark:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/datatables-code-dark.png",
        image2Light:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/datatables-code.png",
        backgroundImage:
            "dark:bg-landing-sweet-spot-glow-red-dark bg-landing-sweet-spot-glow-red-light",
    },
    {
        title: "Business applications not only share fundemental UI elements, but also the underlying logic.",
        description: `Stop writing repetitive code for CRUD, security and
      state management. Let refine automatically transform
      your UI elements to enterprise-grade:`,
        icon: (props: { active: boolean }) => (
            <ListIcon
                className={clsx(
                    props.active
                        ? "dark:text-[#F98C1F] text-[#F98C1F]"
                        : "text-gray-500",
                )}
            />
        ),
        iconText: "List",
        image1Dark:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/list-ui-dark.png",
        image1Light:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/list-ui-light.png",
        image2Dark:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/list-code-dark.png",
        image2Light:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/list-code.png",
        backgroundImage:
            "dark:bg-landing-sweet-spot-glow-orange-dark bg-landing-sweet-spot-glow-orange-light",
    },
    {
        title: "Business applications not only share fundemental UI elements, but also the underlying logic.",
        description: `Stop writing repetitive code for CRUD, security and
state management. Let refine automatically transform
your UI elements to enterprise-grade:`,
        icon: (props: { active: boolean }) => (
            <ChartsIcon
                className={clsx(
                    props.active
                        ? "dark:text-[#F9D51F] text-[#F9D51F]"
                        : "text-gray-500",
                )}
            />
        ),
        iconText: "Charts",
        image1Dark:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/charts-ui-dark.png",
        image1Light:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/charts-ui-light.png",
        image2Dark:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/charts-code-dark.png",
        image2Light:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/charts-code.png",
        backgroundImage:
            "dark:bg-landing-sweet-spot-glow-yellow-dark bg-landing-sweet-spot-glow-yellow-light",
    },
    {
        title: "Business applications not only share fundemental UI elements, but also the underlying logic.",
        description: `Stop writing repetitive code for CRUD, security and
  state management. Let refine automatically transform
  your UI elements to enterprise-grade:`,
        icon: (props: { active: boolean }) => (
            <FormsIcon
                className={clsx(
                    props.active
                        ? "dark:text-[#47D1BF] text-[#47D1BF]"
                        : "text-gray-500",
                )}
            />
        ),
        iconText: "Forms",
        image1Dark:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/forms-ui-dark.png",
        image1Light:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/forms-ui-light.png",
        image2Dark:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/forms-code-dark.png",
        image2Light:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/forms-code.png",
        backgroundImage:
            "dark:bg-landing-sweet-spot-glow-cyan-dark bg-landing-sweet-spot-glow-cyan-light",
    },
    {
        title: "Business applications not only share fundemental UI elements, but also the underlying logic.",
        description: `Stop writing repetitive code for CRUD, security and
  state management. Let refine automatically transform
  your UI elements to enterprise-grade:`,
        icon: (props: { active: boolean }) => (
            <WizardsIcon
                className={clsx(
                    props.active
                        ? "dark:text-[#3DB8F5] text-[#3DB8F5]"
                        : "text-gray-500",
                )}
            />
        ),
        iconText: "Wizards",
        image1Dark:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/wizards-ui-dark.png",
        image1Light:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/wizards-ui-light.png",
        image2Dark:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/wizards-code-dark.png",
        image2Light:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/wizards-code.png",
        backgroundImage:
            "dark:bg-landing-sweet-spot-glow-blue-dark bg-landing-sweet-spot-glow-blue-light",
    },
    {
        title: "Business applications not only share fundemental UI elements, but also the underlying logic.",
        description: `Stop writing repetitive code for CRUD, security and
  state management. Let refine automatically transform
  your UI elements to enterprise-grade:`,
        icon: (props: { active: boolean }) => (
            <AuthenticationIcon
                className={clsx(
                    props.active
                        ? "dark:text-[#5959FF] text-[#5959FF]"
                        : "text-gray-500",
                )}
            />
        ),
        iconText: "Authentication",
        image1Dark:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/authentication-ui.png",
        image1Light:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/authentication-ui-light.png",
        image2Dark:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/authentication-code-dark.png",
        image2Light:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/sweet-spot/authentication-code.png",
        backgroundImage:
            "dark:bg-landing-sweet-spot-glow-indigo-dark bg-landing-sweet-spot-glow-indigo-light",
    },
];
