import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/theme-common/internal";
import DocItemPaginator from "@theme/DocItem/Paginator";
import DocVersionBanner from "@theme/DocVersionBanner";
import DocVersionBadge from "@theme/DocVersionBadge";
import DocItemFooter from "@theme/DocItem/Footer";
import DocItemContent from "@theme/DocItem/Content";
import DocBreadcrumbs from "@theme/DocBreadcrumbs";
import styles from "./styles.module.css";
import { useDocTOCwithTutorial } from "../../../components/tutorial-toc/index";
import { useCurrentTutorial } from "../../../hooks/use-current-tutorial";

function SwizzleBadge({ className }) {
    return (
        <span
            className={clsx(
                className,
                ThemeClassNames.docs.docVersionBadge,
                "badge bg-sky-500",
            )}
        >
            Swizzle Ready
        </span>
    );
}

export default function DocItemLayout({ children }) {
    const docTOC = useDocTOCwithTutorial();
    const tutorial = useCurrentTutorial();
    const { frontMatter, toc } = useDoc();

    return (
        <div className="row">
            <div className={clsx("col", !docTOC.hidden && styles.docItemCol)}>
                <DocVersionBanner />
                <div className={styles.docItemContainer}>
                    <article className="doc-article">
                        {tutorial?.isTutorial ? null : <DocBreadcrumbs />}
                        <div className="flex flex-row gap-1 items-center">
                            <DocVersionBadge />
                            {frontMatter.swizzle && <SwizzleBadge />}
                        </div>
                        {docTOC.mobile}
                        <DocItemContent>{children}</DocItemContent>
                        <DocItemFooter />
                    </article>
                    <DocItemPaginator />
                </div>
            </div>
            {docTOC.desktop && (
                <div className="col col--3 doc--toc-desktop">
                    {docTOC.desktop}
                </div>
            )}
        </div>
    );
}
