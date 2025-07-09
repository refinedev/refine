import React from "react";
import { useResource } from "@refinedev/core";
import { useRouter } from "next/router";

type RefineRoutesProps = {
  children?: (
    renderedRoute: React.JSX.Element | undefined,
    pathname: string | undefined,
  ) => React.JSX.Element;
};

export const RefineRoutes = ({ children }: RefineRoutesProps) => {
  const { resource, action } = useResource();
  const { asPath: pathname, isReady } = useRouter();

  if (!isReady) {
    return <></>;
  }

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
        children(Component ? <Component /> : undefined, pathname)
      ) : Component ? (
        <Component />
      ) : undefined}
    </>
  );
};
