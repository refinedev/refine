import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token, isDarkMode }) => {
  return {
    modal: {
      ".ant-modal-content": {
        padding: 0,
      },

      ".ant-modal-body": {
        padding: "24px",
      },

      ".ant-modal-header": {
        borderBottom: `1px solid ${token.colorBorder}`,
        padding: "20px 24px",
        marginBottom: 0,
      },

      ".ant-modal-footer": {
        borderTop: `1px solid ${token.colorBorder}`,
        padding: "20px 24px",
        marginTop: 0,
      },
    },
  };
});
