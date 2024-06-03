import type { FC, PropsWithChildren } from "react";

import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, type ButtonProps } from "antd";

import { Text } from "@/components";

type Props = ButtonProps;

export const KanbanAddStageButton: FC<PropsWithChildren<Props>> = ({
  children,
  onClick,
  style,
  ...rest
}) => {
  return (
    <Button
      type="dashed"
      size="large"
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon={<PlusSquareOutlined className="secondary md" />}
      style={{
        marginTop: "16px",
        marginLeft: "16px",
        marginRight: "16px",
        height: "56px",
        ...style,
      }}
      onClick={onClick}
      {...rest}
    >
      {children ?? (
        <Text size="md" type="secondary">
          Add stage
        </Text>
      )}
    </Button>
  );
};
