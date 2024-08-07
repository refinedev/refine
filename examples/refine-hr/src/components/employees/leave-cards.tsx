import { AnnualLeaveIcon, CasualLeaveIcon, SickLeaveIcon } from "@/icons";
import { Box, Grid, Typography } from "@mui/material";

export const EmployeeLeaveCards = () => {
  return (
    <Grid container spacing="24px">
      <Grid item xs={12} sm={4}>
        <Card type="annual" value={20} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card type="sick" value={10} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card type="casual" value={5} />
      </Grid>
    </Grid>
  );
};

const Card = (props: {
  type: "annual" | "sick" | "casual";
  value: number;
}) => {
  const variantMap = {
    annual: {
      label: "Annual Leave",
      description: "Days available",
      bgColor: "primary.50",
      titleColor: "primary.900",
      descriptionColor: "primary.700",
      iconColor: "primary.700",
      icon: <AnnualLeaveIcon />,
    },
    sick: {
      label: "Sick Leave",
      description: "Days used",
      bgColor: "#FFF7ED",
      titleColor: "#7C2D12",
      descriptionColor: "#C2410C",
      iconColor: "#C2410C",
      icon: <SickLeaveIcon />,
    },
    casual: {
      label: "Casual Leave",
      description: "Days used",
      bgColor: "grey.50",
      titleColor: "grey.900",
      descriptionColor: "grey.700",
      iconColor: "grey.700",
      icon: <CasualLeaveIcon />,
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: variantMap[props.type].bgColor,
        padding: "24px",
        borderRadius: "12px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: variantMap[props.type].titleColor,
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "24px",
          }}
        >
          {variantMap[props.type].label}
        </Typography>
        <Box
          sx={{
            color: variantMap[props.type].iconColor,
          }}
        >
          {variantMap[props.type].icon}
        </Box>
      </Box>

      <Box sx={{ marginTop: "8px", display: "flex", flexDirection: "column" }}>
        <Typography
          variant="caption"
          sx={{
            color: variantMap[props.type].descriptionColor,
            fontSize: "24px",
            lineHeight: "32px",
            fontWeight: 600,
          }}
        >
          {props.value}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: variantMap[props.type].descriptionColor,
            fontSize: "12px",
            lineHeight: "16px",
          }}
        >
          {variantMap[props.type].description}
        </Typography>
      </Box>
    </Box>
  );
};
