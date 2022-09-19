import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

export const Card500: React.FC = () => {
    return (
        <a
            href="https://ee.500.co/"
            className={clsx(styles.container, "group")}
        >
            <div className={clsx(styles.card, "example-card")}>
                <div
                    className={clsx(
                        styles.imageWrapper,
                        "group-hover:bg-[#2A2A42]",
                    )}
                >
                    <img
                        className={clsx(styles.icon, "group-hover:hidden")}
                        src="/icons/500.svg"
                    />
                    <img
                        className={clsx(
                            styles.icon,
                            "hidden",
                            "group-hover:block",
                        )}
                        src="/icons/500hover.svg"
                    />
                </div>
                <p className={styles.text}>
                    500
                    <br />
                    <div className={styles.emerging}>Emerging Europe</div>
                </p>
            </div>
        </a>
    );
};
