import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { Link } = useRouterContext();

    return (
        <Link to="/">
            {collapsed ? (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine-mini.svg"
                        alt="Refine"
                        style={{
                            margin: "0 auto",
                            padding: "12px 0",
                            maxHeight: "65.5px",
                        }}
                    />
                </div>
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
