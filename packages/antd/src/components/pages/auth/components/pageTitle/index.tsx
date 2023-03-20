import { Space, theme, Typography } from "antd";
import React, { FC } from "react";

const { useToken } = theme;

const defaultText = "Refine Project";

const defaultIcon = (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-testid="auth-page-title-icon"
    >
        <path
            d="M12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9Z"
            fill="currentColor"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18V6Z"
            fill="currentColor"
        />
    </svg>
);

export type AuthPageTitleProps = {
    icon?: React.ReactNode | null;
    text?: React.ReactNode | null;
    wrapperStyle?: React.CSSProperties;
};

export const AuthPageTitle: FC<AuthPageTitleProps> = ({
    icon,
    text,
    wrapperStyle,
}) => {
    const { token } = useToken();

    if (icon === null && text === null) {
        return null;
    }

    const iconToRender = icon === null ? null : icon || defaultIcon;
    const textToRender = text === null ? null : text || defaultText;

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                ...wrapperStyle,
            }}
        >
            {iconToRender && (
                <div
                    style={{
                        height: "24px",
                        width: "24px",
                        color: token.colorPrimary,
                    }}
                >
                    {iconToRender}
                </div>
            )}
            {textToRender && (
                <Typography.Title
                    level={4}
                    style={{
                        marginBottom: 0,
                        fontWeight: 700,
                    }}
                >
                    {textToRender}
                </Typography.Title>
            )}
        </div>
    );
};
