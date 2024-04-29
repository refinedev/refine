import { useGo } from "@refinedev/core";
import { useForm } from "@refinedev/antd";
import { Flex, Form, Input, Select, theme } from "antd";
import InputMask from "react-input-mask";
import { ModalForm } from "../../components/modal/form";
import { countryOptions } from "../../utils/countries";

export const ClientsPageCreate = () => {
  const { token } = theme.useToken();

  const go = useGo();

  const { formProps } = useForm();

  return (
    <ModalForm
      formId="create-client-form"
      title="Add new client"
      open
      onCancel={() => {
        go({
          to: { resource: "accounts", action: "list" },
          options: { keepQuery: true },
        });
      }}
    >
      <Form layout="vertical" id="create-client-form" {...formProps}>
        <Flex
          vertical
          style={{
            margin: "0 auto",
            width: "420px",
          }}
        >
          <Form.Item
            name="account"
            label="Account"
            rules={[{ required: true }]}
          >
            <Select placeholder="Please select an account" options={[]} />
          </Form.Item>
          <Form.Item
            name="title"
            label="Client title"
            rules={[{ required: true }]}
          >
            <Input placeholder="Please enter client title" />
          </Form.Item>
          <Form.Item
            name="ownerName"
            label="Owner name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Please enter owner name" />
          </Form.Item>
          <Form.Item
            name="ownerEmail"
            label="Owner email"
            rules={[{ required: true }]}
          >
            <Input placeholder="Please enter owner email" />
          </Form.Item>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Please select country"
              options={countryOptions}
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Please enter address" />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <InputMask mask="(999) 999-9999">
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              {(props: InputProps) => (
                <Input {...props} placeholder="Please enter phone number" />
              )}
            </InputMask>
          </Form.Item>
        </Flex>
      </Form>
    </ModalForm>
  );
};
