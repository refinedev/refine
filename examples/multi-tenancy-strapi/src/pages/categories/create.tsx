import { Modal } from "@/components/modal";
import { useTenant } from "@/providers/tenant";
import type { Category } from "@/types";
import { useForm } from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import { Button, Divider, Form, Input, Segmented } from "antd";
import { createStyles } from "antd-style";

export const CategoryCreate = () => {
  const { tenant } = useTenant();

  const { styles } = useStyles();

  const go = useGo();

  const onClose = () => {
    go({
      to: {
        resource: "categories",
        action: "list",
      },
      options: { keepQuery: true },
    });
  };

  const { formProps, onFinish } = useForm<Category>({
    redirect: false,
    onMutationSuccess: onClose,
  });

  return (
    <Modal open title="Add category" onClose={onClose}>
      <Form
        {...formProps}
        onFinish={(values) => {
          onFinish({
            ...values,
            store: tenant.id,
          });
        }}
        className={styles.form}
        layout="vertical"
      >
        <Form.Item
          label="Title"
          name="title"
          className={styles.formItem}
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input />
        </Form.Item>
        <Divider className={styles.divider} />
        <Form.Item
          label="Status"
          name="status"
          className={styles.formItem}
          layout="horizontal"
          initialValue="VISIBLE"
        >
          <Segmented
            className={styles.status}
            options={[
              {
                value: "VISIBLE",
                label: "Visible",
              },
              {
                value: "INVISIBLE",
                label: "Invisible",
              },
            ]}
          />
        </Form.Item>
        <Divider className={styles.divider} />
        <div className={styles.footer}>
          <Button onClick={onClose} size="large">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" size="large">
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

const useStyles = createStyles(({ token }) => {
  return {
    form: {},
    formItem: {
      paddingTop: "24px",
      paddingLeft: "24px",
      paddingRight: "24px",
    },
    divider: {
      margin: 0,
      padding: 0,
    },
    status: {
      borderRadius: "80px",
      padding: "4px",

      "& .ant-segmented-item": {
        borderRadius: "44px",
      },

      "& .ant-segmented-item-label": {
        height: "32px",
        width: "136px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },

      "& .ant-segmented-thumb": {
        borderRadius: "44px",
      },
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      padding: "16px",
    },
  };
});
