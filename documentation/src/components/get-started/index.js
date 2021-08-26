import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useBaseUrl from "@docusaurus/useBaseUrl";

import styles from "./styles.module.css";

export const GetStarted = () => {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Get started using refine</h2>
            <div className={styles.buttonContainer}>
                <Link
                    className={clsx(
                        "button",
                        "button--primary",
                        "button--lg",
                        styles.getStarted,
                    )}
                    to={useBaseUrl("docs/")}
                >
                    Start
                </Link>
            </div>
        </section>
    );
};
