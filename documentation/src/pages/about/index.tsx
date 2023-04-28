import React from "react";
import Head from "@docusaurus/Head";

import Layout from "../../theme/Layout";
import { team } from "../../assets/team";
import { backedBy } from "../../assets/backed-by";
import { community } from "../../assets/community";
import { Pin, Mail } from "../../assets/about-icons";
import styles from "./styles.module.css";
import {
    Card500,
    CommunityCard,
    LinkednCard,
    TeamCard,
} from "../../components";

const About: React.FC = () => {
    return (
        <Layout>
            <Head title="About | refine">
                <html data-page="about" data-customized="true" />
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <div>
                        AT <strong className={styles.semiBold}>refine</strong>,
                    </div>
                    <div> WE ARE HELPING ORGANIZATIONS</div>
                    <div> TO BUILD BETTER WEB APPLICATION</div>
                    <div>
                        <strong className={styles.semiBold}>
                            IN LESS TIME
                        </strong>{" "}
                        &{" "}
                        <strong className={styles.semiBold}>
                            FEWER RESOURCES
                        </strong>
                    </div>
                </div>
                <div className={styles.about}>
                    <div className={styles.title}>
                        <div className={styles.hat} />
                        <h2 className={styles.subtitle}>About</h2>
                    </div>
                    <p className={styles.aboutParagraph}>
                        Shortly after its initial release on{" "}
                        <strong>September 2021</strong>, <strong>refine</strong>{" "}
                        project has gained attraction of open-source community
                        and has become increasingly popular among web
                        application frameworks.
                    </p>
                    <p className={styles.aboutParagraph}>
                        With the aim of sustaining the growth and expanding the
                        user base, the project was{" "}
                        <strong>
                            backed by prominent VC&apos;s and angel investors on
                            May 2022
                        </strong>
                        .
                    </p>
                    <p className={styles.aboutParagraph}>
                        Today, the US-based company has an international team of{" "}
                        <strong>10+ members</strong> leading the development of
                        the open-core and building new products for the
                        ecosystem.
                    </p>
                </div>
                <div className={styles.openSourceCommunity}>
                    <div className={styles.title}>
                        <div className={styles.hat} />
                        <h2 className={styles.subtitle}>
                            Open Source Community
                        </h2>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.imageWrapper}>
                            <img
                                className={styles.image}
                                src="/about/images/community.png"
                                srcSet="/about/images/community2x.png 1500w"
                            />
                        </div>
                        <div className={styles.openSourceParagraphs}>
                            <p className={styles.mainParagraph}>
                                <strong>Open source</strong> contributions have
                                always been a major part of{" "}
                                <strong className="lowercase">refine</strong>
                                &apos;s success.
                            </p>
                            <p className={styles.subParagraph}>
                                We are greateful for all contributers who are
                                developing core features, making bug-fixes,
                                building community extensions, writing
                                documentation, reporting issues and giving their
                                constructive feedback.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.joinOurCommunity}>
                    <div className={styles.title}>
                        <div className={styles.hat} />
                        <h2 className={styles.subtitle}>Join our community</h2>
                    </div>
                    <div className={styles.communityContainer}>
                        {community.map((item) => (
                            <CommunityCard
                                key={item.url}
                                title={item.title}
                                subtitle={item.subtitle}
                                icon={item.icon}
                                href={item.url}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.team}>
                    <div className={styles.title}>
                        <div className={styles.hat} />
                        <h2 className={styles.subtitle}>Team</h2>
                    </div>
                    <div className={styles.teamContainer}>
                        {team.map((item) => (
                            <TeamCard
                                key={item.name}
                                fullName={item.name}
                                image={item.avatar}
                                role1={item.role1}
                                role2={item?.role2}
                                href={item.url}
                                srcSet={item.avatar2x}
                            />
                        ))}
                        <LinkednCard />
                    </div>
                </div>
                <div className={styles.backedBy}>
                    <div className={styles.title}>
                        <div className={styles.hat} />
                        <h2 className={styles.subtitle}>Backed by</h2>
                    </div>
                    <div className={styles.backedByContainer}>
                        <Card500 />
                        <div className={styles.backedMember}>
                            {backedBy.map((item) => (
                                <TeamCard
                                    key={item.name}
                                    fullName={item.name}
                                    image={item.avatar}
                                    role1={item.role1}
                                    role2={item?.role2}
                                    href={item.url}
                                    srcSet={item.avatar2x}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.weAreHere}>
                    <div className={styles.title}>
                        <div className={styles.hat} />
                        <h2 className={styles.subtitle}>We are here</h2>
                    </div>
                    <div className={styles.locationContainer}>
                        <div className={styles.locationText}>
                            <div className={styles.locationInfo}>
                                <div className={styles.iconWrapper}>
                                    <Pin className={styles.icon} />
                                </div>
                                <p className={styles.text}>
                                    256 Chapman Road STE 105-4 Newark, DE 19702
                                </p>
                            </div>
                            <div className={styles.locationInfo}>
                                <div className={styles.iconWrapper}>
                                    <Mail className={styles.icon} />
                                </div>
                                <p className={styles.text}>info@refine.dev</p>
                            </div>
                        </div>
                        <div className={styles.locationImageWrapper}>
                            <img
                                className={styles.locationImage}
                                src="/about/images/map.png"
                                srcSet="/about/images/map2x.png 1500w"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default About;
