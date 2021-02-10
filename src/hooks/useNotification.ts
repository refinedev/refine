import { notification } from 'antd';
import { NotificationApi } from 'antd/lib/notification';

/**
 * @example
 * import { useNotification } from 'readmin';
 *
 * const notification = useNotification();
 * notification["error"]({
 *   message: "Login Error",
 *   description: "Invalid username or password",
 * });
 *
 */

export const useNotification = (): NotificationApi => {
  return notification;
};
