import React from "react";
import {
  type TitleProps,
  useRouterContext,
  useRouterType,
  useLink,
} from "@refinedev/core";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  return (
    <ActiveLink to="/">
      {collapsed ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine-mini.svg"
            alt="Refine"
            style={{
              margin: "0 auto",
              padding: "12px 0",
              maxHeight: "65.5px",
            }}
          />
        </div>
      ) : (
        <img
          src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine.svg"
          alt="Refine"
          style={{
            width: "200px",
            padding: "12px 24px",
          }}
        />
      )}
    </ActiveLink>
  );
};
