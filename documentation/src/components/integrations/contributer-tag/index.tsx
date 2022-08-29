import React from "react";
import clsx from "clsx";

import Heart from "/icons/heart.svg";
import styles from "./styles.module.css";

type ContributerTagProps = {
    name: string;
    url: string;
    className?: string;
};

const ContributerTag: React.FC<ContributerTagProps> = ({
    name,
    url,
    className,
}) => {
    return (
        <div
            className={clsx(
                className ? [styles.container, className] : styles.container,
            )}
        >
            <Heart />
            <div className={styles.text}>
                <span className={styles.bold}>by</span>
                <a target="_blank" href={url} rel="noreferrer">
                    {name}
                </a>
            </div>
        </div>
    );
};

export default ContributerTag;
