import React from "react";

export interface ResourceProps {
    name: string;
}

export const Resource: React.FC<ResourceProps> = ({ name }) => {
    React.useEffect(() => {
        console.log(`TODO: Add resource (${name}) redux store`);
    }, []);

    return <span>resource - {name}</span>;
};
