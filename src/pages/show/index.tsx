import React from "react";
import { useParams } from "react-router-dom";

export const ShowPage: React.FC = () => {
    const { resourceName, id } = useParams<Record<string, string>>();

    return (
        <span>
            Show {resourceName} / {id}
        </span>
    );
};
