import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { Link } = useRouterContext();

    return (
        <Link to="/">
            {collapsed ? (
                <img
                    src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine-collapsed.svg"
                    alt="Refine"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "12px 24px",
                    }}
                />
            ) : (
                <img
                    src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine.svg"
                    alt="Refine"
                    style={{
                        width: "200px",
                        padding: "12px 24px",
                    }}
                />
            )}
        </Link>
    );
};
