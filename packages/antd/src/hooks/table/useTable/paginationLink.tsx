import { useRouterContext } from "@pankod/refine-core";
import React, { ReactNode } from "react";

interface PaginationLinkProps {
    to: string;
    element: ReactNode;
}

export const PaginationLink = ({ to, element }: PaginationLinkProps) => {
    const { Link } = useRouterContext();

    return (
        <Link
            to={to}
            replace={false}
            onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
                e.preventDefault();
            }}
        >
            {element}
        </Link>
    );
};
