import React from "react";
import { Button } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import {
  useTranslate,
  useResource,
  useInvalidate,
  queryKeys,
  pickDataProvider,
} from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import { RefreshButtonProps } from "../types";

import { useQueryClient } from "@tanstack/react-query";

/**
 * `<RefreshButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button>`} component
 * to update the data shown on the page via the {@link https://refine.dev/docs/api-reference/core/hooks/invalidate/useInvalidate `useInvalidate`} hook.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/components/buttons/refresh-button} for more details.
 */
export const RefreshButton: React.FC<RefreshButtonProps> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName: propResourceNameOrRouteName,
  recordItemId,
  hideText = false,
  dataProviderName,
  children,
  onClick,
  meta: _meta,
  metaData: _metaData,
  ...rest
}) => {
  const translate = useTranslate();

  const queryClient = useQueryClient();
  const invalidates = useInvalidate();

  const { resources, identifier, id } = useResource(
    resourceNameFromProps ?? propResourceNameOrRouteName,
  );

  const isInvalidating = !!queryClient.isFetching({
    queryKey: queryKeys(
      identifier,
      pickDataProvider(identifier, dataProviderName, resources),
    ).detail(recordItemId ?? id),
  });

  const handleInvalidate = () => {
    invalidates({
      id: recordItemId ?? id,
      invalidates: ["detail"],
      dataProviderName,
      resource: identifier,
    });
  };

  return (
    <Button
      onClick={(e) => {
        onClick ? onClick(e) : handleInvalidate();
      }}
      icon={<RedoOutlined spin={isInvalidating} />}
      data-testid={RefineButtonTestIds.RefreshButton}
      className={RefineButtonClassNames.RefreshButton}
      {...rest}
    >
      {!hideText && (children ?? translate("buttons.refresh", "Refresh"))}
    </Button>
  );
};
