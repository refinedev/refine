import * as React from 'react';
import {
  List,
  Table,
  Create,
  Edit,
  Form,
  FormItem,
  TextInput,
  TextField,
} from 'readmin';

export const CategoryList = (props: {resourceName: string}) => {
  return (
    <List {...props}>
      <Table>
        <TextField source="id" title="ID" />
        <TextField source="title" title="Title" />
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
