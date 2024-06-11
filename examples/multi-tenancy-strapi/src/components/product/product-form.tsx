import { FormItemUploadLogoDraggable } from "@/components/form";
import type { Product, ProductForm as ProductFormType } from "@/types";
import { useForm, useSelect } from "@refinedev/antd";
import {
  type CreateResponse,
  type HttpError,
  type UpdateResponse,
  useParsed,
} from "@refinedev/core";
import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  Segmented,
  Select,
} from "antd";
import { createStyles } from "antd-style";

type Props = {
  onMutationSuccess: (
    params: UpdateResponse<Product> | CreateResponse<Product>,
  ) => void;
  onCancel: () => void;
};

export const ProductForm = (props: Props) => {
  const { params } = useParsed<{ tenantId: string }>();
  const { styles } = useStyles();
  const { formProps, onFinish } = useForm<Product, HttpError, ProductFormType>({
    redirect: false,
    onMutationSuccess: (params) => {
      props.onMutationSuccess(params);
    },
    meta: {
      populate: ["category", "image"],
    },
  });

  const { selectProps: selectPropsCategory } = useSelect({
    resource: "categories",
    pagination: {
      mode: "off",
    },
  });

  const onFinishHandler = (values: ProductFormType) => {
    const imageId = values.image?.file?.response?.[0]?.id;
    const tenantId = Number(params?.tenantId);

    onFinish({
      ...values,
      image: imageId,
      store: tenantId,
    } as any);
  };

  return (
    <>
      <Form
        {...formProps}
        onFinish={(values) => onFinishHandler(values)}
        layout="vertical"
        className={styles.form}
        id="product-form"
      >
        <div className={styles.uploadContainer}>
          <FormItemUploadLogoDraggable />
        </div>
        <Form.Item
          name="title"
          label="Title"
          className={styles.formItem}
          style={{
            marginTop: 0,
          }}
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="Please enter product title" />
        </Form.Item>
        <Divider className={styles.divider} />
        <Form.Item
          name="description"
          label="Description"
          className={styles.formItem}
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input.TextArea
            placeholder="Please enter product description"
            rows={4}
          />
        </Form.Item>
        <Divider className={styles.divider} />
        <Form.Item
          name="price"
          label="Price"
          className={styles.formItem}
          rules={[{ required: true, message: "Price is required" }]}
        >
          <InputNumber
            addonBefore="$"
            placeholder="Please enter product price"
            min={0}
            formatter={(value) => {
              return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              })
                .format(Number(value || "0"))
                .replace("$", "");
            }}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Divider className={styles.divider} />
        <Form.Item
          name={["category", "id"]}
          label="Category"
          className={styles.formItem}
          rules={[{ required: true, message: "PriceCategory is required" }]}
        >
          <Select
            placeholder="Please enter product category"
            {...selectPropsCategory}
          />
        </Form.Item>
        <Divider className={styles.divider} />
        <Form.Item
          layout="horizontal"
          name="status"
          label="Status"
          className={styles.formItem}
          initialValue={"AVAILABLE"}
        >
          <Segmented
            className={styles.status}
            options={[
              {
                value: "AVAILABLE",
                label: "Available",
              },
              {
                value: "UNAVAILABLE",
                label: "Unavailable",
              },
            ]}
          />
        </Form.Item>
      </Form>
      <Flex className={styles.footer} justify="space-between">
        <Button onClick={props.onCancel} size="large">
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          form="product-form"
        >
          Save
        </Button>
      </Flex>
    </>
  );
};

const useStyles = createStyles(({ token }) => {
  return {
    uploadContainer: {
      padding: "24px 0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#FAFAFA",
      marginBottom: "16px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      background: "white",
    },
    formItem: {
      padding: "0 16px",
      marginTop: "16px",
    },
    status: {
      borderRadius: "80px",
      width: "100%",
      padding: "4px",

      "& .ant-segmented-item": {
        flex: 1,
        borderRadius: "44px",
      },

      "& .ant-segmented-thumb": {
        borderRadius: "44px",
      },
    },
    footer: {
      padding: "16px",
      borderTop: `1px solid ${token.colorBorderSecondary}`,
    },
    divider: {
      margin: "0",
      padding: "0",
    },
  };
});
