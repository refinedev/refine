import React, { useMemo, useRef } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { RefineHatIcon, TimelineIcon } from "../../components/landing/icons";
import clsx from "clsx";
import {
    RedditIcon,
    DiscordIcon,
    TwitterIcon,
    GithubIcon,
} from "../../components/landing/icons/gray-social-icons";
import LinkButton from "../../components/link-button";
import GradientButton from "../../components/gradient-button";
import { Tweet } from "react-twitter-widgets";

const timeline = [
    {
        date: "14th February 2023",
        title: "Pilot & refine architecture",
        description: `Overview about <strong className="font-bold">refine</strong> and <strong className="font-bold">Supabase</strong> the app we built during the article series`,
        link: "https://refine.dev/blog/refine-pixels-1/",
    },
    {
        date: "15th February 2023",
        title: "Setting Up the Client App",
        description: `We start with setting up the Pixels client app using <strong className="font-bold">create refine-app</strong> by choosing <strong className="font-bold">Ant Design</strong> as a UI framework and <strong className="font-bold">Supabase</strong> as a dataprovider`,
        link: "https://refine.dev/blog/refine-pixels-2/",
    },
    {
        date: "16th February 2023",
        title: "Adding CRUD Actions & Authentication",
        description: `We start implementing CRUD functionalities like creating, showing a canvas, drawing pixels and user authentication using <strong className="font-bold">Supabase</strong>`,
        link: "https://refine.dev/blog/refine-pixels-3/",
    },
    {
        date: "17th February 2023",
        title: "Adding Realtime Collaboration",
        description: `Adding <strong className="font-bold">Supabase</strong> as live provider to the project in order that multiple users drawing on the same canvas can see each other's paintings in real-time.`,
        link: "https://refine.dev/blog/refine-pixels-4/",
    },
    {
        date: "18th February 2023",
        title: "Initialize and Build Pixels Admin App",
        description: `We'll implement an admin dashboard app and explore how refine's Ant Design support module is geared to rapidly build CRUD pages for a refine app`,
        link: "https://refine.dev/blog/refine-pixels-5/",
    },
    {
        date: "19th February 2023",
        title: "Add Role Based Authorization",
        description:
            "We'll implement Role Based Access Control (RBAC) on our Pixels Admin app.",
        link: "https://refine.dev/blog/refine-pixels-6/",
    },
    {
        date: "20th February 2022",
        title: "Implementing Audit Logs",
        description: `We'll record each canvas creation and pixel drawings to audit logs table in <strong className="font-bold">Supabase</strong>. And then we’ll be able to display this logs on the admin and the client app.`,
        link: "https://refine.dev/blog/refine-pixels-7/",
    },
];

const additionalSources = [
    {
        title: "join our",
        label: "discord server",
        icon: <DiscordIcon color="#ffffff" width="36" height="36" />,
        link: "https://discord.gg/refine",
        color: "#5865F2",
    },
    {
        title: "visit our",
        label: "github repo",
        icon: <GithubIcon color="#ffffff" width="36" height="36" />,
        link: "https://github.com/refinedev/refine",
        color: "#242436",
    },
    {
        title: "follow us",
        label: "on twitter",
        icon: <TwitterIcon color="#ffffff" width="36" height="36" />,
        link: "https://twitter.com/refine_dev",
        color: "#00AAEC",
    },
    {
        title: "follow us",
        label: "on reddit",
        icon: <RedditIcon color="#ffffff" width="36" height="36" />,
        link: "https://reddit.com/r/refine",
        color: "#FF4500",
    },
];

const tweetUrl = "https://twitter.com/intent/tweet?text=%23refineweek";
const tweetIDs = [
    "1625488050863353856",
    "1615260152822628352",
    "1621513516036526080",
    "1621932348009861132",
    "1597878371760979970",
    "1616390215068688384",
    "1617841995233529861",
    "1620724625536880641",
    "1618180208414322689",
    "1624015381403955200",
];

