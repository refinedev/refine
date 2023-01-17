import React from "react";
import Link, { LinkProps } from "next/link";

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> &
    Partial<Pick<Type, Key>>;

type RefineLinkProps = (
    | (MakeOptional<LinkProps, "href"> & {
          to: LinkProps["href"];
      })
    | LinkProps
) & {
    children: React.ReactNode;
    ref?: React.Ref<HTMLAnchorElement>;
};

export const RefineLink: React.FC<RefineLinkProps> = React.forwardRef(
    ({ children, ...props }, ref) => (
        <Link
            ref={ref}
            href={"to" in props ? props.to : props.href}
            legacyBehavior={false}
            {...props}
        >
            {children}
        </Link>
    ),
);
RefineLink.displayName = "RefineLink";
