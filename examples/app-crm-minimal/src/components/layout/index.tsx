import React from "react";

import { ThemedLayout, ThemedTitle } from "@refinedev/antd";

import { GitHubBanner } from "./gh-banner";
import { Header } from "./header";

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <GitHubBanner />
      <ThemedLayout
        Header={Header}
        Title={(titleProps) => {
          return <ThemedTitle {...titleProps} text="Refine" />;
        }}
      >
        {children}
      </ThemedLayout>
    </>
  );
};
