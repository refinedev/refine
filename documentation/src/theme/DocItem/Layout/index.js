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

const GithubIcon = (props) => (
    <svg
        width={12}
        height={12}
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.053 0A10.904 10.904 0 0 0 3.89 2.685 11.34 11.34 0 0 0 .142 9.472a11.48 11.48 0 0 0 1.456 7.65 11.087 11.087 0 0 0 5.964 4.86c.556.103.752-.25.752-.547v-1.918C5.23 20.202 4.58 18 4.58 18a3.012 3.012 0 0 0-1.227-1.655c-.997-.692.081-.692.081-.692.35.05.683.18.975.382.293.202.536.469.713.78.15.278.352.523.595.721a2.312 2.312 0 0 0 2.618.221c.042-.57.283-1.105.678-1.509-2.454-.284-5.03-1.253-5.03-5.539a4.415 4.415 0 0 1 1.132-3.025A4.194 4.194 0 0 1 5.224 4.7s.928-.305 3.036 1.156c1.81-.508 3.72-.508 5.531 0 2.108-1.46 3.03-1.156 3.03-1.156.406.936.455 1.993.135 2.963a4.415 4.415 0 0 1 1.132 3.026c0 4.334-2.582 5.282-5.043 5.538.264.271.468.597.598.955.13.358.182.741.155 1.122V21.4c0 .367.196.65.759.54a11.093 11.093 0 0 0 5.88-4.878 11.481 11.481 0 0 0 1.419-7.6 11.34 11.34 0 0 0-3.71-6.746A10.907 10.907 0 0 0 11.053 0Z"
            fill="currentColor"
        />
    </svg>
);

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

function SourceCodeBadge({ className, path }) {
    const sourcePath = path.startsWith("https://")
        ? path
        : `https://github.com/refinedev/refine/blob/next${
              path.startsWith("/") ? "" : "/"
          }${path}`;
    return (
        <a
            className={clsx(
                className,
                ThemeClassNames.docs.docVersionBadge,
                "badge sourcecode-badge",
            )}
            href={sourcePath}
            target="_blank"
            rel="noreferrer noopener"
        >
            <GithubIcon />
            Source Code
        </a>
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
                            {frontMatter.source && (
                                <SourceCodeBadge path={frontMatter.source} />
                            )}
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
