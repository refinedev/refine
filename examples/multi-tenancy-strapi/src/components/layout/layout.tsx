import { Sider } from "@/components/layout/sider";
import { Grid } from "antd";
import { createStyles } from "antd-style";
import type { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  const { styles } = useStyles();
  const breakpoints = Grid.useBreakpoint();

  return (
    <div className={styles.container}>
      <Sider mode={breakpoints.xl ? "fixed" : "drawer"} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export const useStyles = createStyles(({ responsive, css }) => {
  return {
    container: css`
      display: flex;
      width: calc(100% - 312px);
      margin-left: 312px;
      ${responsive({
        lg: {
          width: "100%",
          marginLeft: "0",
        },
      })}
    `,
    content: {
      maxWidth: "1128px",
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      paddingTop: "32px",
      paddingBottom: "32px",
      paddingLeft: "48px",
      paddingRight: "48px",
    },
  };
});
