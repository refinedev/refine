import { Box, Grid } from "@mui/material";
import { CreateButton } from "@refinedev/mui";
import { EmployeeLeaveCards } from "@/components/employees/leave-cards";
import { EmployeeNotifications } from "@/components/employees/notifications";
import { EmployeePoll } from "@/components/employees/poll";
import { PageHeader } from "@/components/layout/page-header";
import { TimeOffIcon } from "@/icons";
import { TimeOffs } from "@/components/time-offs";
import { Celebrations } from "@/components/celebrations";

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

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <EmployeeNotifications />
          </Grid>
          <Grid item xs={12} md={6}>
            <EmployeePoll />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <TimeOffs />
          </Grid>
          <Grid item xs={12} md={7}>
            <Celebrations />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
