import { useRouterContext } from "@pankod/refine-core";
import React, { ReactNode } from "react";

interface PaginationLinkProps {
    href: string;
    element: ReactNode;
}

export const PaginationLink = ({ href, element }: PaginationLinkProps) => {
    const { Link } = useRouterContext();

    return (
        <Link
            href={href}
            replace={false}
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                e.preventDefault();
            }}
        >
            {element}
        </Link>
    );
};
