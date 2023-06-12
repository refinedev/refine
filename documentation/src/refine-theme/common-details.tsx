import React from "react";
import clsx from "clsx";
import { Details as DetailsGeneric } from "@docusaurus/theme-common/Details";

export const CommonDetails = (props) => {
    const items = React.Children.toArray(props.children);

    const summary = items.find(
        (item) =>
            React.isValidElement(item) && item.props?.mdxType === "summary",
    );

    const children = <>{items.filter((item) => item !== summary)}</>;

    return (
        <DetailsGeneric
            {...props}
            className={clsx(
                props.className,
                "refine-details",
                "border dark:border-gray-700 border-gray-200",
                "rounded-lg",
                "overflow-hidden",
                "mb-4",
            )}
            summary={summary}
        >
            <div className={clsx("refine-details-content")}>{children}</div>
        </DetailsGeneric>
    );
};

export default CommonDetails;
