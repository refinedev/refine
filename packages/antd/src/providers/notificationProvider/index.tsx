import type { NotificationProvider } from "@refinedev/core";
import { App, notification as staticNotification } from "antd";
import React from "react";

import { UndoableNotification } from "@components/undoableNotification";

/**
 * @deprecated `notificationProvider` is deprecated due to not being compatible with theme changes in Ant Design. Please use `useNotificationProvider` export as your notification provider.
 * @see https://refine.dev/docs/api-reference/antd/theming/#usenotificationprovider-compatible-with-theme
 */

export const notificationProvider: NotificationProvider = {
  open: ({
    key,
    message,
    description,
    type,
    cancelMutation,
    undoableTimeout,
  }) => {
    if (type === "progress") {
      staticNotification.open({
        key,
        description: (
          <UndoableNotification
            notificationKey={key}
            message={message}
            cancelMutation={() => {
              cancelMutation?.();
              staticNotification.destroy(key ?? "");
            }}
            undoableTimeout={undoableTimeout}
          />
        ),
        message: null,
        duration: 0,
        closeIcon: <></>,
      });
    } else {
      staticNotification.open({
        key,
        description: message,
        message: description ?? null,
        type,
      });
    }
  },
  close: (key) => staticNotification.destroy(key),
};

export const useNotificationProvider = (): NotificationProvider => {
  const { notification: notificationFromContext } = App.useApp();
  const notification =
    "open" in notificationFromContext
      ? notificationFromContext
      : staticNotification;

  const notificationProvider: NotificationProvider = {
    open: ({
      key,
      message,
      description,
      type,
      cancelMutation,
      undoableTimeout,
    }) => {
      if (type === "progress") {
        notification.open({
          key,
          description: (
            <UndoableNotification
              notificationKey={key}
              message={message}
              cancelMutation={() => {
                cancelMutation?.();
                notification.destroy(key ?? "");
              }}
              undoableTimeout={undoableTimeout}
            />
          ),
          message: null,
          duration: 0,
          closeIcon: <></>,
        });
      } else {
        notification.open({
          key,
          description: message,
          message: description ?? null,
          type,
        });
      }
    },
    close: (key) => notification.destroy(key),
  };

  return notificationProvider;
};
