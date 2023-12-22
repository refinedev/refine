import { FC, PropsWithChildren, ReactNode } from "react";

import { Space } from "antd";

import { AccordionHeaderSkeleton, Text } from "@/components";

type Props = PropsWithChildren<{
  icon: ReactNode;
  isActive: boolean;
  fallback?: string | ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
}>;

export const AccordionHeader: FC<Props> = ({
  icon,
  isActive,
  fallback,
  isLoading = false,
  children,
}) => {
  if (isLoading) {
    return <AccordionHeaderSkeleton />;
  }

  return (
    <Space size={15} align="start">
      {icon}
      {isActive ? <Text strong>{children}</Text> : fallback}
    </Space>
  );
};
