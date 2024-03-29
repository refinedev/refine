import { useContext } from "react";

import { NotificationContext } from "@contexts/notification";
import { INotificationContext } from "../../../contexts/notification/types";

export const useNotification = (): INotificationContext => {
  const { open, close } = useContext(NotificationContext);

  return { open, close };
};
