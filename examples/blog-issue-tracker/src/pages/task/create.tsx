import { useForm, Create, useSelect } from "@refinedev/antd";

import { Form, Input, Select, DatePicker } from "antd";

import type { ITask, ILabel, IPriority, IStatus, IAuthUser } from "interfaces";

export const TaskCreate = () => {
  const { formProps, saveButtonProps } = useForm<ITask>();

  const { selectProps: labelSelectProps } = useSelect<ILabel>({
    resource: "label",
  });

  const { selectProps: prioritySelectPorps } = useSelect<IPriority>({
    resource: "priority",
  });

  const { selectProps: assigneSelectProps } = useSelect<IAuthUser>({
    resource: "users",
    optionValue: "id",
    optionLabel: "email",
  });

  const { selectProps: statusSelectProps } = useSelect<IStatus>({
    resource: "status",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} wrapperCol={{ span: 12 }} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>
        <Form.Item label="Label" name="label">
          <Select {...labelSelectProps} />
        </Form.Item>
        <Form.Item label="Priority" name="priority">
          <Select {...prioritySelectPorps} />
        </Form.Item>
        <Form.Item label="Assigne To" name="users">
          <Select {...assigneSelectProps} />
        </Form.Item>
        <Form.Item label="Select Status" name="status">
          <Select {...statusSelectProps} />
        </Form.Item>
        <Form.Item label="Start Date" name="start_time">
          <DatePicker style={{ width: "50%" }} />
        </Form.Item>
        <Form.Item label="Due Date" name="end_time">
          <DatePicker style={{ width: "50%" }} />
        </Form.Item>
      </Form>
    </Create>
  );
};
