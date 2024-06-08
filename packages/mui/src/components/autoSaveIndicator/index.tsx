import React from "react";
import {
  type AutoSaveIndicatorProps,
  useTranslate,
  AutoSaveIndicator as AutoSaveIndicatorCore,
} from "@refinedev/core";
import Typography from "@mui/material/Typography";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  status,
  elements: {
    success = (
      <Message
        key="autoSave.success"
        defaultMessage="saved"
        icon={<TaskAltOutlinedIcon fontSize="small" />}
      />
    ),
    error = (
      <Message
        key="autoSave.error"
        defaultMessage="auto save failure"
        icon={<ErrorOutlineOutlinedIcon fontSize="small" />}
      />
    ),
    loading = (
      <Message
        key="autoSave.loading"
        defaultMessage="saving..."
        icon={<SyncOutlinedIcon fontSize="small" />}
      />
    ),
    idle = (
      <Message
        key="autoSave.idle"
        defaultMessage="waiting for changes"
        icon={<MoreHorizOutlinedIcon fontSize="small" />}
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

  return (
    <Typography
      color="gray"
      fontSize="0.8rem"
      position="relative"
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      marginRight=".3rem"
    >
      {translate(key, defaultMessage)}
      <span style={{ position: "relative", top: "3px", marginLeft: "3px" }}>
        {icon}
      </span>
    </Typography>
  );
};
