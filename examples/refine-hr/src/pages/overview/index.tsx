import { PageHeader } from "@/components/layout/page-header";
import { Box, Divider } from "@mui/material";

export const PageOverview = () => {
  return (
    <Box>
      <PageHeader />
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "24px",
          }}
        >
          <Box
            sx={{
              fontSize: "24px",
              fontWeight: "600",
              lineHeight: "32px",
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            Welcome to Refine HR
          </Box>
          <Box
            sx={{
              fontSize: "16px",
              lineHeight: "24px",
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            Please select a resource from the sidebar to get started.
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
