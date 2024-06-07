import React, { type FC } from "react";

import { CommunityStatsProvider } from "../context/CommunityStats";

const Root: FC = ({ children }) => {
  return <CommunityStatsProvider>{children}</CommunityStatsProvider>;
};

export default Root;
