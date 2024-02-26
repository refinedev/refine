import React from "react";
import { useResource } from "@refinedev/core";
import { usePathname } from "next/navigation";

type RefineRoutesProps = {
  children?: (
    renderedRoute: JSX.Element | undefined,
    pathname: string | undefined,
  ) => JSX.Element;
};

export const RefineRoutes = ({ children }: RefineRoutesProps) => {
  const { resource, action } = useResource();
  const pathname = usePathname();

  const resourceAction = resource && action ? resource[action] : undefined;

  const ResourceActionComponent =
    typeof resourceAction === "function"
      ? resourceAction
      : typeof resourceAction === "object"
        ? resourceAction.component
        : undefined;

  return (
    <>
      {children ? (
        children(
          ResourceActionComponent ? <ResourceActionComponent /> : undefined,
          pathname ?? undefined,
        )
      ) : ResourceActionComponent ? (
        <ResourceActionComponent />
      ) : undefined}
    </>
  );
};
