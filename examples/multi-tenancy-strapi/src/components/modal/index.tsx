import type { ModalProps } from "antd";
import { Modal as AntdModal, Button, Flex, Typography } from "antd";
import { createStyles } from "antd-style";
import { XCircle } from "lucide-react";
import type { PropsWithChildren } from "react";

export const Modal = (props: PropsWithChildren<ModalProps>) => {
  const { styles } = useStyles();

  return (
    <AntdModal
      {...props}
      closable={false}
      title={null}
      footer={null}
      onCancel={props.onClose}
      onClose={props.onClose}
      styles={{
        header: {
          padding: 0,
        },
        content: {
          borderRadius: "24px",
          padding: 0,
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
    </AntdModal>
  );
};

const useStyles = createStyles(({ token }) => {
  return {
    header: {
      borderTopLeftRadius: "24px",
      borderTopRightRadius: "24px",
      padding: "20px 24px",
      height: "64px",
      background: "white",
      borderBottom: `1px solid ${token.colorBorder}`,
    },
    divider: {
      margin: 0,
      padding: 0,
    },
    btnClose: {
      color: "#8C8C8C",
    },
  };
});
