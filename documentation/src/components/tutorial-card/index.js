import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

import styles from "./styles.module.css";

const Card = ({ iconPath, title, direction }) => (
    <Link to={useBaseUrl(direction)} className={styles.link}>
        <div className={styles.card}>
            <img src={iconPath} alt={title} width="64" height="64" />
            <span>{title}</span>
        </div>
    </Link>
);

export default Card;
