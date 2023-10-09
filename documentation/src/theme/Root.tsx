import React, { FC } from "react";
import { install } from "ga-gtag";

import { CommunityStatsProvider } from "../context/CommunityStats";

install("G-27Z1WY952H", { send_page_view: false });

const Root: FC = ({ children }) => {
    return <CommunityStatsProvider>{children}</CommunityStatsProvider>;
};

export default Root;