const RefineWeek = () => {
    const timelineRef = useRef(null);

    const goToTimeline = () => {
        timelineRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
        });
    };

    const lastPublishedArticleIndex = useMemo(() => {
        const firstUnpublishedArticleIndex = timeline.findIndex(
            (article) => !article.link,
        );

        return firstUnpublishedArticleIndex - 1;
    }, []);

    return (
        <Layout>
            <Head title="Week of Refine | refine">
                <html data-page="week-of-refine" data-customized="true" />
            </Head>
            <div className="relative px-2 pt-0 pb-24 md:px-4 md:pt-12 lg:px-0 lg:pb-48 lg:pt-24">
                <div className="font-montserrat flex flex-col">
                    <div className="mx-auto flex h-auto max-w-[904px] flex-col-reverse md:flex-row lg:h-[432px]">
                        <div className="flex flex-col items-center justify-center md:items-start">
                            <div className="flex items-center gap-2">
                                <img
                                    src="/week-of-refine/refine-week-calendar.png"
                                    alt="Refine week calendar logo"
                                    className="block h-[48px] w-[48px]"
                                />
                                <img
                                    src="/week-of-refine/refine-week-ft-supabase.png"
                                    alt="Refine week ft. supabase logo"
                                    className="block h-[46px] w-[160px]"
                                />
                            </div>
                            <h2 className="font-montserrat mt-8 mb-0 max-w-[384px] text-center text-xl font-medium text-[#242436] md:text-start lg:text-[28px] lg:leading-9">
                                Stay tuned all week and learn the basics of
                                creating a CRUD app via{" "}
                                <strong className="font-bold">refine</strong> &{" "}
                                <strong className="font-bold">supabase</strong>{" "}
                                on a fun project in a week.
                            </h2>
                            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                                <GradientButton onClick={goToTimeline}>
                                    Join Event
                                </GradientButton>
                                <LinkButton href={tweetUrl} variant="white">
                                    <div className="mr-3 h-[16px] w-[16px]">
                                        <TwitterIcon
                                            color="#00AAEC"
                                            width="16"
                                            height="16"
                                        />
                                    </div>
                                    <span className="font-medium">
                                        #
                                        <strong className="font-bold">
                                            refine
                                        </strong>
                                        week
                                    </span>
                                </LinkButton>
                            </div>
                        </div>
                        <div className="min-h-[318px] flex-1 lg:translate-x-[80px]">
                            <img
                                src="/week-of-refine/refine-week-pixel-logo.png"
                                alt="Refine Pixel app logo"
                                className="block"
                            />
                        </div>
                    </div>

                    <div className="mt-16 md:mt-8">
                        <div
                            ref={timelineRef}
                            className="flex items-center justify-center"
                        >
                            <TimelineIcon className="mr-2" />
                            <h2 className="font-montserrat mb-0 text-3xl font-extrabold tracking-wide text-[#242436]">
                                TIMELINE
                            </h2>
                        </div>

                        <div className="mt-8 flex flex-col items-center gap-[2px] pr-1 sm:pr-0">
                            {timeline.map((item, index) => {
                                const { title, description, date, link } = item;

                                const hasBorder = index !== timeline.length - 1;
                                const dayText = `DAY ${index + 1}:`;
                                const hasLink = !!link;
                                const hasNewBadge =
                                    lastPublishedArticleIndex === index &&
                                    hasLink;

                                return (
                                    <div
                                        key={index}
                                        className="flex h-[285px] max-w-[384px]"
                                    >
                                        <div className="flex flex-col items-center">
                                            <div
                                                className={clsx(
                                                    "mt-[6px] mb-[6px] h-[10px] w-[10px] rounded-full border-[2px] border-solid border-[#1890FF]",
                                                    hasLink
                                                        ? "border-[#1890FF]"
                                                        : "border-[#C1C1C6]",
                                                )}
                                            />
                                            {hasBorder && (
                                                <div
                                                    className={clsx(
                                                        " h-full w-[2px] rounded-sm",
                                                        hasLink
                                                            ? "bg-[#1890FF]"
                                                            : "bg-[#C1C1C6]",
                                                    )}
                                                />
                                            )}
                                        </div>

                                        <div className="ml-4">
                                            <div className="flex h-[22px] items-center">
                                                <div className="text-xs font-medium text-[#96969E]">
                                                    {date}
                                                </div>
                                                {hasNewBadge && (
                                                    <div className="ml-2 flex h-[22px] w-[48px] items-center justify-center rounded-[4px] border border-solid border-[#C2E5A7] bg-[#67BE23] text-xs text-white">
                                                        NEW
                                                    </div>
                                                )}
                                            </div>
                                            <div
                                                className={clsx(
                                                    "text-xl",
                                                    hasLink
                                                        ? "text-[#1890FF]"
                                                        : "text-[#C1C1C6]",
                                                )}
                                            >
                                                <span className="font-medium">
                                                    {dayText}{" "}
                                                </span>
                                                <strong className="font-bold">
                                                    {title}
                                                </strong>
                                            </div>
                                            <div
                                                className={clsx(
                                                    "text-xs font-medium",
                                                    hasLink
                                                        ? "text-[#242436]"
                                                        : "text-[#C1C1C6]",
                                                )}
                                                dangerouslySetInnerHTML={{
                                                    __html: description,
                                                }}
                                            />

                                            {link && (
                                                <LinkButton
                                                    href={link}
                                                    className="mt-4"
                                                >
                                                    Read Article
                                                </LinkButton>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mx-auto mt-24 flex max-w-[1024px] flex-col items-center justify-center">
                        <div className="flex items-center justify-center">
                            <div className="mr-4 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#00AAEC]">
                                <TwitterIcon
                                    color="#ffffff"
                                    width="12"
                                    height="12"
                                />
                            </div>
                            <h2 className="font-montserrat mb-0 text-3xl tracking-wide">
                                <span className="font-extrabold text-[#242436]">
                                    JOIN
                                </span>{" "}
                                <span className="font-bold text-[#00AAEC]">
                                    #refineweek
                                </span>
                            </h2>
                        </div>
                        <div className="mx-6 mt-8 grid min-w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {tweetIDs.map((id) => {
                                return (
                                    <div key={id} className="w-full">
                                        <Tweet tweetId={id} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/*       <div className="flex flex-col items-center justify-center mt-16 max-w-[592px] mx-auto">
                        <div className="flex items-center justify-center">
                            <RefineHatIcon className="mr-2" />
                            <h2 className="font-montserrat font-extrabold text-[#242436] tracking-wide text-3xl mb-0">
                                WIN SWAG
                            </h2>
                        </div>
                        <p className="font-montserrat font-medium text-xs text-[#242436] text-center mb-0 mt-8 px-2 sm:px-0">
                            If you build something cool during{" "}
                            <strong className="font-bold">refine WEEK,</strong>{" "}
                            we’d like to show our appreciation! Build and submit
                            your coolest projects powered by{" "}
                            <strong className="font-bold">refine</strong>. To be
                            eligible, share your project on Twitter with the
                            hashtag{" "}
                            <strong className="font-bold">#refineweek</strong>{" "}
                            and submit a PR to get your project added to our
                            repo!
                        </p>
                        <LinkButton href={tweetUrl} className="mt-8">
                            <div className="w-[16px] h-[16px] mr-3">
                                <TwitterIcon
                                    color="#ffffff"
                                    width="16"
                                    height="16"
                                />
                            </div>
                            <span className="font-medium">
                                #<strong className="font-bold">refine</strong>
                                week
                            </span>
                        </LinkButton>
                    </div> */}
                </div>

                <div className="mx-auto mt-16 flex max-w-[800px] flex-col items-center justify-center">
                    <h2 className="font-montserrat mb-0 text-center text-3xl font-extrabold tracking-wide text-[#242436]">
                        ADDITIONAL SOURCES
                    </h2>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        {additionalSources.map((item, index) => {
                            const { title, label, icon, color, link } = item;

                            return (
                                <a
                                    key={index}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        backgroundColor: color,
                                    }}
                                    className="flex w-[176px] items-center justify-between rounded-md px-3 py-4"
                                >
                                    <div className="font-montserrat mr-2 text-center text-xs uppercase text-white">
                                        <div className="font-medium">
                                            {title}
                                        </div>
                                        <div className="whitespace-nowrap font-bold">
                                            {label}
                                        </div>
                                    </div>
                                    {icon}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RefineWeek;
