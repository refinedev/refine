import React, { FC } from "react";

import { CommunityStatsProvider } from "../context/CommunityStats";
import { UserCountryProvider } from "../context/UserCountry";

const Root: FC = ({ children }) => {
    return (
        <UserCountryProvider>
            <CommunityStatsProvider>{children}</CommunityStatsProvider>
        </UserCountryProvider>
    );
};

export default Root;
