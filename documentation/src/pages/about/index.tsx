import React from "react";
import Head from "@docusaurus/Head";
import { CommonHeader } from "@site/src/refine-theme/common-header";
import { CommonLayout } from "@site/src/refine-theme/common-layout";
import { OpenSourceIcon } from "@site/src/refine-theme/icons/open-source";
import { GithubIcon } from "@site/src/refine-theme/icons/github";
import clsx from "clsx";
import { DiscordIcon, TwitterIcon } from "@site/src/refine-theme/icons/popover";
import { RedditIcon } from "@site/src/components/landing/icons/gray-social-icons";
import { team } from "../../assets/team";
import { backedBy } from "../../assets/backed-by";
import { JoinUsIcon } from "@site/src/refine-theme/icons/join-us";
import { Istanbul500Icon } from "@site/src/refine-theme/icons/500";
import { MarkerIcon } from "@site/src/refine-theme/icons/marker";
import { MailIcon } from "@site/src/refine-theme/icons/mail";
import { BlogFooter } from "@site/src/refine-theme/blog-footer";

const About: React.FC = () => {
    return (
        <CommonLayout>
            <Head title="About | refine">
                <html data-page="about" data-customized="true" />
            </Head>
            <div className="refine-prose">
                <CommonHeader hasSticky={true} />
                <div
                    className={clsx(
                        "xl:max-w-[944px] xl:py-16",
                        "lg:max-w-[912px] lg:py-10",
                        "md:max-w-[624px] md:text-4xl py-6",
                        "sm:max-w-[480px] text-xl",
                        "max-w-[328px]",
                        "w-full mx-auto",
                    )}
                >
                    <h1 className="text-gray-900 dark:text-gray-0 text-center">
                        We&apos;re helping organizations to build better web
                        applications, in{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r text-gradient-to-r from-[#0FBDBD] to-[#26D97F]">
                            less time
                        </span>
                        , with{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r text-gradient-to-r from-[#FF9933] to-[#FF4C4D]">
                            fewer resources
                        </span>
                        .
                    </h1>
                </div>
                <div
                    className={clsx(
                        "xl:max-w-[1120px] xl:py-16",
                        "lg:max-w-[912px] lg:py-10",
                        "md:max-w-[624px] py-6",
                        "sm:max-w-[480px]",
                        "max-w-[328px]",
                        "w-full mx-auto",
                    )}
                >
                    <div
                        className={clsx(
                            "grid",
                            "xl:grid-cols-2 xl:gap-12",
                            "grid-cols-1 lg:gap-8 gap-4",
                        )}
                    >
                        <div className="bg-gray-50 text-2xl flex justify-center items-center font-semibold px-16 py-36 rounded-xl">
                            10k+ Github Star & YC kutlaması etkinliginde topluca
                            çekindigimiz foto. (Ya da video?)
                        </div>
                        <div className="flex flex-col justify-center text-2xl text-gray-700">
                            <p>
                                Shortly after its initial release on September
                                2021, Refine has gained attraction of
                                open-source community and has become
                                increasingly popular among web application
                                frameworks.
                            </p>
                            <p>
                                With the aim of sustaining the growth and
                                expanding the user base, the project was backed
                                by prominent VC’s and angel investors on May
                                2022.
                            </p>
                            <p>
                                Today, the US-based company has an international
                                team of 10+ members leading the development of
                                the open-core and building new products for the
                                ecosystem.
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className={clsx(
                        "xl:max-w-[1024px] xl:py-16",
                        "lg:max-w-[912px] lg:py-10",
                        "md:max-w-[624px] py-6",
                        "sm:max-w-[480px]",
                        "max-w-[336px]",
                        "w-full mx-auto",
                    )}
                >
                    <div
                        className={clsx(
                            "flex justify-center items-center",
                            "w-[48px] h-[48px]",
                            "md:w-[64px] md:h-[64px]",
                            "rounded-full ",
                            "bg-refine-red bg-opacity-10",
                            "shrink-0",
                            "xl:hidden mb-6",
                        )}
                    >
                        <OpenSourceIcon className="text-refine-red" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:gap-16 gap-8">
                        <div className="w-full flex justify-between gap-4">
                            <div
                                className={clsx(
                                    "justify-center items-center",
                                    "w-[48px] h-[48px]",
                                    "md:w-[64px] md:h-[64px]",
                                    "rounded-full ",
                                    "bg-refine-red bg-opacity-10",
                                    "shrink-0",
                                    "hidden xl:flex",
                                )}
                            >
                                <OpenSourceIcon className="text-refine-red" />
                            </div>

                            <div>
                                <p className="font-bold text-sm md:text-lg lg:text-2xl text-gray-900 dark:text-gray-300 mb-3">
                                    Open-source contributions have always been a
                                    major part of refine’s success.
                                </p>

                                <p className="text-xs sm:text-base text-gray-900 dark:text-gray-300">
                                    We are grateful for all contributors who are
                                    developing core features, making bug-fixes,
                                    building community extensions, writing
                                    documentation, reporting issues and giving
                                    their constructive feedback.
                                </p>
                            </div>
                        </div>
                        <div className="xl:w-[400px] w-full shrink-0 grid grid-cols-2 gap-4 xl:py-5">
                            <div
                                className={clsx(
                                    "flex flex-row justify-start gap-3",
                                    "dark:bg-gray-900",
                                    "border border-gray-200 dark:border-gray-700",
                                    "p-4 rounded-xl",
                                )}
                            >
                                <div>
                                    <GithubIcon
                                        className="text-2xl text-gray-900 dark:text-gray-0"
                                        width="24px"
                                        height="24px"
                                    />
                                </div>
                                <div className="text-xs md:text-base">
                                    <div className="mb-0 text-gray-500 dark:text-gray-400">
                                        Visit our
                                    </div>
                                    <a
                                        target="_blank"
                                        href="https://github.com/refinedev/refine"
                                        className="font-semibold text-gray-900 dark:text-gray-0 no-underline hover:no-underline"
                                        rel="noreferrer"
                                    >
                                        Github Repo
                                    </a>
                                </div>
                            </div>
                            <div
                                className={clsx(
                                    "flex flex-row justify-start gap-3",
                                    "dark:bg-gray-900",
                                    "border border-gray-200 dark:border-gray-700",
                                    "p-4 rounded-xl",
                                )}
                            >
                                <div>
                                    <DiscordIcon
                                        className="text-2xl"
                                        width="24px"
                                        height="24px"
                                    />
                                </div>
                                <div className="text-xs md:text-base">
                                    <div className="mb-0 text-gray-500 dark:text-gray-400">
                                        Join our
                                    </div>
                                    <a
                                        target="_blank"
                                        href="https://discord.gg/refine"
                                        className="font-semibold text-gray-900 dark:text-gray-0 no-underline hover:no-underline"
                                        rel="noreferrer"
                                    >
                                        Discord Server
                                    </a>
                                </div>
                            </div>
                            <div
                                className={clsx(
                                    "flex flex-row justify-start gap-3",
                                    "dark:bg-gray-900",
                                    "border border-gray-200 dark:border-gray-700",
                                    "p-4 rounded-xl",
                                )}
                            >
                                <div>
                                    <RedditIcon
                                        className="text-2xl"
                                        width="24px"
                                        height="24px"
                                        color="#FF4500"
                                    />
                                </div>
                                <div className="text-xs md:text-base">
                                    <div className="mb-0 text-gray-500 dark:text-gray-400">
                                        Follow us on
                                    </div>
                                    <a
                                        target="_blank"
                                        href="https://reddit.com/r/refine"
                                        className="font-semibold text-gray-900 dark:text-gray-0 no-underline hover:no-underline"
                                        rel="noreferrer"
                                    >
                                        Reddit
                                    </a>
                                </div>
                            </div>
                            <div
                                className={clsx(
                                    "flex flex-row justify-start gap-3",
                                    "dark:bg-gray-900",
                                    "border border-gray-200 dark:border-gray-700",
                                    "p-4 rounded-xl",
                                )}
                            >
                                <div>
                                    <TwitterIcon
                                        className="text-2xl"
                                        width="24px"
                                        height="24px"
                                    />
                                </div>
                                <div className="text-xs md:text-base">
                                    <div className="mb-0 text-gray-500 dark:text-gray-400">
                                        Follow us on
                                    </div>
                                    <a
                                        target="_blank"
                                        href="https://twitter.com/refine_dev"
                                        className="font-semibold text-gray-900 dark:text-gray-0 no-underline hover:no-underline"
                                        rel="noreferrer"
                                    >
                                        Twitter
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={clsx(
                        "lg:max-w-[912px] lg:py-16",
                        "md:max-w-[624px] md:py-10",
                        "sm:max-w-[480px] py-6",
                        "max-w-[328px]",
                        "w-full mx-auto",
                    )}
                >
                    <h4
                        className={clsx(
                            "text-sm leading-6",
                            "md:text-2xl md:leading-8",
                            "text-center text-gray-800 dark:text-gray-200",
                        )}
                    >
                        Our Team
                    </h4>

                    <div
                        className={clsx(
                            "grid",
                            "lg:grid-cols-[repeat(4,192px)] lg:gap-12",
                            "md:grid-cols-[repeat(3,176px)]",
                            "sm:grid-cols-[repeat(3,144px)]",
                            "grid-cols-[repeat(2,144px)] gap-6",
                            "align-top",
                        )}
                    >
                        {team.map(
                            ({ name, avatar, avatar2x, role1, role2 }) => (
                                <div
                                    key={name}
                                    className="flex justify-start flex-col text-center"
                                >
                                    <img
                                        srcSet={`${avatar2x} 1500w`}
                                        src={avatar}
                                        alt={name}
                                        className="w-full not-prose m-0 mb-6"
                                    />
                                    <span
                                        className={clsx(
                                            "text-xs leading-4",
                                            "lg:text-base lg:leading-6",
                                            "text-gray-900 dark:text-gray-0 font-semibold",
                                        )}
                                    >
                                        {name}
                                    </span>
                                    <span
                                        className={clsx(
                                            "text-xs leading-4",
                                            "lg:text-base lg:leading-6",
                                            "text-gray-500 dark:text-gray-400",
                                        )}
                                    >
                                        {role1}
                                    </span>
                                    {role2 && (
                                        <span
                                            className={clsx(
                                                "text-xs leading-4",
                                                "lg:text-base lg:leading-6",
                                                "text-gray-500 dark:text-gray-400",
                                            )}
                                        >
                                            {role2}
                                        </span>
                                    )}
                                </div>
                            ),
                        )}
                        <div className="flex justify-center flex-col text-center">
                            <div className="w-full not-prose m-0 mb-6">
                                <JoinUsIcon className="w-full" />
                            </div>
                            <a
                                target="_blank"
                                href="https://www.linkedin.com/company/refine-dev"
                                className={clsx(
                                    "text-xs leading-4",
                                    "lg:text-base lg:leading-6",
                                    "no-underline hover:no-underline text-refine-blue dark:text-refine-blue font-semibold mb-0",
                                )}
                                rel="noreferrer"
                            >
                                Join our team!
                            </a>
                            <a
                                target="_blank"
                                href="https://www.linkedin.com/company/refine-dev"
                                className={clsx(
                                    "text-xs leading-4",
                                    "lg:text-base lg:leading-6",
                                    "no-underline hover:no-underline text-refine-blue dark:text-refine-blue m-o",
                                )}
                                rel="noreferrer"
                            >
                                See open positions
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    className={clsx(
                        "lg:max-w-[912px] lg:py-16",
                        "md:max-w-[624px] md:py-10",
                        "sm:max-w-[480px] py-6",
                        "max-w-[328px]",
                        "w-full mx-auto",
                    )}
                >
                    <h4
                        className={clsx(
                            "text-sm leading-6",
                            "md:text-2xl md:leading-8",
                            "text-center text-gray-800 dark:text-gray-200",
                            "mb-8 lg:mb-16",
                        )}
                    >
                        Backed by
                    </h4>

                    <div
                        className={clsx(
                            "flex justify-center items-center w-full",
                            "bg-gray-100 dark:bg-gray-700",
                            "rounded-xl",
                            "py-6",
                            "mb-16",
                        )}
                    >
                        <div
                            className={clsx(
                                "flex justify-center items-center",
                                "w-[144px] h-[144px]",
                                "md:w-[192px] md:h-[192px]",
                                "rounded-full ",
                                "bg-gray-900",
                                "shrink-0",
                            )}
                        >
                            <Istanbul500Icon className="text-gray-0" />
                        </div>
                    </div>

                    <div
                        className={clsx(
                            "grid",
                            "lg:grid-cols-[repeat(4,192px)] lg:gap-12",
                            "md:grid-cols-[repeat(3,176px)]",
                            "sm:grid-cols-[repeat(3,144px)]",
                            "grid-cols-[repeat(2,144px)] gap-6",
                            "align-top",
                        )}
                    >
                        {backedBy.map(
                            ({ name, avatar, avatar2x, role1, role2 }) => (
                                <div
                                    key={name}
                                    className="flex justify-start flex-col text-center"
                                >
                                    <img
                                        srcSet={`${avatar2x} 1500w`}
                                        src={avatar}
                                        alt={name}
                                        className="w-full not-prose m-0 mb-6"
                                    />
                                    <span
                                        className={clsx(
                                            "text-xs leading-4",
                                            "lg:text-base lg:leading-6",
                                            "text-gray-900 dark:text-gray-0 font-semibold",
                                        )}
                                    >
                                        {name}
                                    </span>
                                    <span
                                        className={clsx(
                                            "text-xs leading-4",
                                            "lg:text-base lg:leading-6",
                                            "text-gray-500 dark:text-gray-400",
                                        )}
                                    >
                                        {role1}
                                    </span>
                                    {role2 && (
                                        <span
                                            className={clsx(
                                                "text-xs leading-4",
                                                "lg:text-base lg:leading-6",
                                                "text-gray-500 dark:text-gray-400",
                                            )}
                                        >
                                            {role2}
                                        </span>
                                    )}
                                </div>
                            ),
                        )}
                    </div>
                </div>
                <div
                    className={clsx(
                        "xl:max-w-[1016px] lg:py-16",
                        "lg:max-w-[912px] lg:py-16",
                        "md:max-w-[624px] md:py-10",
                        "sm:max-w-[480px] py-6",
                        "max-w-[328px]",
                        "w-full mx-auto",
                    )}
                >
                    <h4
                        className={clsx(
                            "text-sm leading-6",
                            "md:text-2xl md:leading-8",
                            "text-center text-gray-800 dark:text-gray-200",
                            "mb-8 lg:mb-16",
                        )}
                    >
                        We are Here
                    </h4>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:gap-16 gap-8">
                        <div className="lg:w-[624px] lg:h-[416px] w-full lg:order-last shrink-0">
                            <img
                                className="m-0 p-0"
                                src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/about/images/map.png"
                                srcSet="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/about/images/map2x.png 1500w"
                            />
                        </div>
                        <div className="flex justify-start flex-col items-start gap-8 lg:pt-12 pt-6">
                            <div className="flex justify-center items-center gap-6">
                                <div
                                    className={clsx(
                                        "flex justify-center items-center",
                                        "w-[48px] h-[48px]",
                                        "rounded-full ",
                                        "bg-refine-orange bg-opacity-10",
                                        "shrink-0",
                                    )}
                                >
                                    <MarkerIcon className="text-refine-orange" />
                                </div>
                                <span className="text-gray-700 dark:text-gray-300">
                                    256 Chapman Road STE 105-4 <br />
                                    Newark, DE 19702
                                </span>
                            </div>
                            <div className="flex justify-center items-center gap-6">
                                <div
                                    className={clsx(
                                        "flex justify-center items-center",
                                        "w-[48px] h-[48px]",
                                        "rounded-full ",
                                        "bg-refine-pink bg-opacity-10",
                                        "shrink-0",
                                    )}
                                >
                                    <MailIcon className="text-refine-pink" />
                                </div>
                                <a
                                    href="mailto:info@refine.dev"
                                    className="text-gray-700 dark:text-gray-300 hover:no-underline no-underline"
                                >
                                    info@refine.dev
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <BlogFooter />
            </div>
        </CommonLayout>
    );
};

export default About;
