import React, { useContext } from "react";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  useDelete,
  useTranslate,
  useMutationMode,
  useCan,
  useResource,
  pickNotDeprecated,
  useWarnAboutChange,
  AccessControlContext,
} from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import { DeleteButtonProps } from "../types";

/**
 * `<DeleteButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button>`} and {@link https://ant.design/components/button/ `<Popconfirm>`} components.
 * When you try to delete something, a pop-up shows up and asks for confirmation. When confirmed it executes the `useDelete` method provided by your `dataProvider`.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/components/buttons/delete-button} for more details.
 */
export const DeleteButton: React.FC<DeleteButtonProps> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName: propResourceNameOrRouteName,
  recordItemId,
  onSuccess,
  mutationMode: mutationModeProp,
  children,
  successNotification,
  errorNotification,
  hideText = false,
  accessControl,
  metaData,
  meta,
  dataProviderName,
  confirmTitle,
  confirmOkText,
  confirmCancelText,
  invalidates,
  ...rest
}) => {
  const accessControlContext = useContext(AccessControlContext);

  const accessControlEnabled =
    accessControl?.enabled ??
    accessControlContext.options.buttons.enableAccessControl;

  const hideIfUnauthorized =
    accessControl?.hideIfUnauthorized ??
    accessControlContext.options.buttons.hideIfUnauthorized;

  const translate = useTranslate();

  const { id, resource, identifier } = useResource(
    resourceNameFromProps ?? propResourceNameOrRouteName,
  );

  const { mutationMode: mutationModeContext } = useMutationMode();

  const mutationMode = mutationModeProp ?? mutationModeContext;

  const { mutate, isLoading, variables } = useDelete();

  const { data } = useCan({
    resource: resource?.name,
    action: "delete",
    params: { id: recordItemId ?? id, resource },
    queryOptions: {
      enabled: accessControlEnabled,
    },
  });

  const disabledTitle = () => {
    if (data?.can) return "";
    if (data?.reason) return data.reason;

    return translate(
      "buttons.notAccessTitle",
      "You don't have permission to access",
    );
  };

  const { setWarnWhen } = useWarnAboutChange();

  if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
    return null;
  }

  return (
    <Popconfirm
      key="delete"
      okText={confirmOkText ?? translate("buttons.delete", "Delete")}
      cancelText={confirmCancelText ?? translate("buttons.cancel", "Cancel")}
      okType="danger"
      title={confirmTitle ?? translate("buttons.confirm", "Are you sure?")}
      okButtonProps={{ disabled: isLoading }}
      onConfirm={(): void => {
        if ((recordItemId ?? id) && identifier) {
          setWarnWhen(false);
          mutate(
            {
              id: recordItemId ?? id ?? "",
              resource: identifier,
              mutationMode,
              successNotification,
              errorNotification,
              meta: pickNotDeprecated(meta, metaData),
              metaData: pickNotDeprecated(meta, metaData),
              dataProviderName,
              invalidates,
            },
            {
              onSuccess: (value) => {
                onSuccess?.(value);
              },
            },
          );
        }
      }}
      disabled={
        typeof rest?.disabled !== "undefined"
          ? rest.disabled
          : data?.can === false
      }
    >
      <Button
        danger
        loading={(recordItemId ?? id) === variables?.id && isLoading}
        icon={<DeleteOutlined />}
        title={disabledTitle()}
        disabled={data?.can === false}
        data-testid={RefineButtonTestIds.DeleteButton}
        className={RefineButtonClassNames.DeleteButton}
        {...rest}
      >
        {!hideText && (children ?? translate("buttons.delete", "Delete"))}
      </Button>
    </Popconfirm>
  );
};
