import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useWindowSize } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/theme-common/internal";
import DocItemPaginator from "@theme/DocItem/Paginator";
import DocVersionBanner from "@theme/DocVersionBanner";
import DocVersionBadge from "@theme/DocVersionBadge";
import DocItemFooter from "@theme/DocItem/Footer";
import DocItemTOCMobile from "@theme/DocItem/TOC/Mobile";
import DocItemTOCDesktop from "@theme/DocItem/TOC/Desktop";
import DocItemContent from "@theme/DocItem/Content";
import DocBreadcrumbs from "@theme/DocBreadcrumbs";
import styles from "./styles.module.css";
/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
    const { frontMatter, toc } = useDoc();
    const windowSize = useWindowSize();
    const hidden = frontMatter.hide_table_of_contents;
    const canRender = !hidden && toc.length > 0;
    const mobile = canRender ? <DocItemTOCMobile /> : undefined;
    const desktop =
        canRender && (windowSize === "desktop" || windowSize === "ssr") ? (
            <DocItemTOCDesktop />
        ) : undefined;
    return {
        hidden,
        mobile,
        desktop,
    };
}

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
    const docTOC = useDocTOC();
    const { frontMatter, toc } = useDoc();

    return (
        <div className="row">
            <div className={clsx("col", !docTOC.hidden && styles.docItemCol)}>
                <DocVersionBanner />
                <div className={styles.docItemContainer}>
                    <article>
                        <DocBreadcrumbs />
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
                <div className="col col--3">{docTOC.desktop}</div>
            )}
        </div>
    );
}
