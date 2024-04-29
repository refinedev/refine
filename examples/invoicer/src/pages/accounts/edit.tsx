import { useGo, useNavigation } from "@refinedev/core";
import { useForm } from "@refinedev/antd";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Flex,
  Form,
  Input,
  Select,
  Typography,
  Upload,
} from "antd";
import {
  CloudUploadOutlined,
  PictureOutlined,
  BankOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Row, theme } from "antd";

import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { ModalForm } from "../../components/modal/form";
import { countryOptions } from "../../utils/countries";
import { API_URL, TOKEN_KEY } from "../../utils/constants";
import { PageHeader } from "../../components/page-header";
import { FormItemEditableInputText } from "../../components/form/form-item-editable-input-text";
import { getNameInitials } from "../../utils/get-name-initials";
import { getRandomColorFromString } from "../../utils/get-random-color";
import { FormItemEditableText } from "../../components/form/form-item-editable-text";
import { UploadAvatar } from "../../components/upload-avatar";

export const AccountsPageEdit = () => {
  const { listUrl } = useNavigation();

  const { token } = theme.useToken();

  const { formProps, queryResult } = useForm();
  const account = queryResult?.data?.data;

  console.log(account);

  return (
    <>
      <PageHeader
        backButtonText="Accounts"
        backButtonHref={listUrl("accounts")}
      />
      <Form {...formProps} layout="vertical">
        <Row>
          <Col span={24}>
            <Flex gap={16}>
              <UploadAvatar
                name={account?.ownerName}
                src={account?.companyLogo}
              />
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
          <Col span={8}>
            <Card
              styles={{ body: { padding: 0 } }}
              title={
                <Flex gap={12} align="center">
                  <BankOutlined />
                  <Typography.Text>Account info</Typography.Text>
                </Flex>
              }
            >
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
                icon={<UserOutlined />}
                placeholder="Add email"
                formItemProps={{
                  name: "ownerEmail",
                  label: "Owner email",
                  rules: [{ required: true }],
                }}
              />
              <Divider style={{ margin: 0 }} />
              <FormItemEditableInputText
                icon={<UserOutlined />}
                placeholder="Add address"
                formItemProps={{
                  name: "address",
                  label: "Address",
                  rules: [{ required: true }],
                }}
              />
              <FormItemEditableInputText
                icon={<UserOutlined />}
                placeholder="Add phone number"
                formItemProps={{
                  name: "phone",
                  label: "Phone",
                  rules: [{ required: true }],
                }}
              />
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
};
