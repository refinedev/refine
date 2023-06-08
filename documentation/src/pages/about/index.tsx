import React from "react";
import Head from "@docusaurus/Head";
import { CommonHeader } from "@site/src/refine-theme/common-header";
import { CommonLayout } from "@site/src/refine-theme/common-layout";
import { OpenSourceIcon } from "@site/src/refine-theme/icons/open-source";
import { GithubIcon } from "@site/src/refine-theme/icons/github";
import clsx from "clsx";
import { DiscordIcon, TwitterIcon } from "@site/src/refine-theme/icons/popover";
import { RedditIcon } from "@site/src/components/landing/icons/gray-social-icons";

const About: React.FC = () => {
    return (
        <CommonLayout>
            <Head title="About | refine">
                <html data-page="about" data-customized="true" />
            </Head>
            <div className="refine-prose">
                <CommonHeader hasSticky={true} />
                <div className="container">
                    <div className="flex items-center justify-center my-12 lg:my-24">
                        <h1 className="w-5/6 text-gray-900 dark:text-gray-0 text-center">
                            We’re helping organizations to build better web
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

                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 px-7 my-12 lg:my-24">
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

                    <div className="lg:px-20 px-8 my-12 lg:my-24">
                        <div className="grid lg:grid-cols-2 gap-12">
                            <div className="flex flex-row gap-8">
                                <div
                                    className={clsx(
                                        "flex justify-center items-center",
                                        "w-[64px] h-[64px]",
                                        "rounded-full ",
                                        "bg-refine-red bg-opacity-10",
                                        "shrink-0",
                                        "hidden md:flex",
                                    )}
                                >
                                    <OpenSourceIcon className="text-refine-red" />
                                </div>

                                <div className={clsx("")}>
                                    <p className="font-bold text-lg lg:text-2xl text-gray-900 dark:text-gray-300 mb-3">
                                        Open-source contributions have always
                                        been a major part of refine’s success.
                                    </p>

                                    <p className="text-base text-gray-900 dark:text-gray-300">
                                        We are grateful for all contributors who
                                        are developing core features, making
                                        bug-fixes, building community
                                        extensions, writing documentation,
                                        reporting issues and giving their
                                        constructive feedback.
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
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
                                    <div>
                                        <p className="mb-0 text-gray-500 dark:text-gray-400">
                                            Visit our
                                        </p>
                                        <a
                                            href="#"
                                            className="font-semibold text-gray-900 dark:text-gray-0 no-underline hover:no-underline"
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
                                    <div>
                                        <p className="mb-0 text-gray-500 dark:text-gray-400">
                                            Join our
                                        </p>
                                        <a
                                            href="#"
                                            className="font-semibold text-gray-900 dark:text-gray-0 no-underline hover:no-underline"
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
                                    <div>
                                        <p className="mb-0 text-gray-500 dark:text-gray-400">
                                            Follow us on
                                        </p>
                                        <a
                                            href="#"
                                            className="font-semibold text-gray-900 dark:text-gray-0 no-underline hover:no-underline"
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
                                    <div>
                                        <p className="mb-0 text-gray-500 dark:text-gray-400">
                                            Follow us on
                                        </p>
                                        <a
                                            href="#"
                                            className="font-semibold text-gray-900 dark:text-gray-0 no-underline hover:no-underline"
                                        >
                                            Twitter
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:px-20 px-8 my-12 lg:my-24">
                        <h4 className="text-2xl text-center">Out Team</h4>

                        <div className="grid grid-cols-4"></div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );

    // return (
    //     <Layout>
    //         <div></div>

    //         <div className={styles.root}>
    //             <div className={styles.header}>
    //                 <div>
    //                     AT <strong className={styles.semiBold}>refine</strong>,
    //                 </div>
    //                 <div> WE ARE HELPING ORGANIZATIONS</div>
    //                 <div> TO BUILD BETTER WEB APPLICATION</div>
    //                 <div>
    //                     <strong className={styles.semiBold}>
    //                         IN LESS TIME
    //                     </strong>{" "}
    //                     &{" "}
    //                     <strong className={styles.semiBold}>
    //                         FEWER RESOURCES
    //                     </strong>
    //                 </div>
    //             </div>
    //             <div className={styles.about}>
    //                 <div className={styles.title}>
    //                     <div className={styles.hat} />
    //                     <h2 className={styles.subtitle}>About</h2>
    //                 </div>
    //                 <p className={styles.aboutParagraph}>
    //                     Shortly after its initial release on{" "}
    //                     <strong>September 2021</strong>, <strong>refine</strong>{" "}
    //                     project has gained attraction of open-source community
    //                     and has become increasingly popular among web
    //                     application frameworks.
    //                 </p>
    //                 <p className={styles.aboutParagraph}>
    //                     With the aim of sustaining the growth and expanding the
    //                     user base, the project was{" "}
    //                     <strong>
    //                         backed by prominent VC&apos;s and angel investors on
    //                         May 2022
    //                     </strong>
    //                     .
    //                 </p>
    //                 <p className={styles.aboutParagraph}>
    //                     Today, the US-based company has an international team of{" "}
    //                     <strong>10+ members</strong> leading the development of
    //                     the open-core and building new products for the
    //                     ecosystem.
    //                 </p>
    //             </div>
    //             <div className={styles.openSourceCommunity}>
    //                 <div className={styles.title}>
    //                     <div className={styles.hat} />
    //                     <h2 className={styles.subtitle}>
    //                         Open Source Community
    //                     </h2>
    //                 </div>
    //                 <div className={styles.container}>
    //                     <div className={styles.imageWrapper}>
    //                         <img
    //                             className={styles.image}
    //                             src="/about/images/community.png"
    //                             srcSet="/about/images/community2x.png 1500w"
    //                         />
    //                     </div>
    //                     <div className={styles.openSourceParagraphs}>
    //                         <p className={styles.mainParagraph}>
    //                             <strong>Open source</strong> contributions have
    //                             always been a major part of{" "}
    //                             <strong className="lowercase">refine</strong>
    //                             &apos;s success.
    //                         </p>
    //                         <p className={styles.subParagraph}>
    //                             We are greateful for all contributers who are
    //                             developing core features, making bug-fixes,
    //                             building community extensions, writing
    //                             documentation, reporting issues and giving their
    //                             constructive feedback.
    //                         </p>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className={styles.joinOurCommunity}>
    //                 <div className={styles.title}>
    //                     <div className={styles.hat} />
    //                     <h2 className={styles.subtitle}>Join our community</h2>
    //                 </div>
    //                 <div className={styles.communityContainer}>
    //                     {community.map((item) => (
    //                         <CommunityCard
    //                             key={item.url}
    //                             title={item.title}
    //                             subtitle={item.subtitle}
    //                             icon={item.icon}
    //                             href={item.url}
    //                         />
    //                     ))}
    //                 </div>
    //             </div>
    //             <div className={styles.team}>
    //                 <div className={styles.title}>
    //                     <div className={styles.hat} />
    //                     <h2 className={styles.subtitle}>Team</h2>
    //                 </div>
    //                 <div className={styles.teamContainer}>
    //                     {team.map((item) => (
    //                         <TeamCard
    //                             key={item.name}
    //                             fullName={item.name}
    //                             image={item.avatar}
    //                             role1={item.role1}
    //                             role2={item?.role2}
    //                             href={item.url}
    //                             srcSet={item.avatar2x}
    //                         />
    //                     ))}
    //                     <LinkednCard />
    //                 </div>
    //             </div>
    //             <div className={styles.backedBy}>
    //                 <div className={styles.title}>
    //                     <div className={styles.hat} />
    //                     <h2 className={styles.subtitle}>Backed by</h2>
    //                 </div>
    //                 <div className={styles.backedByContainer}>
    //                     <Card500 />
    //                     <div className={styles.backedMember}>
    //                         {backedBy.map((item) => (
    //                             <TeamCard
    //                                 key={item.name}
    //                                 fullName={item.name}
    //                                 image={item.avatar}
    //                                 role1={item.role1}
    //                                 role2={item?.role2}
    //                                 href={item.url}
    //                                 srcSet={item.avatar2x}
    //                             />
    //                         ))}
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className={styles.weAreHere}>
    //                 <div className={styles.title}>
    //                     <div className={styles.hat} />
    //                     <h2 className={styles.subtitle}>We are here</h2>
    //                 </div>
    //                 <div className={styles.locationContainer}>
    //                     <div className={styles.locationText}>
    //                         <div className={styles.locationInfo}>
    //                             <div className={styles.iconWrapper}>
    //                                 <Pin className={styles.icon} />
    //                             </div>
    //                             <p className={styles.text}>
    //                                 256 Chapman Road STE 105-4 Newark, DE 19702
    //                             </p>
    //                         </div>
    //                         <div className={styles.locationInfo}>
    //                             <div className={styles.iconWrapper}>
    //                                 <Mail className={styles.icon} />
    //                             </div>
    //                             <p className={styles.text}>info@refine.dev</p>
    //                         </div>
    //                     </div>
    //                     <div className={styles.locationImageWrapper}>
    //                         <img
    //                             className={styles.locationImage}
    //                             src="/about/images/map.png"
    //                             srcSet="/about/images/map2x.png 1500w"
    //                         />
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </Layout>
    // );
};

export default About;
