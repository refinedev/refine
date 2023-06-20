import React from "react";

export const AntDesignLogoIcon = (
    props: React.DetailedHTMLProps<
        React.ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
    >,
): JSX.Element => (
    <img
        width="48px"
        height="48px"
        {...props}
        src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/antd-logo.png"
    />
);
