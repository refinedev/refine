import { HttpError, useGo } from "@refinedev/core";
import { useForm } from "@refinedev/antd";
import { Flex, Form, Input, Select } from "antd";
import InputMask from "react-input-mask";
import { getValueProps } from "@refinedev/strapi-v4";
import { ModalForm } from "../../components/modal/form";
import { FormItemUploadLogoDraggable } from "../../components/form/form-item-upload-logo-draggable";
import { countryOptions } from "../../utils/countries";
import { API_URL } from "../../utils/constants";
import { IAccount, IAccountForm } from "../../interfaces";

export const AccountsPageCreate = () => {
  const go = useGo();

  const { formProps } = useForm<IAccount, HttpError, IAccountForm>();

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
          const logoId = values.logo?.file?.response?.[0]?.id;
          return formProps.onFinish?.({
            ...values,
            logo: logoId,
          } as IAccountForm);
        }}
      >
        <Flex gap={40}>
          <Form.Item
            name="cover"
            valuePropName="fileList"
            getValueProps={(data) => getValueProps(data, API_URL)}
          >
            <FormItemUploadLogoDraggable />
          </Form.Item>
          <Flex
            vertical
            style={{
              width: "420px",
            }}
          >
            <Form.Item
              name="company_name"
              label="Company Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="owner_name"
              label="Owner Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="owner_email"
              label="Owner email"
              rules={[{ required: true, type: "email" }]}
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
              <InputMask mask="(999) 999-9999">
                {/* @ts-expect-error  <InputMask /> expects JSX.Element but we are using React.ReactNode */}
                {(props: InputProps) => (
                  <Input {...props} placeholder="Please enter phone number" />
                )}
              </InputMask>
            </Form.Item>
          </Flex>
        </Flex>
      </Form>
    </ModalForm>
  );
};
