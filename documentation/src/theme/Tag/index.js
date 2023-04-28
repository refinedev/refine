import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";

import styles from "./styles.module.css";

export default function Tag({ permalink, label, isActive }) {
    return (
        <Link
            href={permalink}
            className={clsx(styles.tag, isActive && styles.tagActive)}
        >
            {label}
        </Link>
    );
}
