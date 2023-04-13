import isInternalUrl from "@docusaurus/isInternalUrl";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import IconExternalLink from "@theme/Icon/ExternalLink";
import React from "react";
export default function FooterLinkItem({ item }) {
    const { to, href, label, prependBaseUrlToHref, ...props } = item;
    const toUrl = useBaseUrl(to);
    const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
    return (
        <Link
            className="text-xs leading-[24px] font-montserrat text-[#000]"
            {...(href
                ? {
                      href: prependBaseUrlToHref ? normalizedHref : href,
                  }
                : {
                      to: toUrl,
                  })}
            {...props}
        >
            {label}
            {href && !isInternalUrl(href) && <IconExternalLink />}
        </Link>
    );
}
