import React, { FC } from "react";
import { CommunityNumberProvider } from "../context/CommunityNumber";

const Root: FC = ({ children }) => {
    return <CommunityNumberProvider>{children}</CommunityNumberProvider>;
};

export default Root;
