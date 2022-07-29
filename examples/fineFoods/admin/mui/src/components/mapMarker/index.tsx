import React from "react";

export const MapMarker: React.FC<{
    lat?: string;
    lng?: string;
    children: React.ReactNode;
}> = (props) => {
    return <>{props.children}</>;
};
