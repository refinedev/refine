import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";

import styles from "./styles.module.css";

export default function Tag({ permalink, label, count, isActive }) {
    return (
        <Link
            href={permalink}
            className={clsx(
                styles.tag,
                count ? styles.tagWithCount : styles.tagRegular,
                isActive && styles.tagActive,
            )}
        >
            {label}
            {count && <span>{count}</span>}
        </Link>
    );
}
