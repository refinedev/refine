import { PropsWithChildren } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

export const Link: React.FC<PropsWithChildren<NextLinkProps>> = ({
    href,
    children,
    ...props
}) => {
    return (
        <NextLink href={href}>
            <a {...props}>{children}</a>
        </NextLink>
    );
};
