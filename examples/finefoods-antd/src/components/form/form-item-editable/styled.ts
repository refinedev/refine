import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => {
    return {
        formItem: {
            ".ant-input-disabled": {
                borderColor: "transparent",
                backgroundColor: "transparent",
                color: token.colorText,
                userSelect: "text",
                cursor: "text",
            },
        },
        title: {
            ".ant-input-disabled": {
                fontSize: token.fontSizeHeading3,
            },
        },
        default: {},
    };
});
