import React from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

export const PerfectImplementation = () => {
    return (
        <section className={styles.section}>
            <div className="container">
                <div
                    className={clsx(
                        "row",
                        "row--no-gutters",
                        "row--justify--center",
                        styles.row,
                    )}
                >
                    <div className="col col--5">
                        <img
                            className={styles.screen}
                            src="/landing-page/code-screen.png"
                            alt="Code Screen"
                        />
                    </div>
                    <div className={clsx("col", "col--1", styles.arrowCol)}>
                        <img
                            className={styles.arrowImg}
                            src="/landing-page/implementation-arrow.png"
                            alt="Arrow"
                        />
                    </div>
                    <div className="col col--5">
                        <img
                            className={styles.screen}
                            src="/landing-page/preview-screen.png"
                            alt="Preview Screen"
                        />
                    </div>
                </div>
                <div className="row row--justify--center">
                    <div className="col col--9">
                        <h2 className={styles.title}>Perfect Implementation</h2>
                        <p className={styles.description}>
                            <strong>
                                Refine is a collection of helper hooks,
                                components and providers.
                            </strong>
                            They are all decoupled from your UI components and
                            business logic, so they never keep you from
                            customizing your UI or coding your own flow.
                        </p>
                        <p className={styles.description}>
                            <strong>
                                Refine&apos;s strongly opinionated about three
                                parts of your application:
                            </strong>
                        </p>
                        <div className={styles.listContainer}>
                            <ol className={styles.orderList}>
                                <li>API Networking</li>
                                <li>State Management</li>
                                <li>Authentication & Authorization</li>
                            </ol>
                            <div className={styles.box}>
                                <p>
                                    Refine guarantees you a perfect
                                    implementation of these building blocks in
                                    your project, so you can focus on your
                                    development.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
