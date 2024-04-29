import { Button, Flex, Form, FormItemProps, Input, Typography } from "antd";
import { PropsWithChildren, useState } from "react";
import { EditOutlined } from "@ant-design/icons";

import { useStyles } from "./styled";

type Props = {
  icon?: React.ReactNode;
  placeholder?: string;
  formItemProps?: FormItemProps;
  onEditClick?: () => void;
  onCancelClick?: () => void;
  onSave?: () => void;
};

export const FormItemEditableInputText = ({
  icon,
  placeholder,
  formItemProps,
  onEditClick,
  onCancelClick,
  onSave,
}: PropsWithChildren<Props>) => {
  const [disabled, setDisabled] = useState(true);

  const { styles, cx } = useStyles();
  const form = Form.useFormInstance();

  const handleEdit = () => {
    setDisabled(false);
    onEditClick?.();
  };

  const handleOnCancel = () => {
    setDisabled(true);
    form.resetFields([formItemProps?.name]);
    onCancelClick?.();
  };

  const handleOnSave = async () => {
    try {
      await form.validateFields();
      form.submit();
      setDisabled(true);
      onSave?.();
    } catch (error) {}
  };

  return (
    <Flex align="center" vertical={!disabled} className={styles.container}>
      <Form.Item
        {...formItemProps}
        className={cx(styles.formItem, {
          [styles.formItemDisabled]: disabled,
          [styles.formItemEnabled]: !disabled,
        })}
        required={false}
        label={
          formItemProps?.label && (
            <Flex gap={16} align="center">
              <Typography.Text type="secondary">{icon}</Typography.Text>
              <Typography.Text type="secondary">
                {formItemProps?.label}
              </Typography.Text>
            </Flex>
          )
        }
      >
        <Input
          disabled={disabled}
          placeholder={placeholder}
          addonBefore={<div style={{ width: "8px" }} />}
        />
      </Form.Item>
      {disabled && <Button icon={<EditOutlined />} onClick={handleEdit} />}
      {!disabled && (
        <Flex
          gap={8}
          style={{
            alignSelf: "flex-end",
            marginTop: "8px",
          }}
        >
          <Button onClick={handleOnCancel}>Cancel</Button>
          <Button type="primary" onClick={handleOnSave}>
            Save
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
