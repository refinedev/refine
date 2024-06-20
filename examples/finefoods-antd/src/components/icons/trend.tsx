import { CaretUpOutlined } from "@ant-design/icons";
import { theme } from "antd";

export const TrendUpIcon = () => {
  const { token } = theme.useToken();

  return (
    // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
    <CaretUpOutlined
      style={{
        color: token.colorSuccess,
      }}
    />
  );
};

export const TrendDownIcon = () => {
  const { token } = theme.useToken();

  return (
    // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
    <CaretUpOutlined
      style={{
        color: token.colorWarning,
      }}
    />
  );
};
