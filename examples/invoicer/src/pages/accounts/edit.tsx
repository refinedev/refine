import { useGo, useNavigation } from "@refinedev/core";
import { useForm } from "@refinedev/antd";
import {
  Button,
  Card,
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
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { ModalForm } from "../../components/modal/form";
import { countryOptions } from "../../utils/countries";
import { API_URL, TOKEN_KEY } from "../../utils/constants";
import { PageHeader } from "../../components/page-header";
import { FormItemEditable } from "../../components/form/form-item-editable";

export const AccountsPageEdit = () => {
  const { listUrl } = useNavigation();

  const { formProps } = useForm();

  return (
    <>
      <PageHeader
        backButtonText="Accounts"
        backButtonHref={listUrl("accounts")}
      />
      <Card
        title={
          <Flex gap={12} align="center">
            <BankOutlined />
            <Typography.Text>Edit account</Typography.Text>
          </Flex>
        }
      >
        <Form {...formProps} layout="vertical">
          <FormItemEditable
            icon={<UserOutlined />}
            formItemProps={{
              name: "ownerName",
              label: "Owner name",
              rules: [{ required: true }],
            }}
          />
        </Form>
      </Card>
    </>
  );
};
