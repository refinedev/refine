import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token, isDarkMode }) => {
    return {
        pagination: {
            margin: "0 !important",
            padding: "16px 0",
            borderRadius: 8,
            backgroundColor: isDarkMode ? "#1F1F1F" : "#FAFAFA",
        },
        column: {
            verticalAlign: "top",
            "@media (max-width: 768px)": {
                whiteSpace: "nowrap",
            },
        },
        actions: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "auto",
            marginTop: -6,
            width: 32,
            height: 32,
            border: `1px solid ${token.colorBorder}`,
            borderRadius: 6,
        },
    };
});
