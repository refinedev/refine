import type { NotificationProvider } from "@refinedev/core";
import { toast } from "sonner";

export const notificationProvider: NotificationProvider = {
  open: ({ message, description, type }) => {
    if (type === "success") {
      toast.success(message, {
        id: Date.now(),
        description: description,
        richColors: true,
      });
    } else if (type === "error") {
      toast.error(message, {
        id: Date.now(),
        description: description,
        richColors: true,
      });
    }
  },
  close: (id) => {
    toast.dismiss(id);
  },
};
