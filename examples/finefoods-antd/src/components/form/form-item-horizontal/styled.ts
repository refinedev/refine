import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => {
    return {
        formItem: {
            ".ant-input-disabled, .ant-input-number-disabled, .ant-select-outlined.ant-select-disabled .ant-select-selector, .ant-input-number-outlined.ant-input-number-disabled input[disabled]":
                {
                    borderColor: "transparent",
                    backgroundColor: "transparent",
                    color: token.colorText,
                    userSelect: "text",
                    cursor: "text",
                },
        },
    };
});
