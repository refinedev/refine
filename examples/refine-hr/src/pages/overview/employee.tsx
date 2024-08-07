import { EmployeeLeaveCards } from "@/components/employees/leave-cards";
import { EmployeeNotifications } from "@/components/employees/notifications";
import { PageHeader } from "@/components/layout/page-header";
import { TimeOffIcon } from "@/icons";
import { Box } from "@mui/material";
import { CreateButton } from "@refinedev/mui";

export const PageEmployeeOverview = () => {
  return (
    <Box>
      <PageHeader
        title="Overview"
        rightSlot={
          <CreateButton
            size="large"
            variant="contained"
            resource="time-off"
            startIcon={<TimeOffIcon />}
          >
            Request Time Off
          </CreateButton>
        }
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <EmployeeLeaveCards />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          <EmployeeNotifications />
          <EmployeeNotifications />
        </Box>
      </Box>
    </Box>
  );
};
