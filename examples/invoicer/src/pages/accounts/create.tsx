import { useGo } from "@refinedev/core";
import { useForm } from "@refinedev/antd";
import { Button, Flex, Form, Input, Select, Upload, theme } from "antd";
import { CloudUploadOutlined, PictureOutlined } from "@ant-design/icons";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { ModalForm } from "../../components/modal/form";
import { countryOptions } from "../../utils/countries";
import { API_URL, TOKEN_KEY } from "../../utils/constants";
import { useColorMode } from "../../providers/color-mode";

export const AccountsPageCreate = () => {
  const { mode } = useColorMode();
  const { token } = theme.useToken();

  const go = useGo();

  const { formProps } = useForm();

  return (
    <ModalForm
      formId="create-account-form"
      title="Add new account"
      open
      onCancel={() => {
        go({
          to: { resource: "accounts", action: "list" },
          options: { keepQuery: true },
        });
      }}
    >
      <Form
        layout="vertical"
        id="create-account-form"
        {...formProps}
        onFinish={(values) => {
          formProps.onFinish?.(mediaUploadMapper(values));
        }}
      >
        <Flex gap={40}>
          <Form.Item
            name="logo"
            valuePropName="fileList"
            getValueProps={(data) => getValueProps(data, API_URL)}
          >
            <Flex gap={16} vertical>
              <div
                style={{
                  width: "148px",
                  height: "148px",
                }}
              >
                <Upload.Dragger
                  name="files"
                  action={`${API_URL}/api/upload`}
                  headers={{
                    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                  }}
                  listType="picture"
                  multiple={false}
                  showUploadList={false}
                >
                  <PictureOutlined
                    style={{
                      fontSize: "48px",
                      color: token.colorTextTertiary,
                    }}
                  />
                </Upload.Dragger>
              </div>
              <Upload
                name="files"
                action={`${API_URL}/api/upload`}
                headers={{
                  Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                }}
                listType="picture"
                multiple={false}
                showUploadList={false}
              >
                <Button
                  style={{
                    width: "148px",
                  }}
                  icon={<CloudUploadOutlined />}
                >
                  Upload Logo
                </Button>
              </Upload>
            </Flex>
          </Form.Item>
          <Flex
            vertical
            style={{
              width: "420px",
            }}
          >
            <Form.Item
              name="companyName"
              label="Company Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="ownerName"
              label="Owner Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="ownerEmail"
              label="Owner email"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="country"
              label="Country"
              rules={[{ required: true }]}
            >
              <Select options={countryOptions} />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Flex>
        </Flex>
      </Form>
    </ModalForm>
  );
};
