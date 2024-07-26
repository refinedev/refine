import { Pagination } from "@/components/pagination";
import type { Category, Product } from "@/types";
import { NumberField, type useTableReturnType } from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import { Button, Card, Col, Flex, Row, Skeleton, Typography } from "antd";
import { createStyles } from "antd-style";
import { Eye, Image } from "lucide-react";
import { useState } from "react";
import { StatusTag } from "../status-tag";

type ProductWithCategories = Product & {
  category: Category;
};

type ProductCardsProps = {
  useTableResult: useTableReturnType<ProductWithCategories>;
};

export const ProductCards = ({ useTableResult }: ProductCardsProps) => {
  const { styles } = useStyles();

  const products = useTableResult.tableQueryResult?.data?.data || [];
  const isLoading = useTableResult.tableQueryResult.isLoading;

  return (
    <>
      <div className={styles.container}>
        <Row gutter={[24, 24]} align="middle">
          {!isLoading &&
            products.map((product) => (
              <Col key={product.id} xs={24} lg={8}>
                <ProductCard {...product} />
              </Col>
            ))}
          {isLoading && (
            <>
              <Col xs={24} lg={8}>
                <ProductSkeleton />
              </Col>
              <Col xs={24} lg={8}>
                <ProductSkeleton />
              </Col>
              <Col xs={24} lg={8}>
                <ProductSkeleton />
              </Col>
            </>
          )}
        </Row>
        <Pagination
          {...useTableResult.tableProps.pagination}
          onChange={(page) => {
            useTableResult.setCurrent(page);
          }}
        />
      </div>
    </>
  );
};

export const ProductCard = (props: ProductWithCategories) => {
  const [isHovered, setIsHovered] = useState(false);
  const go = useGo();

  const { styles, cx } = useStyles();

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={styles.card}
      styles={{
        body: {
          width: "100%",
          padding: 0,
        },
        cover: {
          position: "relative",
          padding: "16px",
          margin: 0,
        },
      }}
      cover={
        <>
          {props?.image?.url ? (
            <img
              className={styles.image}
              src={props.image.url}
              alt={props.title}
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
          <Button
            onClick={() => {
              go({
                to: {
                  resource: "products",
                  action: "edit",
                  id: props.id,
                },
                options: { keepQuery: true },
              });
            }}
            className={cx(
              styles.viewButton,
              isHovered ? styles.viewButtonVisible : styles.viewButtonUnvisible,
            )}
          >
            <Eye
              style={{
                width: "20px",
                height: "20px",
              }}
            />
            View
          </Button>
        </>
      }
    >
      <div className={styles.body}>
        <div className={styles.cardBodyTitle}>
          <Typography.Text className={styles.title}>
            {props.title}
          </Typography.Text>
          <NumberField
            value={props.price}
            className={styles.price}
            options={{ style: "currency", currency: "USD" }}
          />
        </div>
        <div className={styles.cardBodyDescription}>
          <Typography.Paragraph
            className={styles.description}
            ellipsis={{ rows: 3 }}
          >
            {props.description}
          </Typography.Paragraph>
        </div>
      </div>
      <Flex className={styles.footer}>
        <Typography.Text>{props.category.title}</Typography.Text>
        <StatusTag status={props.status === "AVAILABLE"} />
      </Flex>
    </Card>
  );
};

const ProductSkeleton = () => {
  const { styles } = useStyles();

  return (
    <Card
      className={styles.card}
      styles={{
        body: {
          width: "100%",
          padding: 0,
        },
        cover: {
          padding: "16px",
          margin: 0,
        },
      }}
      cover={
        <Skeleton.Image
          active
          style={{
            width: "100%",
            height: "304px",
            aspectRatio: 304 / 304,
          }}
        />
      }
    >
      <Flex vertical gap={8}>
        <Flex
          vertical
          style={{
            width: "100%",
            padding: "16px 16px 0px 16px",
          }}
        >
          <Skeleton.Button active style={{ width: "100%", height: "16px" }} />
        </Flex>
        <Flex
          vertical
          gap={4}
          style={{
            padding: "0px 16px",
          }}
        >
          <Skeleton.Button active style={{ width: "100%", height: "16px" }} />
          <Skeleton.Button active style={{ width: "100%", height: "16px" }} />
          <Skeleton.Button active style={{ width: "100%", height: "16px" }} />
        </Flex>
        <Flex
          vertical
          style={{
            height: "54px",
            padding: "16px",
            borderTop: "1px solid #D9D9D9",
          }}
        >
          <Skeleton.Button active style={{ width: "100%", height: "16px" }} />
        </Flex>
      </Flex>
    </Card>
  );
};

const useStyles = createStyles(({ token }) => {
  return {
    container: {
      width: "100%",
      maxWidth: "1032px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderColor: "#D9D9D9",
      overflow: "hidden",
      margin: "0 auto",
    },
    body: {
      padding: "16px",
    },
    image: {
      display: "flex !important",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "304px",
      aspectRatio: 304 / 304,
      objectFit: "contain",
      borderRadius: "12px !important",
    },
    cardBodyTitle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "16px",
    },
    cardBodyDescription: {
      marginTop: "8px",
      minHeight: "64px",
    },
    title: {
      width: "100%",
      lineClamp: 1,
      WebkitLineClamp: 1,
      whiteSpace: "nowrap",
      wordWrap: "break-word",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    price: {
      color: token.colorTextLabel,
      fontWeight: 400,
      fontSize: "14px",
      whiteSpace: "nowrap",
    },
    description: {
      color: token.colorTextTertiary,
      fontSize: "14px",
      marginBottom: "0px !important",
    },
    footer: {
      padding: "16px",
      borderTop: "1px solid #D9D9D9",
      justifyContent: "space-between",
      alignItems: "center",
    },
    viewButtonVisible: {
      opacity: 1,
    },
    viewButtonUnvisible: {
      opacity: 0,
    },
    viewButton: {
      width: "98px !important",
      height: "40px",
      position: "absolute",
      display: "flex !important",
      alignItems: "center",
      justifyContent: "center",
      left: "50%",
      transform: "translateX(-50%)",
      top: "50%",
      borderRadius: "40px",
    },
  };
});
