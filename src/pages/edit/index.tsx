import React from "react";
import { useParams } from "react-router-dom";

export const EditPage: React.FC = () => {
    const { resourceName, id } = useParams<Record<string, string>>();

    return (
        <span>
            Edit {resourceName} / {id}
        </span>
    );
};
