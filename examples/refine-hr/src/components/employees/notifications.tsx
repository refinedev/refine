import { useList } from "@refinedev/core";
import {
  AssetsIcon,
  ErrorCircleIcon,
  ExpenseIcon,
  RequestsIcon,
  SuccessCircleIcon,
  TimeOffIcon,
} from "@/icons";
import { NotificationStatus, type Notification } from "@/types";
import { Frame } from "../frame";
import { blue, teal, indigo } from "@/providers/theme-provider/colors";
import { Box, Skeleton, Typography } from "@mui/material";

const NOTIFICATION_LIMIT = 3;

export const EmployeeNotifications = () => {
  const { data, isLoading } = useList<Notification>({
    resource: "notifications",
    pagination: { current: 1, pageSize: NOTIFICATION_LIMIT },
    sorters: [{ field: "createdAt", order: "desc" }],
  });
  const notifications = data?.data || [];

  const variantMap = {
    statusIcon: {
      [NotificationStatus.SUCCESS]: (
        <SuccessCircleIcon width="12px" height="12px" />
      ),
      [NotificationStatus.FAILURE]: (
        <ErrorCircleIcon width="12px" height="12px" />
      ),
    },
    time_off: {
      icon: <TimeOffIcon />,
      iconBgColor: teal[50],
      iconColor: teal[700],
    },
    asset: {
      icon: <AssetsIcon />,
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
    <Frame
      title="Notifications"
      sx={{
        minHeight: "314px",
      }}
      icon={<RequestsIcon width={24} height={24} />}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        {isLoading
          ? Array.from({ length: NOTIFICATION_LIMIT }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                }}
              >
                <Skeleton variant="circular" width="40px" height="40px" />
                <Skeleton variant="text" width="80%" />
              </Box>
            ))
          : notifications.map((notification) => {
              return (
                <Box
                  key={notification.id}
                  sx={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: variantMap[notification.source].iconColor,
                        backgroundColor:
                          variantMap[notification.source].iconBgColor,
                        borderRadius: "100%",
                        width: "40px",
                        height: "40px",
                      }}
                    >
                      {variantMap[notification.source].icon}
                    </Box>
                    <Box
                      sx={{
                        width: "12px",
                        height: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        top: "0",
                        right: "0",
                      }}
                    >
                      {variantMap.statusIcon[notification.status]}
                    </Box>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "14px",
                      lineHeight: "24px",
                      color: "text.primary",
                    }}
                  >
                    {notification.message}
                  </Typography>
                </Box>
              );
            })}
      </Box>
    </Frame>
  );
};
