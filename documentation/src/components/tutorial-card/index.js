import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

import styles from "./styles.module.css";

const Card = ({ iconPath, title, direction }) => (
    <Link to={useBaseUrl(direction)}>
        <div className={styles.card}>
            <img src={iconPath} alt="next.js" />
            <span>{title}</span>
        </div>
    </Link>
);

export default Card;
