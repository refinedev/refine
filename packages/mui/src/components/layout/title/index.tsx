import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Button } from "@mui/material";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { Link } = useRouterContext();

    return (
        <Button fullWidth variant="text" disableRipple>
            <Link to="/">
                {collapsed ? (
                    <img
                        src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine-mini.svg"
                        alt="Refine"
                        width="28px"
                        style={{ maxHeight: "38px" }}
                    />
                ) : (
                    <img
                        src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine.svg"
                        alt="Refine"
                        width="140px"
                    />
                )}
            </Link>
        </Button>
    );
};
