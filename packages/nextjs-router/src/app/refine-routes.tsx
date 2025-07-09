import React from "react";
import { useResource } from "@refinedev/core";
import { usePathname } from "next/navigation";

type RefineRoutesProps = {
  children?: (
    renderedRoute: React.JSX.Element | undefined,
    pathname: string | undefined,
  ) => React.JSX.Element;
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

  const Component = ResourceActionComponent as
    | React.ComponentType<any>
    | undefined;

  return (
    <>
      {children ? (
        children(Component ? <Component /> : undefined, pathname ?? undefined)
      ) : Component ? (
        <Component />
      ) : undefined}
    </>
  );
};
