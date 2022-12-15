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
        date: "30th October 2022",
        title: "Pilot & refine architecture",
        description: `Overview about <strong className="font-bold">refine</strong> and the app we built during the article series`,
        link: null,
    },
    {
        date: "30th October 2022",
        title: "Installation of the Client App",
        description: `Bootstraping the <strong className="font-bold">refine</strong> client app with <strong className="font-bold">superplate CLI</strong> by choosing <strong className="font-bold">Ant Design</strong> as a UI framework and <strong className="font-bold">Supabase</strong> as a dataprovider`,
        link: null,
    },
    {
        date: "30th October 2022",
        title: "Create Public Dashboard page & Canvas create page",
        description: `Public dashboard that lists all canvases and has two pages.`,
        link: null,
    },
    {
        date: "30th October 2022",
        title: "Live Provider",
        description: `Adding <strong className="font-bold">Supabase</strong> as live provider to the project in order that multiple users drawing on the same canvas can see each other's paintings in real-time.`,
        link: null,
    },
    {
        date: "30th October 2022",
        title: "Create admin app",
        description: `We’ll built a simple admin panel by bootstrapping the app with <strong className="font-bold">superplate CLI</strong><br/>
            UI Framework => <strong className="font-bold">Ant design</strong><br/>
            data provider => <strong className="font-bold">Supabase</strong>`,
        link: null,
    },
    {
        date: "30th October 2022",
        title: "Setting Access control provider to admin app",
        description: `There will be two role based access control&nbsp;in&nbsp;the&nbsp;admin&nbsp;app:<br/>
            Admin & Editor`,
        link: null,
    },
    {
        date: "30th October 2022",
        title: "Audit log provider",
        description: `Well record each canvas creation and pixel drawings to audit logs table in <strong className="font-bold">Supabase</strong>. And then we’ll be able to display this logs on the admin and the client app.`,
        link: null,
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
    "1598580077146640384",
    "1597878371760979970",
    "1598232457966678016",
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
            <div className="pt-0 pb-24 lg:pb-48 md:pt-12 lg:pt-24 relative px-2 md:px-4 lg:px-0">
                <div className="font-montserrat flex flex-col">
                    <div className="flex flex-col-reverse md:flex-row h-auto lg:h-[432px] max-w-[904px] mx-auto">
                        <div className="flex flex-col justify-center items-center md:items-start">
                            <div className="flex items-center gap-2">
                                <img
                                    src="/week-of-refine/refine-week-calendar.png"
                                    alt="Refine week calendar logo"
                                    className="block w-[48px] h-[48px]"
                                />
                                <img
                                    src="/week-of-refine/refine-week-ft-supabase.png"
                                    alt="Refine week ft. supabase logo"
                                    className="block w-[160px] h-[46px]"
                                />
                            </div>
                            <h2 className="font-montserrat text-[#242436] text-xl lg:text-[28px] lg:leading-9 font-medium mt-8 mb-0 max-w-[384px] text-center md:text-start">
                                Stay tuned all week and learn the basics of
                                creating a CRUD app via{" "}
                                <strong className="font-bold">refine</strong> &{" "}
                                <strong className="font-bold">supabase</strong>{" "}
                                on a fun project in a week.
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-2 mt-4">
                                <GradientButton onClick={goToTimeline}>
                                    Join Event
                                </GradientButton>
                                <LinkButton href={tweetUrl} variant="white">
                                    <div className="w-[16px] h-[16px] mr-3">
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
                        <div className="flex-1 lg:translate-x-[80px] min-h-[318px]">
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
                            <h2 className="font-montserrat font-extrabold text-[#242436] tracking-wide text-3xl mb-0">
                                TIMELINE
                            </h2>
                        </div>

                        <div className="flex flex-col items-center gap-[2px] mt-8 pr-1 sm:pr-0">
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
                                        className="flex max-w-[384px] h-[285px]"
                                    >
                                        <div className="flex flex-col items-center">
                                            <div
                                                className={clsx(
                                                    "border-[2px] border-solid border-[#1890FF] rounded-full w-[10px] h-[10px] mt-[6px] mb-[6px]",
                                                    hasLink
                                                        ? "border-[#1890FF]"
                                                        : "border-[#C1C1C6]",
                                                )}
                                            />
                                            {hasBorder && (
                                                <div
                                                    className={clsx(
                                                        " w-[2px] h-full rounded-sm",
                                                        hasLink
                                                            ? "bg-[#1890FF]"
                                                            : "bg-[#C1C1C6]",
                                                    )}
                                                />
                                            )}
                                        </div>

                                        <div className="ml-4">
                                            <div className="flex items-center h-[22px]">
                                                <div className="font-medium text-[#96969E] text-xs">
                                                    {date}
                                                </div>
                                                {hasNewBadge && (
                                                    <div className="flex items-center justify-center border border-solid border-[#C2E5A7] bg-[#67BE23] rounded-[4px] text-white text-xs ml-2 w-[48px] h-[22px]">
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
                                                    "font-medium text-xs",
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

                    <div className="flex flex-col items-center justify-center mt-24 mx-auto max-w-[1024px]">
                        <div className="flex items-center justify-center">
                            <div className="flex items-center justify-center w-[24px] h-[24px] mr-4 bg-[#00AAEC] rounded-full">
                                <TwitterIcon
                                    color="#ffffff"
                                    width="12"
                                    height="12"
                                />
                            </div>
                            <h2 className="font-montserrat tracking-wide text-3xl mb-0">
                                <span className="font-extrabold text-[#242436]">
                                    JOIN
                                </span>{" "}
                                <span className="font-bold text-[#00AAEC]">
                                    #refineweek
                                </span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 mx-6 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 min-w-full">
                            {tweetIDs.map((id) => {
                                return (
                                    <div key={id} className="w-full">
                                        <Tweet tweetId={id} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center mt-16 max-w-[592px] mx-auto">
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
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center mt-16 max-w-[800px] mx-auto">
                    <h2 className="font-montserrat font-extrabold text-[#242436] tracking-wide text-3xl mb-0 text-center">
                        ADDITIONAL SOURCES
                    </h2>
                    <div className="flex flex-wrap items-center justify-center mt-8 gap-4">
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
                                    className="flex justify-between items-center rounded-md px-3 py-4 w-[176px]"
                                >
                                    <div className="font-montserrat text-white text-xs uppercase mr-2 text-center">
                                        <div className="font-medium">
                                            {title}
                                        </div>
                                        <div className="font-bold whitespace-nowrap">
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
