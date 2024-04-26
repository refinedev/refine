import { PropsWithChildren } from "react";
import { Modal, ModalProps } from "antd";
import { useStyles } from "./styled";

type Props = {
  formId: string;
} & ModalProps;

export const ModalForm = ({
  children,
  formId,
  ...props
}: PropsWithChildren<Props>) => {
  const { styles } = useStyles();

  return (
    <Modal
      {...props}
      className={styles.modal}
      okText="Save"
      okButtonProps={{ form: formId, htmlType: "submit" }}
    >
      {children}
    </Modal>
  );
};
