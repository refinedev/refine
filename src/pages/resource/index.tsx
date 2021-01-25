import React from "react";
import { useParams } from "react-router-dom";

export const ResourcePage: React.FC = () => {
    const { name } = useParams<Record<string, string | undefined>>();

    return <span>resource page {name}</span>;
};
