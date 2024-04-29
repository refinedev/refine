import { useNavigation } from "@refinedev/core";
import { DeleteButton, useForm } from "@refinedev/antd";
import { Card, Divider, Flex, Form, Typography } from "antd";
import {
  ShopOutlined,
  UserOutlined,
  ExportOutlined,
  BankOutlined,
  MailOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import { PageHeader } from "../../components/page-header";
import { FormItemEditableInputText } from "../../components/form/form-item-editable-input-text";
import { FormItemEditableText } from "../../components/form/form-item-editable-text";
import { FormItemEditableSelect } from "../../components/form/form-item-editable-select";
import { countryOptions } from "../../utils/countries";

export const ClientsPageEdit = () => {
  const { listUrl } = useNavigation();

  const { formProps, queryResult } = useForm();
  const client = queryResult?.data?.data;

  return (
    <>
      <PageHeader
        backButtonText="Clients"
        backButtonHref={listUrl("clients")}
      />
      <Form {...formProps} layout="vertical">
        <Row>
          <Col span={24}>
            <Flex gap={16}>
              <FormItemEditableText
                formItemProps={{
                  name: "companyName",
                  rules: [{ required: true }],
                }}
              />
            </Flex>
          </Col>
        </Row>
        <Row
          style={{
            marginTop: "32px",
          }}
        >
          <Col span={9}>
            <Card
              styles={{ body: { padding: 0 } }}
              title={
                <Flex gap={12} align="center">
                  <ShopOutlined />
                  <Typography.Text>Client info</Typography.Text>
                </Flex>
              }
            >
              <FormItemEditableSelect
                icon={<BankOutlined />}
                editIcon={<ExportOutlined />}
                selectProps={{
                  showSearch: true,
                  placeholder: "Select account",
                  options: [],
                }}
                formItemProps={{
                  name: "account",
                  label: "Account",
                  rules: [{ required: true }],
                }}
              />
              <FormItemEditableInputText
                icon={<UserOutlined />}
                placeholder="Add owner name"
                formItemProps={{
                  name: "ownerName",
                  label: "Owner name",
                  rules: [{ required: true }],
                }}
              />
              <Divider style={{ margin: 0 }} />
              <FormItemEditableInputText
                icon={<MailOutlined />}
                placeholder="Add email"
                formItemProps={{
                  name: "ownerEmail",
                  label: "Owner email",
                  rules: [{ required: true }],
                }}
              />
              <Divider style={{ margin: 0 }} />
              <FormItemEditableSelect
                icon={<GlobalOutlined />}
                selectProps={{
                  showSearch: true,
                  placeholder: "Select country",
                  options: countryOptions,
                }}
                formItemProps={{
                  name: "country",
                  label: "Country",
                  rules: [{ required: true }],
                }}
              />
              <Divider style={{ margin: 0 }} />
              <FormItemEditableInputText
                icon={<EnvironmentOutlined />}
                placeholder="Add address"
                formItemProps={{
                  name: "address",
                  label: "Address",
                  rules: [{ required: true }],
                }}
              />
              <Divider style={{ margin: 0 }} />
              <FormItemEditableInputText
                icon={<PhoneOutlined />}
                placeholder="Add phone number"
                formItemProps={{
                  name: "phone",
                  label: "Phone",
                  rules: [{ required: true }],
                }}
              />
            </Card>
            <DeleteButton
              type="text"
              style={{
                marginTop: "16px",
              }}
              onSuccess={() => {
                listUrl("clients");
              }}
            >
              Delete client
            </DeleteButton>
          </Col>
        </Row>
      </Form>
    </>
  );
};
