import React, { useContext } from 'react';
import { Row, Col, Layout, Card, Typography, Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';

import { useNotification } from '@hooks';
import { AuthContext } from '@contexts/auth';
import { IAuthContext } from '@interfaces';

export interface ILoginForm {
  username: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const { Title } = Typography;

  const a = 1;

  const [form] = Form.useForm();
  const history = useHistory();
  const notification = useNotification();

  const { login } = useContext<IAuthContext>(AuthContext);

  const onSubmit = (values: ILoginForm) => {
    login(values)
      .then(() => history.push('/'))
      .catch(() => {
        notification.error({
          message: 'Login Error',
          description: 'Invalid username or password'
        });
      });
  };

  return (
    <Layout>
      <Row
        justify="center"
        style={{
          display: 'flex',
          alignContent: 'center',
          height: '100vh'
        }}
      >
        <Col xl={6} lg={8} md={12} sm={18} xs={22}>
          <Card>
            <Title level={2} style={{ textAlign: 'center' }}>
              Login
            </Title>
            <Form
              className="ant-form-vertical"
              form={form}
              name="control-hooks"
              onFinish={onSubmit}
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input type="password" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" size="large" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
