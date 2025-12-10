import React, { type FC } from "react";
import { CommunityStatsProvider } from "../context/CommunityStats";
import { ScrollToTopButton } from "../components/scroll-to-top";

const Root: FC = ({ children }) => {
  return (
    <CommunityStatsProvider>
      {children}
      <ScrollToTopButton />
    </CommunityStatsProvider>
  );
};

export default Root;
