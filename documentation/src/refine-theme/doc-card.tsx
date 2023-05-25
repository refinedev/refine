import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {
    findFirstCategoryLink,
    useDocById,
} from "@docusaurus/theme-common/internal";
import isInternalUrl from "@docusaurus/isInternalUrl";

function CardContainer({ href, children }) {
    return (
        <Link
            href={href}
            className={clsx(
                "no-underline",
                "rounded-lg",
                "bg-gray-800",
                "p-4",
                "flex flex-col",
                "gap-4",
            )}
        >
            {children}
        </Link>
    );
}

function CardLayout({ href, icon, title, description }) {
    return (
        <CardContainer href={href}>
            <h2
                className={clsx(
                    "line-clamp-1",
                    "text-base",
                    "text-gray-200",
                    "font-semibold",
                    "m-0",
                )}
                title={title}
            >
                {icon} {title}
            </h2>
            {description && (
                <p
                    className={clsx(
                        "line-clamp-3",
                        "m-0",
                        "text-sm leading-6",
                        "text-gray-400",
                        "font-normal",
                    )}
                    title={description}
                >
                    {description}
                </p>
            )}
        </CardContainer>
    );
}

function CardCategory({ item }) {
    const href = findFirstCategoryLink(item);
    // Unexpected: categories that don't have a link have been filtered upfront
    if (!href) {
        return null;
    }
    return (
        <CardLayout
            href={href}
            icon="🗃️"
            title={item.label}
            description={item.description ?? `${item.items.length} items`}
        />
    );
}

function CardLink({ item }) {
    const icon = isInternalUrl(item.href) ? "📄️" : "🔗";
    const doc = useDocById(item.docId ?? undefined);

    return (
        <CardLayout
            href={item.href}
            icon={icon}
            title={item.label}
            description={item.description ?? doc?.description}
        />
    );
}

export const DocCard = ({ item }) => {
    switch (item.type) {
        case "link":
            return <CardLink item={item} />;
        case "category":
            return <CardCategory item={item} />;
        default:
            throw new Error(`unknown item type ${JSON.stringify(item)}`);
    }
};
