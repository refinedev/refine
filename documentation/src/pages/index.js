import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";

import { features } from "../features";
import styles from "./styles.module.css";

function Badges() {
    return <div className={styles.topBadges}></div>;
}
function Feature({ imageUrl, title, url }) {
    const imgUrl = useBaseUrl(imageUrl);
    return <div> </div>;
}

function Home() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />"
        >
            <header className={clsx("hero hero--primary", styles.heroBanner)}>
                <div className="container">
                    <div className={styles.logoContainer}>
                        <img
                            className={clsx(
                                styles.heroBannerLogo,
                                "margin-vert--md",
                            )}
                            src="img/refine_logo.png"
                            alt="logo-icon"
                        />
                    </div>
                    <p className={clsx(styles.heroSubtitle, "hero__subtitle")}>
                        {siteConfig.tagline}
                    </p>
                    <Badges />
                    <div className={styles.buttons}>
                        <Link
                            className={clsx(
                                "button button--outline button--secondary button--lg",
                                styles.getStarted,
                            )}
                            to={useBaseUrl("docs/")}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>
            <main>
                {(features ?? []) && features.length > 0 && (
                    <section className={styles.featuresContainer}>
                        <div className="container">
                            <div className="row">
                                {features.map((props, idx) => (
                                    <Feature key={idx} {...props} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </Layout>
    );
}

export default Home;
