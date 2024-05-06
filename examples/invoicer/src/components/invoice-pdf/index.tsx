import { useShow } from "@refinedev/core";
import {
  Card,
  Col,
  Divider,
  Flex,
  Row,
  Skeleton,
  Spin,
  Table,
  Typography,
} from "antd";
import { DateField, NumberField } from "@refinedev/antd";
import { CustomAvatar } from "../../components/avatar";
import { API_URL } from "../../utils/constants";
import { IInvoice, IService } from "../../interfaces";
import { useStyles } from "./styled";

type Props = {
  invoice?: IInvoice;
  loading?: boolean;
};

export const InvoicePDF = ({ invoice, loading }: Props) => {
  const { styles } = useStyles();

  const services = JSON.parse(invoice?.services || "[]") as IService[];

  const subtotal = services.reduce(
    (acc, service) =>
      acc +
      (service.unitPrice * service.quantity * (100 - service.discount)) / 100,
    0,
  );
  const total = subtotal - (subtotal * (invoice?.tax || 0)) / 100;

  console.log(invoice?.account?.logo?.url);

  return (
    <div id="invoice-pdf" className={styles.container}>
      <Card
        bordered={false}
        title={
          <Typography.Text
            style={{
              fontWeight: 400,
            }}
          >
            {loading ? (
              <Skeleton.Button style={{ width: 100, height: 22 }} />
            ) : (
              `Invoice ID #${invoice?.id}`
            )}
          </Typography.Text>
        }
        extra={
          <Flex gap={8} align="center">
            {loading ? (
              <Skeleton.Button style={{ width: 140, height: 22 }} />
            ) : (
              <>
                <Typography.Text>Date:</Typography.Text>
                <DateField
                  style={{ width: 84 }}
                  value={invoice?.date}
                  format="D MMM YYYY"
                />
              </>
            )}
          </Flex>
        }
      >
        <Spin spinning={loading}>
          <Row className={styles.fromToContainer}>
            <Col xs={24} md={12}>
              <Flex vertical gap={24}>
                <Typography.Text>From:</Typography.Text>
                <Flex gap={24}>
                  <CustomAvatar
                    className={
                      invoice?.account?.logo?.url ? "" : "print-hidden"
                    }
                    name={invoice?.account?.company_name}
                    shape="square"
                    size={64}
                    src={
                      invoice?.account?.logo?.url
                        ? `${API_URL}${invoice?.account?.logo?.url}`
                        : undefined
                    }
                  />
                  <Flex vertical gap={8}>
                    <Typography.Text
                      style={{
                        fontWeight: 700,
                      }}
                    >
                      {invoice?.account?.company_name}
                    </Typography.Text>
                    <Typography.Text>
                      {invoice?.account?.address}
                    </Typography.Text>
                    <Typography.Text>{invoice?.account?.phone}</Typography.Text>
                  </Flex>
                </Flex>
              </Flex>
            </Col>
            <Col xs={24} md={12}>
              <Flex vertical gap={24} align="flex-end">
                <Typography.Text>To:</Typography.Text>
                <Flex vertical gap={8} align="flex-end">
                  <Typography.Text
                    style={{
                      fontWeight: 700,
                    }}
                  >
                    {invoice?.client?.name}
                  </Typography.Text>
                  <Typography.Text>{invoice?.client?.address}</Typography.Text>
                  <Typography.Text>{invoice?.client?.phone}</Typography.Text>
                </Flex>
              </Flex>
            </Col>
          </Row>
        </Spin>

        <Divider
          style={{
            margin: 0,
          }}
        />
        <Flex vertical gap={24} className={styles.productServiceContainer}>
          <Typography.Title
            level={4}
            style={{
              margin: 0,
              fontWeight: 400,
            }}
          >
            Product / Services
          </Typography.Title>
          <Table
            dataSource={services}
            rowKey={"id"}
            pagination={false}
            loading={loading}
            scroll={{ x: 960 }}
          >
            <Table.Column title="Title" dataIndex="title" key="title" />
            <Table.Column
              title="Unit Price"
              dataIndex="unitPrice"
              key="unitPrice"
              render={(unitPrice: number) => (
                <NumberField
                  value={unitPrice}
                  options={{ style: "currency", currency: "USD" }}
                />
              )}
            />
            <Table.Column
              title="Quantity"
              dataIndex="quantity"
              key="quantity"
            />
            <Table.Column
              title="Discount"
              dataIndex="discount"
              key="discount"
              render={(discount: number) => (
                <Typography.Text>{`${discount}%`}</Typography.Text>
              )}
            />

            <Table.Column
              title="Total Price"
              dataIndex="total"
              key="total"
              align="right"
              width={128}
              render={(_, record: IService) => {
                return (
                  <NumberField
                    value={record.totalPrice}
                    options={{ style: "currency", currency: "USD" }}
                  />
                );
              }}
            />
          </Table>
          <Flex
            gap={16}
            vertical
            style={{
              marginLeft: "auto",
              marginTop: "24px",
              width: "200px",
            }}
          >
            <Flex
              justify="space-between"
              style={{
                paddingLeft: 32,
              }}
            >
              <Typography.Text className={styles.labelTotal}>
                Subtotal:
              </Typography.Text>
              <NumberField
                value={subtotal}
                options={{ style: "currency", currency: "USD" }}
              />
            </Flex>
            <Flex
              justify="space-between"
              style={{
                paddingLeft: 32,
              }}
            >
              <Typography.Text className={styles.labelTotal}>
                Sales tax:
              </Typography.Text>
              <Typography.Text>{invoice?.tax || 0}%</Typography.Text>
            </Flex>
            <Divider
              style={{
                margin: "0",
              }}
            />
            <Flex
              justify="space-between"
              style={{
                paddingLeft: 16,
              }}
            >
              <Typography.Text
                className={styles.labelTotal}
                style={{
                  fontWeight: 700,
                }}
              >
                Total value:
              </Typography.Text>
              <NumberField
                value={total}
                options={{ style: "currency", currency: "USD" }}
              />
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};
