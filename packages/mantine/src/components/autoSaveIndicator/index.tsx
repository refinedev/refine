import React from "react";
import {
  type AutoSaveIndicatorProps,
  useTranslate,
  AutoSaveIndicator as AutoSaveIndicatorCore,
} from "@refinedev/core";
import { Text } from "@mantine/core";
import {
  IconDots,
  IconRefresh,
  IconCircleCheck,
  IconExclamationCircle,
} from "@tabler/icons-react";

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  status,
  elements: {
    success = (
      <Message
        tkey="autoSave.success"
        defaultMessage="saved"
        icon={<IconCircleCheck size="18px" />}
      />
    ),
    error = (
      <Message
        tkey="autoSave.error"
        defaultMessage="auto save failure"
        icon={<IconExclamationCircle size="18px" />}
      />
    ),
    loading = (
      <Message
        tkey="autoSave.loading"
        defaultMessage="saving..."
        icon={<IconRefresh size="18px" />}
      />
    ),
    idle = (
      <Message
        tkey="autoSave.idle"
        defaultMessage="waiting for changes"
        icon={<IconDots size="18px" />}
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
  tkey,
  defaultMessage,
  icon,
}: {
  tkey: string;
  defaultMessage: string;
  icon: React.ReactNode;
}) => {
  const translate = useTranslate();

  return (
    <Text size="sm" display="flex" ta="center" mr="2" color="gray">
      {translate(tkey, defaultMessage)}
      <span style={{ position: "relative", top: "3px", marginLeft: "3px" }}>
        {icon}
      </span>
    </Text>
  );
};
