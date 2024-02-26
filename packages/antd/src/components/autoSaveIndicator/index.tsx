import React from "react";
import {
  AutoSaveIndicatorProps,
  useTranslate,
  AutoSaveIndicator as AutoSaveIndicatorCore,
} from "@refinedev/core";
import { Typography, theme } from "antd";
import {
  EllipsisOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  status,
  elements: {
    success = (
      <Message
        key="autoSave.success"
        defaultMessage="saved"
        icon={<CheckCircleOutlined />}
      />
    ),
    error = (
      <Message
        key="autoSave.error"
        defaultMessage="auto save failure"
        icon={<ExclamationCircleOutlined />}
      />
    ),
    loading = (
      <Message
        key="autoSave.loading"
        defaultMessage="saving..."
        icon={<SyncOutlined />}
      />
    ),
    idle = (
      <Message
        key="autoSave.idle"
        defaultMessage="waiting for changes"
        icon={<EllipsisOutlined />}
      />
    ),
  } = {},
}) => {
  return (
    <AutoSaveIndicatorCore
      status={status}
      elements={{
        success,
        error,
        loading,
        idle,
      }}
    />
  );
};

const Message = ({
  key,
  defaultMessage,
  icon,
}: {
  key: string;
  defaultMessage: string;
  icon: React.ReactNode;
}) => {
  const translate = useTranslate();
  const { token } = theme.useToken();

  return (
    <Typography.Text
      style={{
        marginRight: 5,
        color: token.colorTextTertiary,
        fontSize: ".8rem",
      }}
    >
      {translate(key, defaultMessage)}
      <span style={{ marginLeft: ".2rem" }}>{icon}</span>
    </Typography.Text>
  );
};
