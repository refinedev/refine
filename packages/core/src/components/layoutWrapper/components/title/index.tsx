import React from "react";
import { Link } from "react-router-dom";
import { TitleProps } from "src/interfaces";

export const Title: React.FC<TitleProps> = () => (
    <Link
        to="/"
        style={{
            display: "flex",
            width: "100%",
            textAlign: "center",
            color: "rgb(255, 255, 255)",
            fontSize: "16px",
            height: "60px",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        refine
    </Link>
);
