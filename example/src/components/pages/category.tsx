import * as React from 'react';
import {
  List,
  Table,
  Column,
  Create,
  Edit,
  Form,
  FormItem,
  TextInput
} from 'readmin';

export const CategoryList = (props: {resourceName: string}) => {
  return (
    <List {...props}>
      <Table {...props}>
        <Column key="id" title="ID" dataIndex="id" />
        <Column key="title" title="Title" dataIndex="title" />
      </Table>
    </List>
  );
};

export const CategoryCreate = (props: any) => {
  return (
    <Create {...props}>
      <Form wrapperCol={{ span: 14 }} layout="vertical">
        <FormItem
          label="Title"
          name="title"
          rules={[
            {
              required: true
            }
          ]}
        >
          <TextInput />
        </FormItem>
      </Form>
    </Create>
  );
};

export const CategoryEdit = (props: any) => {
  return (
    <Edit {...props}>
      <Form wrapperCol={{ span: 14 }} layout="vertical">
        <FormItem
          label="Title"
          name="title"
          rules={[
            {
              required: true
            }
          ]}
        >
          <TextInput />
        </FormItem>
      </Form>
    </Edit>
  );
};
