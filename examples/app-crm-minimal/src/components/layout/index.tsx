import React from "react";

import {
  ThemedLayout as ThemedLayoutV2,
  ThemedTitle as ThemedTitleV2,
} from "@refinedev/antd";

import { GitHubBanner } from "./gh-banner";
import { Header } from "./header";

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <GitHubBanner />
      <ThemedLayoutV2
        Header={Header}
        Title={(titleProps) => {
          return <ThemedTitleV2 {...titleProps} text="Refine" />;
        }}
      >
        {children}
      </ThemedLayoutV2>
    </>
  );
};
