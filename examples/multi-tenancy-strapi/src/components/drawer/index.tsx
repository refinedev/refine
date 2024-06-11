import type { DrawerProps } from "antd";
import { Drawer as AntdDrawer, Button, Flex, Typography } from "antd";
import { createStyles } from "antd-style";
import { XCircle } from "lucide-react";
import type { PropsWithChildren } from "react";

export const Drawer = (props: PropsWithChildren<DrawerProps>) => {
  const { styles } = useStyles();

  return (
    <AntdDrawer
      {...props}
      title={null}
      styles={{
        body: {
          padding: 0,
          borderRadius: "16px",
          background: "#FAFAFA",
          ...props?.styles?.body,
        },
        content: {
          borderRadius: "16px",
          ...props?.styles?.content,
        },
        wrapper: {
          margin: "16px",
          borderRadius: "16px",
          maxWidth: "400px",
          width: "100%",
          ...props?.styles?.wrapper,
        },
      }}
    >
      <Flex className={styles.header} align="center" justify="space-between">
        <Typography.Title level={5} style={{ marginBottom: 0 }}>
          {props.title}
        </Typography.Title>
        <Button
          className={styles.btnClose}
          onClick={props.onClose}
          type="text"
          icon={<XCircle />}
        />
      </Flex>

      {props.children}
    </AntdDrawer>
  );
};

const useStyles = createStyles(({ token }) => {
  return {
    header: {
      padding: "16px",
      height: "64px",
      background: "white",
      borderBottom: `1px solid ${token.colorBorder}`,
    },
    btnClose: {
      color: "#8C8C8C",
    },
  };
});
