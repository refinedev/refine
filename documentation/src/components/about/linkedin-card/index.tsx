import React from "react";
import styles from "./styles.module.css";

export const LinkednCard: React.FC = () => {
    return (
        <a href="linkedin.com/refine" className={styles.container}>
            <div className={styles.card}>
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
