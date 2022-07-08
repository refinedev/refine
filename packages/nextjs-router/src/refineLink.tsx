import React from "react";
import Link, { LinkProps } from "next/link";

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> &
    Partial<Pick<Type, Key>>;

type RefineLinkProps =
    | (MakeOptional<LinkProps, "href"> & {
          to: LinkProps["href"];
      })
    | LinkProps;

export const RefineLink: React.FC<RefineLinkProps> = ({
    children,
    ...props
}) => (
    <Link
        href={"to" in props ? props.to : props.href}
        legacyBehavior={false}
        {...props}
    >
        {children}
    </Link>
);
