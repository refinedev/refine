import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

export const LinkednCard: React.FC = () => {
    return (
        <a
            href="https://www.linkedin.com/company/refine-dev/mycompany/"
            className={styles.container}
            target="_blank"
            rel="noreferrer"
        >
            <div className={clsx(styles.card, "example-card")}>
                <div className={styles.title}>
                    SEE OPEN
                    <br />
                    POSITIONS
                </div>
                <div className={styles.ampersant}>&amp;</div>
                <div className={styles.boldTitle}>
                    JOIN
                    <br />
                    THE TEAM
                </div>
                <img className={styles.icon} src="/icons/linkedin.svg" />
            </div>
        </a>
    );
};
