import React from "react";
import { Link } from "react-router-dom";

import { TitleProps } from "../../../../interfaces";

import logo from "../../../../assets/images/refine.svg";
import logoCollapsed from "../../../../assets/images/refine-collapsed.svg";

export const Title: React.FC<TitleProps> = ({ collapsed }) => (
    <Link to="/">
        {collapsed ? (
            <img
                src={logoCollapsed}
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
                src={logo}
                alt="Refine"
                style={{
                    width: "200px",
                    padding: "12px 24px",
                }}
            />
        )}
    </Link>
);
