import React from "react";
import { useResource } from "@refinedev/core";
import { useRouter } from "next/router";

type RefineRoutesProps = {
  children?: (
    renderedRoute: JSX.Element | undefined,
    pathname: string | undefined,
  ) => JSX.Element;
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

  return (
    <>
      {children ? (
        children(
          ResourceActionComponent ? <ResourceActionComponent /> : undefined,
          pathname,
        )
      ) : ResourceActionComponent ? (
        <ResourceActionComponent />
      ) : undefined}
    </>
  );
};
