import React from "react";
import { Link } from "react-router-dom";
import { TitleProps } from "src/interfaces";

export const Title: React.FC<TitleProps> = () => (
    <Link
        to={`/`}
        style={{
            color: "#FFF",
            fontSize: 16,
            textAlign: "center",
            height: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        refine
    </Link>
);
