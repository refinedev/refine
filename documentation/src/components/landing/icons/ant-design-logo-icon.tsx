import React from "react";

export const AntDesignLogoIcon = (
    props: React.DetailedHTMLProps<
        React.ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
    >,
): JSX.Element => (
    <img width="48px" height="48px" {...props} src="/img/antd-logo.png" />
);
