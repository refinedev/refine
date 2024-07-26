import { Drawer } from "@/components/drawer";
import { ProductForm } from "@/components/product/product-form";
import { StatusTag } from "@/components/status-tag";
import type { Category, Product } from "@/types";
import { DeleteButton, NumberField } from "@refinedev/antd";
import { useGo, useShow } from "@refinedev/core";
import { Button, Col, Divider, Flex, Row, Spin, Typography } from "antd";
import { createStyles } from "antd-style";
import { Image, PenLine, Trash2 } from "lucide-react";
import { useState } from "react";

type ProductWithCategories = Product & {
  category: Category;
};

export const ProductEdit = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { styles, cx } = useStyles();
  const go = useGo();
  const { queryResult } = useShow<ProductWithCategories>({
    meta: {
      populate: ["category", "image"],
    },
  });
  const product = queryResult.data?.data;

  const onClose = () => {
    go({
      to: {
        resource: "products",
        action: "list",
      },
      options: { keepQuery: true },
    });
  };

  return (
    <Drawer
      open={true}
      closable={false}
      onClose={onClose}
      title={`#${product?.id}`}
    >
      {isEdit && (
        <ProductForm
          onMutationSuccess={() => {
            setIsEdit(false);
          }}
          onCancel={() => {
            setIsEdit(false);
          }}
        />
      )}

      {!isEdit && (
        <Spin spinning={queryResult.isLoading}>
          <div className={styles.coverContainer}>
            {product?.image?.url ? (
              <img
                className={styles.image}
                src={product.image.url}
                alt={product.title}
              />
            ) : (
              <Flex align="center" justify="center" className={styles.image}>
                <Image
                  style={{
                    width: "54px",
                    height: "54px",
                    color: "#D9D9D9",
                  }}
                />
              </Flex>
            )}
          </div>
          <div className={styles.fieldsContainer}>
            <Typography.Title level={5} className={styles.padding}>
              {product?.title}
            </Typography.Title>
            <Typography.Paragraph
              className={cx(styles.padding, styles.description)}
            >
              {product?.description}
            </Typography.Paragraph>
            <Divider className={styles.divider} />
            <Row className={styles.row}>
              <Col span={6}>
                <Typography.Text className={styles.label}>
                  Price
                </Typography.Text>
              </Col>
              <Col span={18}>
                <NumberField
                  value={product?.price || 0}
                  options={{ style: "currency", currency: "USD" }}
                />
              </Col>
            </Row>
            <Divider className={styles.divider} />
            <Row className={styles.row}>
              <Col span={6}>
                <Typography.Text className={styles.label}>
                  Category
                </Typography.Text>
              </Col>
              <Col span={18}>
                <Typography.Text className={styles.value}>
                  {product?.category?.title}
                </Typography.Text>
              </Col>
            </Row>
            <Divider className={styles.divider} />
            <Row className={styles.row}>
              <Col span={6}>
                <Typography.Text className={styles.label}>
                  Status
                </Typography.Text>
              </Col>
              <Col span={18}>
                <StatusTag status={product?.status === "AVAILABLE"} />
              </Col>
            </Row>
            <Divider className={styles.divider} />
          </div>

          <Flex justify="space-between" className={styles.footer}>
            <DeleteButton
              size="large"
              type="text"
              icon={<Trash2 />}
              recordItemId={product?.id}
              onSuccess={() => {
                onClose();
              }}
            >
              Delete
            </DeleteButton>
            <Button
              type="default"
              size="large"
              icon={<PenLine />}
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Edit
            </Button>
          </Flex>
        </Spin>
      )}
    </Drawer>
  );
};

const useStyles = createStyles(({ token }) => {
  return {
    coverContainer: {
      display: "flex",
      justifyContent: "center",
      padding: "24px 16px",
      backgroundColor: "#FAFAFA",
    },
    fieldsContainer: {
      paddingTop: "16px",
      backgroundColor: "white",
    },
    image: {
      width: "240px",
      height: "240px",
      objectFit: "cover",
      borderRadius: "16px",
    },
    description: {
      marginBottom: "16px",
      color: token.colorTextTertiary,
    },
    label: {
      color: token.colorTextSecondary,
    },
    value: {},
    row: {
      padding: "16px",
      alignItems: "center",
    },
    padding: {
      padding: "0px 16px",
    },
    divider: {
      margin: "0",
      padding: "0",
    },
    footer: {
      padding: "16px",
    },
  };
});
