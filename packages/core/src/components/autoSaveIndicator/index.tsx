import React from "react";

import { useTranslate } from "@hooks/i18n";

import { BaseRecord, HttpError } from "../../contexts/data/types";
import { AutoSaveIndicatorElements } from "../../hooks/form/types";
import { UseUpdateReturnType } from "../../hooks/data/useUpdate";

export type AutoSaveIndicatorProps<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = {
  /**
   * The data returned by the update request.
   */
  data?: UseUpdateReturnType<TData, TError, TVariables>["data"];
  /**
   * The error returned by the update request.
   */
  error?: UseUpdateReturnType<TData, TError, TVariables>["error"];
  /**
   * The status of the update request.
   */
  status: UseUpdateReturnType<TData, TError, TVariables>["status"];
  /**
   * The elements to display for each status.
   */
  elements?: AutoSaveIndicatorElements;
};

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  status,
  elements: {
    success = <Message key="autoSave.success" defaultMessage="saved" />,
    error = <Message key="autoSave.error" defaultMessage="auto save failure" />,
    loading = <Message key="autoSave.loading" defaultMessage="saving..." />,
    idle = <Message key="autoSave.idle" defaultMessage="waiting for changes" />,
  } = {},
}) => {
  switch (status) {
    case "success":
      return <>{success}</>;
    case "error":
      return <>{error}</>;
    case "loading":
      return <>{loading}</>;
    default:
      return <>{idle}</>;
  }
};

const Message = ({
  key,
  defaultMessage,
}: {
  key: string;
  defaultMessage: string;
}) => {
  const translate = useTranslate();

  return <span>{translate(key, defaultMessage)}</span>;
};
