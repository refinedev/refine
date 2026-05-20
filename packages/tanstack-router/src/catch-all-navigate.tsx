import React from "react";
import { Navigate, useLocation } from "@tanstack/react-router";

/**
 * A component that will navigate to the given path with `to` query parameter included with the current location.
 */
export const CatchAllNavigate: React.FC<{ to: string }> = ({ to }) => {
  const location = useLocation();
  const queryValue = location.href.split("#")[0];
  const search = queryValue.length > 1 ? { to: queryValue } : undefined;

  return <Navigate to={to as never} search={search as never} />;
};
