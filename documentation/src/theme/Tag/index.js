import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";

import styles from "./styles.module.css";

export default function Tag({ permalink, label, count }) {
    return (
        <Link
            href={permalink}
            className={clsx(
                styles.tag,
                count ? styles.tagWithCount : styles.tagRegular,
            )}
        >
            {label}
            {count && <span>{count}</span>}
        </Link>
    );
}
