import React from "react";
import { useParams } from "react-router-dom";

export const CreatePage: React.FC = () => {
    const { resourceName } = useParams<Record<string, string>>();

    return <span>create {resourceName}</span>;
};
