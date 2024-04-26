import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token, isDarkMode }) => {
  return {
    container: {
      borderBottom: `1px solid ${token.colorBorder}`,
      paddingBottom: "24px",
      marginBottom: "32px",
    },
    button: {
      display: "flex",
      alignItems: "center",
    },
  };
});
