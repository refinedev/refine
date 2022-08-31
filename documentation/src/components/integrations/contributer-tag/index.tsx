import React from "react";
import clsx from "clsx";

import Heart from "/icons/heart.svg";
import styles from "./styles.module.css";

type ContributerTagProps = {
    name: string;
    url: string;
};

const ContributerTag: React.FC<ContributerTagProps> = ({ name, url }) => {
    return (
        <div className={styles.container}>
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
