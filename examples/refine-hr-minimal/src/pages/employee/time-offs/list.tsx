import { CreateButton } from "@refinedev/mui";
import { Box, Grid } from "@mui/material";
import { PageHeader } from "@/components/layout/page-header";
import { TimeOffList } from "@/components/time-offs/list";
import { TimeOffLeaveCards } from "@/components/time-offs/leave-cards";
import { TimeOffIcon } from "@/icons";

export const PageEmployeeTimeOffsList = () => {
  return (
    <Box>
      <PageHeader
        title="Time Off"
        rightSlot={
          <CreateButton
            size="large"
            variant="contained"
            startIcon={<TimeOffIcon />}
          >
            Request Time Off
          </CreateButton>
        }
      />

      <TimeOffLeaveCards />

      <Grid
        container
        spacing="24px"
        sx={{
          marginTop: "24px",
        }}
      >
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <TimeOffList type="inReview" />
            <TimeOffList type="upcoming" />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <TimeOffList type="history" />
        </Grid>
      </Grid>
    </Box>
  );
};
