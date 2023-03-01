import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * A component that will navigate to the given path with `to` query parameter included with the current location.
 */
export const NavigateAndKeepCurrent: React.FC<{ to: string }> = ({ to }) => {
    const { pathname, search } = useLocation();

    return <Navigate to={`${to}?to=${pathname}${search}`} />;
};
