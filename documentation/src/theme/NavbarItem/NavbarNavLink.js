import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import isInternalUrl from "@docusaurus/isInternalUrl";
import { isRegexpStringMatch } from "@docusaurus/theme-common";
import IconExternalLink from "@theme/Icon/ExternalLink";

const HackathonIcon = (props) => (
    <svg
        width="18"
        height="21"
        viewBox="0 0 18 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.2049 4.11409L17.0143 5.7349L8.857 10.4752L6.0476 8.85436L9.03866 7.11611L6.4438 5.61745L3.45275 7.3557L0.646484 5.7349L8.80376 0.994629L11.61 2.61543L8.73798 4.28479L11.3328 5.78344L14.2049 4.11409ZM9.44336 20.9799L12.2355 19.3575L12.2449 16.0345L14.8241 14.5358L14.8147 17.8588L17.6038 16.238L17.6304 6.79822L14.8413 8.42059L14.8304 11.8814L12.2528 13.3801L12.2622 9.91925L9.47155 11.5416L9.44336 20.9799ZM8.24027 11.5416L5.43087 9.91925L5.42148 13.2439L2.82662 11.7452L2.83602 8.42059L0.0266219 6.79978L0 16.238L2.80783 17.8588L2.81879 14.398L5.41365 15.8967L5.40425 19.3575L8.21365 20.9799L8.24027 11.5416Z"
            fill="#242436"
        />
    </svg>
);

export default function NavbarNavLink({
    activeBasePath,
    activeBaseRegex,
    to,
    href,
    label,
    html,
    isDropdownLink,
    prependBaseUrlToHref,
    rightIcon,
    ...props
}) {
    // TODO all this seems hacky
    // {to: 'version'} should probably be forbidden, in favor of {to: '/version'}
    const toUrl = useBaseUrl(to);
    const activeBaseUrl = useBaseUrl(activeBasePath);
    const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
    const isExternalLink = label && href && !isInternalUrl(href);
    // Link content is set through html XOR label
    const linkContentProps = html
        ? { dangerouslySetInnerHTML: { __html: html } }
        : {
              children: (
                  <>
                      {label === "Hackathon" && (
                          <HackathonIcon className="mr-2 ml-0.5 align-sub" />
                      )}
                      {label}
                      {isExternalLink && (
                          <IconExternalLink
                              {...(isDropdownLink && { width: 12, height: 12 })}
                          />
                      )}
                      {rightIcon && rightIcon}
                  </>
              ),
          };
    if (href) {
        return (
            <Link
                href={prependBaseUrlToHref ? normalizedHref : href}
                {...props}
                {...linkContentProps}
            />
        );
    }

    return (
        <Link
            to={toUrl}
            isNavLink
            {...((activeBasePath || activeBaseRegex) && {
                isActive: (_match, location) =>
                    typeof window !== "undefined"
                        ? activeBaseRegex
                            ? isRegexpStringMatch(
                                  activeBaseRegex,
                                  location.pathname,
                              )
                            : location.pathname.startsWith(activeBaseUrl)
                        : false,
            })}
            {...(location.pathname === "/blog/refine-hackathon/" &&
                label === "Blog" && { isActive: () => false })}
            {...props}
            {...linkContentProps}
        />
    );
}
