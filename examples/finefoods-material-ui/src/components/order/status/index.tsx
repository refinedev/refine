import { useTranslate } from "@refinedev/core";
import Chip from "@mui/material/Chip";
import type { ChipProps } from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MopedIcon from "@mui/icons-material/Moped";

type OrderStatusProps = {
  status?: "Pending" | "Ready" | "On The Way" | "Delivered" | "Cancelled";
};

export const OrderStatus = ({ status }: OrderStatusProps) => {
  const t = useTranslate();

  let color: ChipProps["color"];
  let icon: ChipProps["icon"];

  switch (status) {
    case "Pending":
      color = "warning";
      icon = <WatchLaterIcon />;
      break;
    case "Ready":
      color = "default";
      icon = <NotificationsIcon />;
      break;
    case "On The Way":
      color = "info";
      icon = <MopedIcon />;
      break;
    case "Delivered":
      color = "success";
      icon = <CheckCircleIcon />;
      break;
    case "Cancelled":
      color = "error";
      icon = <CancelIcon />;
      break;
  }

  return (
    <Chip
      variant="outlined"
      size="small"
      icon={icon}
      color={color}
      label={t(`enum.orderStatuses.${status}`)}
    />
  );
};
