import * as React from "react";
import type { RefineReadyPageProps } from "@refinedev/ui-types";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

/**
 * @deprecated `ReadyPage` is deprecated and will be removed in the next major release.
 */
export const ReadyPage: React.FC<RefineReadyPageProps> = () => {
  const renderCode = (text: string) => (
    <Typography
      sx={{
        backgroundColor: (theme) => theme.palette.secondary.contrastText,
        color: (theme) => theme.palette.secondary.main,
        display: "inline-block",
        fontFamily: "monospace",
      }}
    >
      {text}
    </Typography>
  );
  return (
    <>
      <Grid
        container
        sx={{
          backgroundColor: (theme) => theme.palette.secondary.main,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundImage:
            "url('https://refine.ams3.cdn.digitaloceanspaces.com/login-background/background.png')",
          backgroundSize: "cover",
        }}
        p={3}
      >
        <Grid
          display="flex"
          flexDirection="column"
          flex={1}
          alignItems="center"
          color={(theme) => theme.palette.primary.contrastText}
        >
          <Typography display="flex" justifyContent="center">
            <img
              style={{ marginBottom: "48px" }}
              src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine.svg"
              alt="Refine Logo"
            />
          </Typography>
          <Typography
            variant="h2"
            fontWeight="bold"
            display="flex"
            justifyContent="center"
          >
            Welcome on board
          </Typography>
          <Typography variant="h5" mt={2}>
            Your configuration is completed.
          </Typography>
          <Typography variant="h6" mt={2}>
            Now you can get started by adding your resources to the{" "}
            {renderCode("resources")} property of {renderCode("Refine")}
          </Typography>
          <Grid item sm={12} mt={12} display="flex" justifyContent="center">
            <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
              <Link
                href="https://refine.dev"
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                }}
              >
                <Button variant="outlined" fullWidth>
                  Documentation
                </Button>
              </Link>
              <Link
                href="https://refine.dev/examples"
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                }}
              >
                <Button variant="outlined" fullWidth>
                  Examples
                </Button>
              </Link>
              <Link
                href="https://discord.gg/refine"
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                }}
              >
                <Button variant="outlined" fullWidth>
                  Community
                </Button>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
