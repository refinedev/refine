import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/theme-common/internal";
import LastUpdated from "@theme/LastUpdated";
import EditThisPage from "@theme/EditThisPage";
import TagsListInline from "@theme/TagsListInline";

function TagsRow(props) {
    return (
        <div
            className={clsx(
                ThemeClassNames.docs.docFooterTagsRow,
                "row margin-bottom--sm",
            )}
        >
            <div className="col">
                <TagsListInline {...props} />
            </div>
        </div>
    );
}

function EditMetaRow({
    editUrl,
    lastUpdatedAt,
    lastUpdatedBy,
    formattedLastUpdatedAt,
}) {
    return (
        <div
            className={clsx(
                "flex items-center justify-between",
                "flex-col md:flex-row",
                "gap-4",
            )}
        >
            <div className={clsx()}>
                <a
                    href={editUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={clsx(
                        "text-refine-link-light dark:text-refine-dark",
                        "text-xs",
                        "underline",
                    )}
                >
                    Edit this page
                </a>
            </div>
            <div className={clsx("text-gray-500", "text-xs")}>
                <span>Last updated on </span>
                <span>{formattedLastUpdatedAt} </span>
                <span>by {lastUpdatedBy}</span>
            </div>
        </div>
    );
}

export const DocFooter = () => {
    const { metadata } = useDoc();
    const {
        editUrl,
        lastUpdatedAt,
        formattedLastUpdatedAt,
        lastUpdatedBy,
        tags,
    } = metadata;

    const canDisplayTagsRow = tags.length > 0;
    const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
    const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;

    if (!canDisplayFooter) {
        return null;
    }

    return (
        <footer className={clsx("flex", "flex-col", "gap-6", "mt-16", "mb-6")}>
            {canDisplayTagsRow && <TagsRow tags={tags} />}
            {canDisplayEditMetaRow && (
                <EditMetaRow
                    editUrl={editUrl}
                    lastUpdatedAt={lastUpdatedAt}
                    lastUpdatedBy={lastUpdatedBy}
                    formattedLastUpdatedAt={formattedLastUpdatedAt}
                />
            )}
        </footer>
    );
};
