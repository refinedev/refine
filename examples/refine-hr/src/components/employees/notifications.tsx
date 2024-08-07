import { useList } from "@refinedev/core";
import { ExpenseIcon, RequestsIcon, TimeOffIcon } from "@/icons";
import type { Notification, NotificationSource } from "@/types";
import { Frame } from "../frame";
import { blue, teal, indigo } from "@/providers/theme-provider/colors";
import { Box } from "@mui/material";

export const EmployeeNotifications = () => {
  const { data } = useList<Notification>({
    resource: "notifications",
    pagination: { current: 1, pageSize: 3 },
    sorters: [{ field: "createdAt", order: "desc" }],
  });
  const notifications = data?.data || [];

  const variantMap: Record<NotificationSource, any> = {
    time_off: {
      icon: <TimeOffIcon />,
      iconBgColor: teal[50],
      iconColor: teal[700],
    },
    asset: {
      icon: <RequestsIcon />,
      iconBgColor: indigo[50],
      iconColor: indigo[700],
    },
    expense: {
      icon: <ExpenseIcon />,
      iconBgColor: blue[50],
      iconColor: blue[700],
    },
  };

  return (
    <Frame title="Notifications" icon={<RequestsIcon width={24} height={24} />}>
      test
    </Frame>
  );
};
