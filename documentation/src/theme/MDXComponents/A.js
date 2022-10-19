import React from "react";
import Link from "@docusaurus/Link";
import isInternalUrl from "@docusaurus/isInternalUrl";

export default function MDXA(props) {
    let rel = "noopener noreferrer";
    const isInternalURL = isInternalUrl(props?.href);
    const isGitHubRepoURL = props.href?.includes("github.com/refinedev/refine");
    if (isGitHubRepoURL) {
        rel = "noopener";
    } else if (!isInternalURL) {
        rel = `${rel} nofollow`;
    }

    return <Link {...props} rel={rel} />;
}
