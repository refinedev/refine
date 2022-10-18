import React, { FC } from "react";
import { GithubProvider } from "../context/GithubContext";

const Root: FC = ({ children }) => {
    return <GithubProvider>{children}</GithubProvider>;
};

export default Root;
