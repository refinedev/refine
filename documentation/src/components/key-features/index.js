import React from "react";

import styles from "./styles.module.css";

const backends = [
    { src: "/icons/backends/nodejs.png", alt: "nodejs" },
    { src: "/icons/backends/java.png", alt: "java" },
    { src: "/icons/backends/dotnet.png", alt: "dotnet" },
    { src: "/icons/backends/strapi.png", alt: "strapi" },
    { src: "/icons/backends/airtable.png", alt: "airtable" },
    { src: "/icons/backends/json-api.png", alt: "json-api" },
    { src: "/icons/backends/nest.png", alt: "nest" },
    { src: "/icons/backends/pyhton.png", alt: "pyhton" },
];

const features = [
    {
        src: "/icons/features/zero.png",
        title: "Zero-configuration",
        description:
            "One-line setup with superplate. It takes less than a minute to start a project.",
    },
    {
        src: "/icons/features/decoupled.png",
        title: "Decoupled UI",
        description:
            "UI components are exposed directly without encapsulation. You have full control on UI elements.",
    },
    {
        src: "/icons/features/box.png",
        title: "Out-of-the-box",
        description:
            "Routing, networking, authentication, state management, i18n and UI.",
    },
    {
        src: "/icons/features/powerful.png",
        title: "Powerful Default UI",
        description:
            "Works seamlessly with integrated Ant Design System. (Support for multiple UI frameworks is on the Roadmap)",
    },
    {
        src: "/icons/features/native.png",
        title: "Native Typescript Core",
        description: "You can always opt out for plain Javascript.",
    },
    {
        src: "/icons/features/boilerplate.png",
        title: "Boilerplate-free Code",
        description: "Keeps your codebase clean and readable.",
    },
];

export const KeyFeatures = () => {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.mainTitle}>Backend Agnostic</h2>
                <p className={styles.description}>
                    <strong>Connects to any custom backend.</strong> <br />
                    Built-in support for REST API, Strapi, NextJS and Airtable.
                </p>
                <div className="row row--justify--center">
                    <div className="col col--8">
                        <div className={styles.supportContainer}>
                            {backends.map(({ src, alt }, index) => (
                                <img key={index} src={src} alt={alt} />
                            ))}
                        </div>
                    </div>
                    <div className="col col--10">
                        <h2 className={styles.mainFeatureTitle}>
                            Other key features
                        </h2>
                        <div className={styles.featuresContainer}>
                            {features.map(
                                ({ src, title, description }, index) => (
                                    <div className={styles.feature} key={index}>
                                        <img src={src} alt={title} />
                                        <div>
                                            <p className={styles.featureTitle}>
                                                {title}
                                            </p>
                                            <p>{description}</p>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
